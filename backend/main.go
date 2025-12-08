package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"robolearning/config"
	"robolearning/internal/database"
	"robolearning/internal/handlers"
	"robolearning/internal/middleware"
	"robolearning/internal/repository"
	"robolearning/internal/routes"
	"robolearning/internal/services"
	"robolearning/pkg/token"
)

func main() {
	cfg := config.Load()

	router := gin.New()
	// Put CORS first so even 404/401 responses include headers
	router.Use(buildCORS(cfg), gin.Logger(), gin.Recovery())
	// Respond OK to any preflight path to avoid 404 without headers
	router.OPTIONS("/*path", func(c *gin.Context) {
		c.Status(http.StatusNoContent)
	})

	db, err := database.Connect(cfg)
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
	defer db.Close()

	userRepo := repository.NewUserRepository(db)
	tokenMaker := token.NewJWTMaker(cfg.JWTSecret)
	authService := services.NewAuthService(userRepo, tokenMaker, cfg)
	authHandler := handlers.NewAuthHandler(authService, cfg)
	authMiddleware := middleware.AuthMiddleware(tokenMaker, userRepo)

	routes.RegisterRoutes(router, authHandler, authMiddleware)

	addr := ":" + cfg.ServerPort
	if err := router.Run(addr); err != nil {
		log.Fatalf("server failed: %v", err)
	}
}

func buildCORS(cfg config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := c.GetHeader("Origin")
		if origin == "" {
			c.Next()
			return
		}

		allowHeaders := "Origin, Content-Type, Authorization, Accept, X-Requested-With"
		if req := c.GetHeader("Access-Control-Request-Headers"); req != "" {
			allowHeaders = allowHeaders + ", " + req
		}

		c.Header("Access-Control-Allow-Origin", origin)
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", allowHeaders)
		c.Header("Access-Control-Expose-Headers", "Content-Length")
		c.Header("Access-Control-Max-Age", "86400")
		c.Header("Vary", "Origin")

		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}
