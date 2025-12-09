import { RouteConfig } from "./types";
import { PROTECTED_ROUTES } from "../app/web/(protected)/protected";

export const WEB_ROUTES: Record<
  "landing" | "login" | "register" | "protectedHome" | "protectedMembership" | "protectedCheckout",
  RouteConfig
> = {
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
    path: PROTECTED_ROUTES.main,
    label: "Dashboard",
    requiresAuth: true,
    redirectOnLocked: "/web/login",
  },
  protectedMembership: {
    path: PROTECTED_ROUTES.membership,
    label: "Membership",
    requiresAuth: true,
    redirectOnLocked: "/web/login",
  },
  protectedCheckout: {
    path: PROTECTED_ROUTES.checkout,
    label: "Checkout",
    requiresAuth: true,
    redirectOnLocked: "/web/login",
  },
};
