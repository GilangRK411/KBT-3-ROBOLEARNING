package config

import (
	"os"
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
	}
}

func envOrDefault(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}
