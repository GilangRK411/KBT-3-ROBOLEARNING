package models

import "time"

type MembershipPlan struct {
	ID           int64
	Code         string
	Name         string
	DurationDays int
	PriceIDR     int64
	CreatedAt    time.Time
}

type UserMembership struct {
	ID        int64
	UserID    int64
	PlanID    int64
	StartsAt  time.Time
	EndsAt    time.Time
	Status    string
	CreatedAt time.Time
	Plan      *MembershipPlan
}
