package models

import "time"

// User represents an application user.
type User struct {
	ID        int64
	Name      string
	Username  string
	Birthdate time.Time
	Email     string
	Password  string
	CreatedAt time.Time
	UpdatedAt time.Time
}

// AccessToken represents a stored access token for auditing/revocation.
type AccessToken struct {
	ID        int64
	UserID    int64
	Token     string
	ExpiresAt time.Time
	CreatedAt time.Time
}

// RefreshToken represents a refresh token bound to a user.
type RefreshToken struct {
	ID        int64
	UserID    int64
	Token     string
	ExpiresAt time.Time
	CreatedAt time.Time
}
