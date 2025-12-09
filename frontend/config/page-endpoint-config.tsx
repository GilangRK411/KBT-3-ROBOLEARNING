import { RouteConfig } from "./types";

// ==================== Route Constants ====================
export const PUBLIC_ROUTES = {
  landing: "/web",
  login: "/web/login",
  register: "/web/register",
} as const;

export const PROTECTED_ROUTES = {
  main: "/web/main-page",
  membership: "/web/membership-page",
  checkout: "/web/checkout-page",
  classes: {
    iot: "/web/class-page/iot",
    robotik: "/web/class-page/robotik",
  },
} as const;

// Membership-protected paths (must be logged in + have membership)
export const MEMBERSHIP_REQUIRED_ROUTES = [
  PROTECTED_ROUTES.classes.iot,
  PROTECTED_ROUTES.classes.robotik,
] as const;

// ==================== Route Builders ====================
export const RouteBuilder = {
  checkout: (plan: number | string) => 
    `${PROTECTED_ROUTES.checkout}?plan=${plan}`,
  
  classByKey: (key: keyof typeof PROTECTED_ROUTES.classes) => 
    PROTECTED_ROUTES.classes[key],
} as const;

export const buildCheckoutUrl = RouteBuilder.checkout;
export const classRouteByKey = RouteBuilder.classByKey;

// ==================== Route Configurations ====================
export const WEB_ROUTES: Record<string, RouteConfig> = {
  landing: {
    path: PUBLIC_ROUTES.landing,
    label: "Landing",
  },
  login: {
    path: PUBLIC_ROUTES.login,
    label: "Login",
  },
  register: {
    path: PUBLIC_ROUTES.register,
    label: "Register",
  },
  protectedHome: {
    path: PROTECTED_ROUTES.main,
    label: "Dashboard",
    requiresAuth: true,
    redirectOnLocked: PUBLIC_ROUTES.login,
  },
  protectedMembership: {
    path: PROTECTED_ROUTES.membership,
    label: "Membership",
    requiresAuth: true,
    redirectOnLocked: PUBLIC_ROUTES.login,
  },
  protectedCheckout: {
    path: PROTECTED_ROUTES.checkout,
    label: "Checkout",
    requiresAuth: true,
    redirectOnLocked: PUBLIC_ROUTES.login,
  },
  classIot: {
    path: PROTECTED_ROUTES.classes.iot,
    label: "Kelas IoT",
    requiresAuth: true,
    requiresMembership: true,
    redirectOnLocked: PUBLIC_ROUTES.login,
  },
  classRobotik: {
    path: PROTECTED_ROUTES.classes.robotik,
    label: "Kelas Robotik",
    requiresAuth: true,
    requiresMembership: true,
    redirectOnLocked: PUBLIC_ROUTES.login,
  },
};

// ==================== Helper Functions ====================
export const RouteHelpers = {
  isPublicRoute: (path: string) => 
    Object.values(PUBLIC_ROUTES).includes(path as any),
  
  isProtectedRoute: (path: string) => 
    path.startsWith("/web/") && !RouteHelpers.isPublicRoute(path),
  
  getRouteConfig: (key: keyof typeof WEB_ROUTES) => 
    WEB_ROUTES[key],

  requiresMembership: (path: string) =>
    MEMBERSHIP_REQUIRED_ROUTES.includes(path as (typeof MEMBERSHIP_REQUIRED_ROUTES)[number]),
} as const;
