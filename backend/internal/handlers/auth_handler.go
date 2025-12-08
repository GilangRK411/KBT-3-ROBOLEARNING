package handlers

import (
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"

	"robolearning/config"
	"robolearning/internal/middleware"
	"robolearning/internal/models"
	"robolearning/internal/services"
)

const (
	accessTokenCookieName  = "access_token"
	refreshTokenCookieName = "refresh_token"
)

type AuthHandler struct {
	authService *services.AuthService
	cfg         config.Config
}

func NewAuthHandler(authService *services.AuthService, cfg config.Config) *AuthHandler {
	return &AuthHandler{
		authService: authService,
		cfg:         cfg,
	}
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

	h.setAuthCookies(c, tokens)
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

	h.setAuthCookies(c, tokens)
	c.JSON(http.StatusOK, buildAuthResponse(user, tokens))
}

func (h *AuthHandler) Refresh(c *gin.Context) {
	refreshToken, err := c.Cookie(refreshTokenCookieName)
	if err != nil || refreshToken == "" {
		var req refreshRequest
		if err := c.ShouldBindJSON(&req); err != nil || req.RefreshToken == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "refresh token is required"})
			return
		}
		refreshToken = req.RefreshToken
	}

	user, tokens, err := h.authService.Refresh(refreshToken)
	if err != nil {
		switch err {
		case services.ErrInvalidRefresh:
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid or expired refresh token"})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	h.setAuthCookies(c, tokens)
	c.JSON(http.StatusOK, buildAuthResponse(user, tokens))
}

func (h *AuthHandler) Logout(c *gin.Context) {
	if raw, ok := c.Get(middleware.ContextUserIDKey); ok {
		if userID, ok := raw.(int64); ok {
			if err := h.authService.RevokeTokens(userID); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to revoke tokens"})
				return
			}
		}
	}

	h.clearAuthCookies(c)
	c.JSON(http.StatusOK, gin.H{"message": "logged out"})
}

func (h *AuthHandler) Me(c *gin.Context) {
	raw, ok := c.Get(middleware.ContextUserIDKey)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}
	userID, ok := raw.(int64)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	user, err := h.authService.GetUserByID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to load user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": buildUserResponse(user)})
}

func buildAuthResponse(user *models.User, tokens services.AuthTokens) gin.H {
	return gin.H{
		"user":                     buildUserResponse(user),
		"access_token":             tokens.AccessToken,
		"access_token_expires_at":  tokens.AccessTokenExpiry,
		"refresh_token":            tokens.RefreshToken,
		"refresh_token_expires_at": tokens.RefreshTokenExpiry,
	}
}

func buildUserResponse(user *models.User) gin.H {
	birthdate := ""
	if !user.Birthdate.IsZero() {
		birthdate = user.Birthdate.Format("2006-01-02")
	}
	return gin.H{
		"id":        user.ID,
		"name":      user.Name,
		"username":  user.Username,
		"birthdate": birthdate,
		"email":     user.Email,
	}
}

func (h *AuthHandler) setAuthCookies(c *gin.Context, tokens services.AuthTokens) {
	h.setCookie(c, accessTokenCookieName, tokens.AccessToken, tokens.AccessTokenExpiry, true)
	h.setCookie(c, refreshTokenCookieName, tokens.RefreshToken, tokens.RefreshTokenExpiry, true)
}

func (h *AuthHandler) clearAuthCookies(c *gin.Context) {
	expired := time.Now().Add(-time.Hour)
	h.setCookie(c, accessTokenCookieName, "", expired, true)
	h.setCookie(c, refreshTokenCookieName, "", expired, true)
}

func (h *AuthHandler) setCookie(c *gin.Context, name, value string, expiresAt time.Time, httpOnly bool) {
	maxAge := int(time.Until(expiresAt).Seconds())
	if maxAge < 0 {
		maxAge = -1
	}

	http.SetCookie(c.Writer, &http.Cookie{
		Name:     name,
		Value:    value,
		Path:     "/",
		Domain:   h.cfg.CookieDomain,
		Expires:  expiresAt,
		MaxAge:   maxAge,
		HttpOnly: httpOnly,
		Secure:   h.cfg.CookieSecure,
		SameSite: sameSiteMode(h.cfg.CookieSameSite),
	})
}

func sameSiteMode(cfg string) http.SameSite {
	switch strings.ToLower(cfg) {
	case "lax":
		return http.SameSiteLaxMode
	case "strict":
		return http.SameSiteStrictMode
	case "none":
		return http.SameSiteNoneMode
	default:
		return http.SameSiteLaxMode
	}
}
