package database

import "database/sql"

func createMembershipTables(db *sql.DB) error {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS membership_plans (
			id SERIAL PRIMARY KEY,
			code TEXT NOT NULL UNIQUE,
			name TEXT NOT NULL,
			duration_days INT NOT NULL,
			price_idr BIGINT NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT now()
		);`,
		`CREATE TABLE IF NOT EXISTS users_membership_plans (
			id SERIAL PRIMARY KEY,
			user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			plan_id INTEGER NOT NULL REFERENCES membership_plans(id),
			starts_at TIMESTAMPTZ NOT NULL,
			ends_at TIMESTAMPTZ NOT NULL,
			status TEXT NOT NULL DEFAULT 'active',
			created_at TIMESTAMPTZ NOT NULL DEFAULT now()
		);`,
		`CREATE INDEX IF NOT EXISTS idx_users_membership_plans_user_id ON users_membership_plans(user_id);`,
		`CREATE INDEX IF NOT EXISTS idx_users_membership_plans_plan_id ON users_membership_plans(plan_id);`,
		`CREATE INDEX IF NOT EXISTS idx_users_membership_plans_status ON users_membership_plans(status);`,
		`CREATE UNIQUE INDEX IF NOT EXISTS idx_users_membership_plans_active ON users_membership_plans(user_id) WHERE status = 'active';`,
	}

	for _, q := range queries {
		if _, err := db.Exec(q); err != nil {
			return err
		}
	}
	return nil
}
