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
