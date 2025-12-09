package services

import (
	"database/sql"
	"errors"
	"strconv"
	"time"

	"robolearning/internal/controllers"
	"robolearning/internal/models"
	"robolearning/internal/repository"
)

var (
	ErrPlanNotFound       = errors.New("membership plan not found")
	ErrNoActiveMembership = errors.New("no active membership")
	ErrInvalidPlanInput   = errors.New("invalid plan input")
	ErrSessionNotFound    = errors.New("checkout session not found")
	ErrSessionExpired     = errors.New("checkout session expired")
	ErrSessionNotPending  = errors.New("checkout session not pending")
)

type MembershipService struct {
	repo       *repository.MembershipRepository
	controller *controllers.MembershipsCrontroller
}

func NewMembershipService(repo *repository.MembershipRepository, controller *controllers.MembershipsCrontroller) *MembershipService {
	return &MembershipService{
		repo:       repo,
		controller: controller,
	}
}

func (s *MembershipService) Subscribe(userID int64, planCode string) (*models.UserMembership, error) {
	if err := s.ensurePlans(); err != nil {
		return nil, err
	}

	plan, err := s.repo.GetPlanByCode(planCode)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrPlanNotFound
		}
		return nil, err
	}

	now := time.Now().UTC()
	endsAt := now.Add(time.Duration(plan.DurationDays) * 24 * time.Hour)

	membership, err := s.repo.StartMembership(userID, plan.ID, now, endsAt, "active")
	if err != nil {
		return nil, err
	}
	membership.Plan = plan
	return membership, nil
}

func (s *MembershipService) GetActiveMembership(userID int64) (*models.UserMembership, error) {
	membership, err := s.repo.GetActiveMembershipWithPlan(userID)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNoActiveMembership
		}
		return nil, err
	}
	return membership, nil
}

func (s *MembershipService) ensurePlans() error {
	if s.controller == nil {
		return nil
	}
	return s.controller.EnsureDefaultPlans()
}

// ResolvePlanCode accepts either direct plan code or numeric plan (1/2/3) and returns canonical code.
func (s *MembershipService) ResolvePlanCode(planCode string, planNumber int) (string, error) {
	if planCode != "" {
		return planCode, nil
	}

	code, ok := planNumberToCode(planNumber)
	if !ok {
		return "", ErrInvalidPlanInput
	}
	return code, nil
}

// GetPlanByInput resolves plan from path/query input (code or number).
func (s *MembershipService) GetPlanByInput(input string) (*models.MembershipPlan, error) {
	if err := s.ensurePlans(); err != nil {
		return nil, err
	}

	// try numeric
	if n, err := strconv.Atoi(input); err == nil {
		if code, ok := planNumberToCode(n); ok {
			return s.repo.GetPlanByCode(code)
		}
		return nil, ErrInvalidPlanInput
	}

	// fallback code
	plan, err := s.repo.GetPlanByCode(input)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrPlanNotFound
		}
		return nil, err
	}
	return plan, nil
}

func planNumberToCode(n int) (string, bool) {
	switch n {
	case 1:
		return "monthly", true
	case 2:
		return "quarterly", true
	case 3:
		return "semiannual", true
	default:
		return "", false
	}
}

// Checkout sessions

const checkoutTTL = 30 * time.Minute

func (s *MembershipService) CreateCheckoutSession(userID int64, planCode string) (*models.CheckoutSession, error) {
	if err := s.ensurePlans(); err != nil {
		return nil, err
	}

	plan, err := s.repo.GetPlanByCode(planCode)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrPlanNotFound
		}
		return nil, err
	}

	expiresAt := time.Now().Add(checkoutTTL)
	return s.repo.CreateCheckoutSession(userID, plan.Code, plan.PriceIDR, expiresAt)
}

func (s *MembershipService) GetCheckoutSession(id int64) (*models.CheckoutSession, error) {
	cs, err := s.repo.GetCheckoutSession(id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrSessionNotFound
		}
		return nil, err
	}
	return cs, nil
}

func (s *MembershipService) ConfirmCheckoutSession(sessionID, userID int64) (*models.UserMembership, error) {
	cs, err := s.GetCheckoutSession(sessionID)
	if err != nil {
		return nil, err
	}

	if cs.UserID != userID {
		return nil, ErrSessionNotFound
	}
	if cs.Status != "pending" {
		return nil, ErrSessionNotPending
	}
	if time.Now().After(cs.ExpiresAt) {
		_ = s.repo.ExpireCheckoutSession(sessionID)
		return nil, ErrSessionExpired
	}

	membership, err := s.Subscribe(userID, cs.PlanCode)
	if err != nil {
		return nil, err
	}

	_ = s.repo.MarkCheckoutSessionPaid(sessionID)
	return membership, nil
}
