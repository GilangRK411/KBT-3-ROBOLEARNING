package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"robolearning/internal/models"
	"robolearning/internal/services"
)

type AuthHandler struct {
	authService *services.AuthService
}

func NewAuthHandler(authService *services.AuthService) *AuthHandler {
	return &AuthHandler{authService: authService}
}

type registerRequest struct {
	Name      string `json:"name" binding:"required"`
	Username  string `json:"username" binding:"required"`
	Birthdate string `json:"birthdate" binding:"required"` // yyyy-mm-dd
	Email     string `json:"email" binding:"required,email"`
	Password  string `json:"password" binding:"required,min=6"`
}

type loginRequest struct {
	Identifier string `json:"identifier" binding:"required"` // email or username
	Password   string `json:"password" binding:"required"`
}

type refreshRequest struct {
	RefreshToken string `json:"refresh_token" binding:"required"`
}

func (h *AuthHandler) Register(c *gin.Context) {
	var req registerRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	birthdate, err := time.Parse("2006-01-02", req.Birthdate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid birthdate format, use YYYY-MM-DD"})
		return
	}

	user, tokens, err := h.authService.Register(services.RegisterInput{
		Name:      req.Name,
		Username:  req.Username,
		Birthdate: birthdate,
		Email:     req.Email,
		Password:  req.Password,
	})
	if err != nil {
		switch err {
		case services.ErrUserAlreadyExists:
			c.JSON(http.StatusConflict, gin.H{"error": "user already exists"})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusCreated, buildAuthResponse(user, tokens))
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req loginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, tokens, err := h.authService.Login(req.Identifier, req.Password)
	if err != nil {
		switch err {
		case services.ErrInvalidCredentials:
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, buildAuthResponse(user, tokens))
}

func (h *AuthHandler) Refresh(c *gin.Context) {
	var req refreshRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, tokens, err := h.authService.Refresh(req.RefreshToken)
	if err != nil {
		switch err {
		case services.ErrInvalidRefresh:
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid or expired refresh token"})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, buildAuthResponse(user, tokens))
}

func buildAuthResponse(user *models.User, tokens services.AuthTokens) gin.H {
	birthdate := ""
	if !user.Birthdate.IsZero() {
		birthdate = user.Birthdate.Format("2006-01-02")
	}

	return gin.H{
		"user": gin.H{
			"id":        user.ID,
			"name":      user.Name,
			"username":  user.Username,
			"birthdate": birthdate,
			"email":     user.Email,
		},
		"access_token":             tokens.AccessToken,
		"access_token_expires_at":  tokens.AccessTokenExpiry,
		"refresh_token":            tokens.RefreshToken,
		"refresh_token_expires_at": tokens.RefreshTokenExpiry,
	}
}
