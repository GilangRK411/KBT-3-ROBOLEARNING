package routes

import (
	"github.com/gin-gonic/gin"

	"robolearning/internal/handlers"
)

func RegisterRoutes(
	router *gin.Engine,
	authHandler *handlers.AuthHandler,
	membershipHandler *handlers.MembershipHandler,
	authMiddleware gin.HandlerFunc,
	membershipMiddleware gin.HandlerFunc,
) {
	api := router.Group("/api")
	{
		api.POST("/register", authHandler.Register)
		api.POST("/login", authHandler.Login)
		api.POST("/refresh", authHandler.Refresh)
		api.GET("/memberships/plans", membershipHandler.ListPlans)
	}

	protected := api.Group("/")
	protected.Use(authMiddleware)
	{
		protected.POST("/logout", authHandler.Logout)
		protected.GET("/me", authHandler.Me)

		protected.GET("/memberships/me", membershipHandler.MyMembership)
		protected.POST("/memberships/checkout", membershipHandler.CreateCheckout)
		protected.POST("/memberships/checkout/:id/confirm", membershipHandler.ConfirmCheckout)
		protected.POST("/memberships/subscribe", membershipHandler.Subscribe)
		protected.GET("/memberships/plan/:plan", membershipHandler.GetPlan)
		protected.GET("/memberships/verify", membershipMiddleware, membershipHandler.MyMembership)
	}
}
