package middleware

import (
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"

	"robolearning/internal/repository"
	"robolearning/pkg/token"
)

const ContextUserIDKey = "userID"

func AuthMiddleware(tokenMaker *token.JWTMaker, repo *repository.UserRepository) gin.HandlerFunc {
    return func(c *gin.Context) {

        // Izinkan preflight tanpa autentikasi
        if c.Request.Method == http.MethodOptions {
            c.Next()
            return
        }

        raw, err := c.Cookie("access_token")
        if err != nil || raw == "" {
            authHeader := c.GetHeader("Authorization")
            if strings.HasPrefix(authHeader, "Bearer ") {
                raw = strings.TrimSpace(strings.TrimPrefix(authHeader, "Bearer "))
            }
        }

        if raw == "" {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing access token"})
            return
        }

        claims, err := tokenMaker.VerifyAccessToken(raw)
        if err != nil {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
            return
        }

        userID, err := claimToInt64(claims["user_id"])
        if err != nil {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token payload"})
            return
        }

        accessRecord, err := repo.GetAccessToken(raw)
        if err != nil {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "token not recognized"})
            return
        }

        if time.Now().UTC().After(accessRecord.ExpiresAt) {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "token expired"})
            return
        }

        c.Set(ContextUserIDKey, userID)
        c.Next()
    }
}


func claimToInt64(val interface{}) (int64, error) {
	switch v := val.(type) {
	case float64:
		return int64(v), nil
	case int64:
		return v, nil
	case int:
		return int64(v), nil
	default:
		return 0, errors.New("invalid type")
	}
}
