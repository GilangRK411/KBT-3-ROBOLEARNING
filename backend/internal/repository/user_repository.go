package repository

import (
	"database/sql"
	"time"

	"robolearning/internal/models"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) Create(user *models.User) (*models.User, error) {
	var birthdate sql.NullTime
	if !user.Birthdate.IsZero() {
		birthdate = sql.NullTime{Time: user.Birthdate, Valid: true}
	}

	query := `
		INSERT INTO users (name, username, birthdate, email, password)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id, created_at, updated_at, password;
	`

	var created models.User
	err := r.db.QueryRow(query, user.Name, user.Username, birthdate, user.Email, user.Password).
		Scan(&created.ID, &created.CreatedAt, &created.UpdatedAt, &created.Password)
	if err != nil {
		return nil, err
	}

	created.Name = user.Name
	created.Username = user.Username
	created.Email = user.Email
	if birthdate.Valid {
		created.Birthdate = birthdate.Time
	}

	return &created, nil
}

func (r *UserRepository) GetByEmail(email string) (*models.User, error) {
	return r.getOne("email = $1", email)
}

func (r *UserRepository) GetByUsername(username string) (*models.User, error) {
	return r.getOne("username = $1", username)
}

func (r *UserRepository) GetByID(id int64) (*models.User, error) {
	return r.getOne("id = $1", id)
}

func (r *UserRepository) getOne(where string, value interface{}) (*models.User, error) {
	query := `
		SELECT id, name, username, birthdate, email, password, created_at, updated_at
		FROM users
		WHERE ` + where + `
		LIMIT 1;
	`

	var user models.User
	var birthdate sql.NullTime
	err := r.db.QueryRow(query, value).
		Scan(&user.ID, &user.Name, &user.Username, &birthdate, &user.Email, &user.Password, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return nil, err
	}
	if birthdate.Valid {
		user.Birthdate = birthdate.Time
	}

	return &user, nil
}

func (r *UserRepository) SaveAccessToken(userID int64, token string, expiresAt time.Time) error {
	_, err := r.db.Exec(`
		INSERT INTO users_access_token (user_id, access_token, expires_at)
		VALUES ($1, $2, $3)
		ON CONFLICT (user_id) DO UPDATE
		SET access_token = EXCLUDED.access_token,
			expires_at = EXCLUDED.expires_at,
			created_at = now();
	`, userID, token, expiresAt)
	return err
}

func (r *UserRepository) SaveRefreshToken(userID int64, token string, expiresAt time.Time) error {
	_, err := r.db.Exec(`
		INSERT INTO users_refresh_token (user_id, refresh_token, expires_at)
		VALUES ($1, $2, $3)
		ON CONFLICT (user_id) DO UPDATE
		SET refresh_token = EXCLUDED.refresh_token,
			expires_at = EXCLUDED.expires_at,
			created_at = now();
	`, userID, token, expiresAt)
	return err
}

func (r *UserRepository) GetRefreshToken(token string) (*models.RefreshToken, error) {
	query := `
		SELECT id, user_id, refresh_token, expires_at, created_at
		FROM users_refresh_token
		WHERE refresh_token = $1
		LIMIT 1;
	`

	var rt models.RefreshToken
	err := r.db.QueryRow(query, token).Scan(&rt.ID, &rt.UserID, &rt.Token, &rt.ExpiresAt, &rt.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &rt, nil
}

func (r *UserRepository) GetAccessToken(token string) (*models.AccessToken, error) {
	query := `
		SELECT id, user_id, access_token, expires_at, created_at
		FROM users_access_token
		WHERE access_token = $1
		LIMIT 1;
	`

	var at models.AccessToken
	err := r.db.QueryRow(query, token).Scan(&at.ID, &at.UserID, &at.Token, &at.ExpiresAt, &at.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &at, nil
}

func (r *UserRepository) DeleteTokensForUser(userID int64) error {
	if _, err := r.db.Exec(`DELETE FROM users_access_token WHERE user_id = $1`, userID); err != nil {
		return err
	}
	_, err := r.db.Exec(`DELETE FROM users_refresh_token WHERE user_id = $1`, userID)
	return err
}
