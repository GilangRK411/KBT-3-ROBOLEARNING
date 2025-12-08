package config

import (
	"os"
	"strconv"
	"strings"
	"time"
)

// Config holds application level configuration.
type Config struct {
	DBHost          string
	DBPort          string
	DBUser          string
	DBPassword      string
	DBName          string
	JWTSecret       string
	AccessTokenTTL  time.Duration
	RefreshTokenTTL time.Duration
	ServerPort      string
	PasswordKey     string
	CookieDomain    string
	CookieSecure    bool
	CookieSameSite  string
	CORSOrigins     []string
}

// Load reads configuration from environment variables and applies safe defaults.
func Load() Config {
	return Config{
		DBHost:          envOrDefault("DB_HOST", "127.0.0.1"),
		DBPort:          envOrDefault("DB_PORT", "5432"),
		DBUser:          envOrDefault("DB_USER", "postgres"),
		DBPassword:      envOrDefault("DB_PASSWORD", "12345"),
		DBName:          envOrDefault("DB_NAME", "robolearning"),
		JWTSecret:       envOrDefault("JWT_SECRET", "robolearning-secret"),
		AccessTokenTTL:  time.Hour,      // 1 hour
		RefreshTokenTTL: 48 * time.Hour, // 2 days
		ServerPort:      envOrDefault("PORT", "8080"),
		PasswordKey:     envOrDefault("PASSWORD_KEY", "robolearning-password-key-32bytes!"),
		CookieDomain:    envOrDefault("COOKIE_DOMAIN", ""),
		CookieSecure:    envOrDefaultBool("COOKIE_SECURE", true), // default secure for HTTPS; override to false for local HTTP
		CookieSameSite:  envOrDefault("COOKIE_SAME_SITE", "Lax"),
		CORSOrigins:     parseCSV(envOrDefault("CORS_ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")),
	}
}

func envOrDefault(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}

func envOrDefaultBool(key string, fallback bool) bool {
	if val := os.Getenv(key); val != "" {
		if parsed, err := strconv.ParseBool(val); err == nil {
			return parsed
		}
	}
	return fallback
}

func parseCSV(val string) []string {
	parts := strings.Split(val, ",")
	var out []string
	for _, p := range parts {
		if trimmed := strings.TrimSpace(p); trimmed != "" {
			out = append(out, trimmed)
		}
	}
	if len(out) == 0 {
		return []string{"*"}
	}
	return out
}
