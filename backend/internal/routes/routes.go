package routes

import (
	"github.com/gin-gonic/gin"

	"robolearning/internal/handlers"
)

func RegisterRoutes(router *gin.Engine, authHandler *handlers.AuthHandler, authMiddleware gin.HandlerFunc) {
	api := router.Group("/api")
	{
		api.POST("/register", authHandler.Register)
		api.POST("/login", authHandler.Login)
		api.POST("/refresh", authHandler.Refresh)
	}

	protected := api.Group("/")
	protected.Use(authMiddleware)
	{
		protected.POST("/logout", authHandler.Logout)
		protected.GET("/me", authHandler.Me)
	}
}
