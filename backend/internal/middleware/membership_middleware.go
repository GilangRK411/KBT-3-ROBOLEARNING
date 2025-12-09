package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"robolearning/internal/services"
)

func RequireMembership(membershipService *services.MembershipService, allowedPlans ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		raw, ok := c.Get(ContextUserIDKey)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
			return
		}
		userID, ok := raw.(int64)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
			return
		}

		membership, err := membershipService.GetActiveMembership(userID)
		if err != nil {
			if err == services.ErrNoActiveMembership {
				c.AbortWithStatusJSON(http.StatusPaymentRequired, gin.H{"error": "membership required"})
				return
			}
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "failed to verify membership"})
			return
		}

		if len(allowedPlans) > 0 && !planAllowed(membership.Plan.Code, allowedPlans) {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "membership level insufficient"})
			return
		}

		c.Set("membershipPlan", membership.Plan.Code)
		c.Next()
	}
}

func planAllowed(code string, allowed []string) bool {
	for _, p := range allowed {
		if p == code {
			return true
		}
	}
	return false
}
