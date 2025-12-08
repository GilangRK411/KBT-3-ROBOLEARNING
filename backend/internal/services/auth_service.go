package services

import (
	"database/sql"
	"errors"
	"time"

	"robolearning/config"
	"robolearning/internal/models"
	"robolearning/internal/repository"
	secure "robolearning/pkg/crypto"
	"robolearning/pkg/token"
)

var (
	ErrUserAlreadyExists  = errors.New("user already exists")
	ErrInvalidCredentials = errors.New("invalid email/username or password")
	ErrInvalidRefresh     = errors.New("invalid or expired refresh token")
)

type AuthTokens struct {
	AccessToken        string
	AccessTokenExpiry  time.Time
	RefreshToken       string
	RefreshTokenExpiry time.Time
}

type AuthService struct {
	repo   *repository.UserRepository
	tokens *token.JWTMaker
	cfg    config.Config
}

func NewAuthService(repo *repository.UserRepository, maker *token.JWTMaker, cfg config.Config) *AuthService {
	return &AuthService{
		repo:   repo,
		tokens: maker,
		cfg:    cfg,
	}
}

type RegisterInput struct {
	Name      string
	Username  string
	Birthdate time.Time
	Email     string
	Password  string
}

func (s *AuthService) Register(input RegisterInput) (*models.User, AuthTokens, error) {
	if _, err := s.repo.GetByEmail(input.Email); err == nil {
		return nil, AuthTokens{}, ErrUserAlreadyExists
	} else if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, AuthTokens{}, err
	}

	if _, err := s.repo.GetByUsername(input.Username); err == nil {
		return nil, AuthTokens{}, ErrUserAlreadyExists
	} else if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, AuthTokens{}, err
	}

	encryptedPassword, err := secure.Encrypt(input.Password, s.cfg.PasswordKey)
	if err != nil {
		return nil, AuthTokens{}, err
	}

	user := &models.User{
		Name:      input.Name,
		Username:  input.Username,
		Birthdate: input.Birthdate,
		Email:     input.Email,
		Password:  encryptedPassword,
	}

	created, err := s.repo.Create(user)
	if err != nil {
		return nil, AuthTokens{}, err
	}

	tokens, err := s.generateAndPersistTokens(created)
	if err != nil {
		return nil, AuthTokens{}, err
	}

	return created, tokens, nil
}

func (s *AuthService) Login(identifier, password string) (*models.User, AuthTokens, error) {
	user, err := s.repo.GetByEmail(identifier)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			user, err = s.repo.GetByUsername(identifier)
		}
		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				return nil, AuthTokens{}, ErrInvalidCredentials
			}
			return nil, AuthTokens{}, err
		}
	}

	decryptedPassword, err := secure.Decrypt(user.Password, s.cfg.PasswordKey)
	if err != nil {
		return nil, AuthTokens{}, err
	}

	if decryptedPassword != password {
		return nil, AuthTokens{}, ErrInvalidCredentials
	}

	tokens, err := s.generateAndPersistTokens(user)
	if err != nil {
		return nil, AuthTokens{}, err
	}

	return user, tokens, nil
}

func (s *AuthService) Refresh(refreshToken string) (*models.User, AuthTokens, error) {
	rt, err := s.repo.GetRefreshToken(refreshToken)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, AuthTokens{}, ErrInvalidRefresh
		}
		return nil, AuthTokens{}, err
	}

	if time.Now().UTC().After(rt.ExpiresAt) {
		return nil, AuthTokens{}, ErrInvalidRefresh
	}

	user, err := s.repo.GetByID(rt.UserID)
	if err != nil {
		return nil, AuthTokens{}, err
	}

	tokens, err := s.generateAndPersistTokens(user)
	if err != nil {
		return nil, AuthTokens{}, err
	}

	return user, tokens, nil
}

func (s *AuthService) generateAndPersistTokens(user *models.User) (AuthTokens, error) {
	accessToken, accessExp, err := s.tokens.GenerateAccessToken(user.ID, user.Username, s.cfg.AccessTokenTTL)
	if err != nil {
		return AuthTokens{}, err
	}

	refreshToken, refreshExp, err := s.tokens.GenerateRefreshToken(s.cfg.RefreshTokenTTL)
	if err != nil {
		return AuthTokens{}, err
	}

	if err := s.repo.SaveAccessToken(user.ID, accessToken, accessExp); err != nil {
		return AuthTokens{}, err
	}
	if err := s.repo.SaveRefreshToken(user.ID, refreshToken, refreshExp); err != nil {
		return AuthTokens{}, err
	}

	return AuthTokens{
		AccessToken:        accessToken,
		AccessTokenExpiry:  accessExp,
		RefreshToken:       refreshToken,
		RefreshTokenExpiry: refreshExp,
	}, nil
}

func (s *AuthService) RevokeTokens(userID int64) error {
	return s.repo.DeleteTokensForUser(userID)
}

func (s *AuthService) GetUserByID(userID int64) (*models.User, error) {
	return s.repo.GetByID(userID)
}
