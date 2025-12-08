package main

import (
	"log"

	"github.com/gin-gonic/gin"

	"robolearning/config"
	"robolearning/internal/database"
	"robolearning/internal/handlers"
	"robolearning/internal/repository"
	"robolearning/internal/routes"
	"robolearning/internal/services"
	"robolearning/pkg/token"
)

func main() {
	cfg := config.Load()

	db, err := database.Connect(cfg)
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
	defer db.Close()

	userRepo := repository.NewUserRepository(db)
	tokenMaker := token.NewJWTMaker(cfg.JWTSecret)
	authService := services.NewAuthService(userRepo, tokenMaker, cfg)
	authHandler := handlers.NewAuthHandler(authService)

	router := gin.Default()
	routes.RegisterRoutes(router, authHandler)

	addr := ":" + cfg.ServerPort
	if err := router.Run(addr); err != nil {
		log.Fatalf("server failed: %v", err)
	}
}
