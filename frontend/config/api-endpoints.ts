import { ApiEndpoint } from "./types";

export const AUTH_API_ENDPOINTS: Record<
  "login" | "register" | "refresh" | "logout" | "me",
  ApiEndpoint
> = {
  login: { path: "/login", method: "POST", description: "Email/username + password" },
  register: { path: "/register", method: "POST", description: "Register new user" },
  refresh: { path: "/refresh", method: "POST", description: "Refresh access token" },
  logout: { path: "/logout", method: "POST", requiresAuth: true, description: "Revoke session" },
  me: { path: "/me", method: "GET", requiresAuth: true, description: "Current user profile" },
};

export const MEMBERSHIP_API_ENDPOINTS: Record<
  "plans" | "planDetail" | "createCheckout" | "confirmCheckout" | "myMembership",
  ApiEndpoint
> = {
  plans: { path: "/memberships/plans", method: "GET", requiresAuth: true, description: "List membership plans" },
  planDetail: {
    path: "/memberships/plan/:plan",
    method: "GET",
    requiresAuth: true,
    description: "Get plan by code or number",
  },
  createCheckout: {
    path: "/memberships/checkout",
    method: "POST",
    requiresAuth: true,
    description: "Create checkout session",
  },
  confirmCheckout: {
    path: "/memberships/checkout/:id/confirm",
    method: "POST",
    requiresAuth: true,
    description: "Confirm checkout session",
  },
  myMembership: {
    path: "/memberships/me",
    method: "GET",
    requiresAuth: true,
    description: "Active membership for current user",
  },
};
