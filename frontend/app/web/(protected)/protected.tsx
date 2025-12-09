"use client";

export const PROTECTED_ROUTES = {
  main: "/web/main-page",
  membership: "/web/membership-page",
  checkout: "/web/checkout-page",
};

export function buildCheckoutUrl(plan: number | string) {
  return `${PROTECTED_ROUTES.checkout}?plan=${plan}`;
}
