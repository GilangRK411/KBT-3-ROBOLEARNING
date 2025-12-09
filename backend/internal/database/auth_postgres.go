package database

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"

	"robolearning/config"
)

// Connect opens a PostgreSQL connection and runs a light migration to ensure tables exist.
func Connect(cfg config.Config) (*sql.DB, error) {
	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
		cfg.DBUser,
		cfg.DBPassword,
		cfg.DBHost,
		cfg.DBPort,
		cfg.DBName,
	)

	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		_ = db.Close()
		return nil, err
	}

	if err := migrate(db); err != nil {
		_ = db.Close()
		return nil, err
	}

	return db, nil
}

func migrate(db *sql.DB) error {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS users (
			id SERIAL PRIMARY KEY,
			name TEXT NOT NULL,
			username TEXT UNIQUE NOT NULL,
			birthdate DATE,
			email TEXT UNIQUE NOT NULL,
			password TEXT NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
			updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
		);`,
		`CREATE TABLE IF NOT EXISTS users_access_token (
			id SERIAL PRIMARY KEY,
			user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			access_token TEXT NOT NULL,
			expires_at TIMESTAMPTZ NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT now()
		);`,
		`CREATE UNIQUE INDEX IF NOT EXISTS idx_users_access_token_user_id ON users_access_token(user_id);`,
		`CREATE INDEX IF NOT EXISTS idx_users_access_token_token ON users_access_token(access_token);`,
		`CREATE TABLE IF NOT EXISTS users_refresh_token (
			id SERIAL PRIMARY KEY,
			user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			refresh_token TEXT NOT NULL UNIQUE,
			expires_at TIMESTAMPTZ NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT now()
		);`,
		`CREATE UNIQUE INDEX IF NOT EXISTS idx_users_refresh_token_user_id ON users_refresh_token(user_id);`,
	}

	for _, q := range queries {
		if _, err := db.Exec(q); err != nil {
			return err
		}
	}

	return createMembershipTables(db)
}
