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
