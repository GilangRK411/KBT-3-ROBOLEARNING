package repository

import (
	"database/sql"
	"time"

	"robolearning/internal/models"
)

type MembershipRepository struct {
	db *sql.DB
}

func NewMembershipRepository(db *sql.DB) *MembershipRepository {
	return &MembershipRepository{db: db}
}

func (r *MembershipRepository) ListPlans() ([]models.MembershipPlan, error) {
	rows, err := r.db.Query(`
		SELECT id, code, name, duration_days, price_idr, created_at
		FROM membership_plans
		ORDER BY duration_days ASC;
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var plans []models.MembershipPlan
	for rows.Next() {
		var p models.MembershipPlan
		if err := rows.Scan(&p.ID, &p.Code, &p.Name, &p.DurationDays, &p.PriceIDR, &p.CreatedAt); err != nil {
			return nil, err
		}
		plans = append(plans, p)
	}
	return plans, rows.Err()
}

func (r *MembershipRepository) GetPlanByCode(code string) (*models.MembershipPlan, error) {
	var p models.MembershipPlan
	err := r.db.QueryRow(`
		SELECT id, code, name, duration_days, price_idr, created_at
		FROM membership_plans
		WHERE code = $1
		LIMIT 1;
	`, code).Scan(&p.ID, &p.Code, &p.Name, &p.DurationDays, &p.PriceIDR, &p.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &p, nil
}

func (r *MembershipRepository) StartMembership(userID, planID int64, startsAt, endsAt time.Time, status string) (*models.UserMembership, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	if _, err := tx.Exec(`UPDATE users_membership_plans SET status = 'expired' WHERE user_id = $1 AND status = 'active'`, userID); err != nil {
		return nil, err
	}

	var membership models.UserMembership
	err = tx.QueryRow(`
		INSERT INTO users_membership_plans (user_id, plan_id, starts_at, ends_at, status)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id, user_id, plan_id, starts_at, ends_at, status, created_at;
	`, userID, planID, startsAt, endsAt, status).
		Scan(&membership.ID, &membership.UserID, &membership.PlanID, &membership.StartsAt, &membership.EndsAt, &membership.Status, &membership.CreatedAt)
	if err != nil {
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return &membership, nil
}

func (r *MembershipRepository) GetActiveMembershipWithPlan(userID int64) (*models.UserMembership, error) {
	var membership models.UserMembership
	var plan models.MembershipPlan
	err := r.db.QueryRow(`
		SELECT
			um.id, um.user_id, um.plan_id, um.starts_at, um.ends_at, um.status, um.created_at,
			p.id, p.code, p.name, p.duration_days, p.price_idr, p.created_at
		FROM users_membership_plans um
		JOIN membership_plans p ON p.id = um.plan_id
		WHERE um.user_id = $1
			AND um.status = 'active'
			AND um.ends_at > now()
		ORDER BY um.ends_at DESC
		LIMIT 1;
	`, userID).
		Scan(
			&membership.ID,
			&membership.UserID,
			&membership.PlanID,
			&membership.StartsAt,
			&membership.EndsAt,
			&membership.Status,
			&membership.CreatedAt,
			&plan.ID,
			&plan.Code,
			&plan.Name,
			&plan.DurationDays,
			&plan.PriceIDR,
			&plan.CreatedAt,
		)
	if err != nil {
		return nil, err
	}

	membership.Plan = &plan
	return &membership, nil
}

func (r *MembershipRepository) ExpireActiveMembership(userID int64) error {
	_, err := r.db.Exec(`UPDATE users_membership_plans SET status = 'expired' WHERE user_id = $1 AND status = 'active'`, userID)
	return err
}
