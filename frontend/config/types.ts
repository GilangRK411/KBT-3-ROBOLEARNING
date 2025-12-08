export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiEndpoint = {
  path: string;
  method: HttpMethod;
  requiresAuth?: boolean;
  description?: string;
};

export type RouteConfig = {
  path: string;
  label?: string;
  requiresAuth?: boolean;
  lockedMessage?: string;
  redirectOnLocked?: string;
};
