package controllers

import (
	"database/sql"
	"fmt"
)

type membershipPlanSeed struct {
	Code         string
	Name         string
	DurationDays int
	PriceIDR     int64
}

type MembershipsCrontroller struct {
	db *sql.DB
}

func NewMembershipsCrontroller(db *sql.DB) *MembershipsCrontroller {
	return &MembershipsCrontroller{db: db}
}

var defaultMembershipPlans = []membershipPlanSeed{
	{Code: "monthly", Name: "Membership 1 Bulan", DurationDays: 30, PriceIDR: 500_000},
	{Code: "quarterly", Name: "Membership 3 Bulan", DurationDays: 90, PriceIDR: 1_500_000},
	{Code: "semiannual", Name: "Membership 6 Bulan", DurationDays: 180, PriceIDR: 3_000_000},
}

func (c *MembershipsCrontroller) EnsureDefaultPlans() error {
	for _, p := range defaultMembershipPlans {
		if _, err := c.db.Exec(`
			INSERT INTO membership_plans (code, name, duration_days, price_idr)
			VALUES ($1, $2, $3, $4)
			ON CONFLICT (code) DO UPDATE
			SET name = EXCLUDED.name,
				duration_days = EXCLUDED.duration_days,
				price_idr = EXCLUDED.price_idr;
		`, p.Code, p.Name, p.DurationDays, p.PriceIDR); err != nil {
			return fmt.Errorf("seed membership plan %s: %w", p.Code, err)
		}
	}
	return nil
}
