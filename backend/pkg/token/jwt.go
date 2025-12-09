package token

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type JWTMaker struct {
	secret []byte
}

func NewJWTMaker(secret string) *JWTMaker {
	return &JWTMaker{secret: []byte(secret)}
}

func (m *JWTMaker) GenerateAccessToken(userID int64, username string, ttl time.Duration, extraClaims map[string]interface{}) (string, time.Time, error) {
	now := time.Now().UTC()
	expiresAt := now.Add(ttl)

	claims := jwt.MapClaims{
		"sub":      userID,
		"user_id":  userID,
		"username": username,
		"iat":      now.Unix(),
		"exp":      expiresAt.Unix(),
	}

	for k, v := range extraClaims {
		claims[k] = v
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signed, err := token.SignedString(m.secret)
	if err != nil {
		return "", time.Time{}, err
	}

	return signed, expiresAt, nil
}

func (m *JWTMaker) GenerateRefreshToken(ttl time.Duration) (string, time.Time, error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", time.Time{}, err
	}

	token := base64.RawURLEncoding.EncodeToString(b)
	return token, time.Now().UTC().Add(ttl), nil
}

func (m *JWTMaker) VerifyAccessToken(tokenStr string) (jwt.MapClaims, error) {
	parsed, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}
		return m.secret, nil
	})
	if err != nil {
		return nil, err
	}

	claims, ok := parsed.Claims.(jwt.MapClaims)
	if !ok || !parsed.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}
