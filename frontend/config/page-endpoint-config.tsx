import { RouteConfig } from "./types";

export const WEB_ROUTES: Record<"landing" | "login" | "register" | "protectedHome", RouteConfig> = {
  landing: {
    path: "/web",
    label: "Landing",
  },
  login: {
    path: "/web/login",
    label: "Login",
  },
  register: {
    path: "/web/register",
    label: "Register",
  },
  protectedHome: {
    path: "/web/main-page",
    label: "Dashboard",
    requiresAuth: true,
    redirectOnLocked: "/web/login",
  },
};
