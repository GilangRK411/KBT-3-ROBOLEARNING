import { AUTH_API_ENDPOINTS } from "@/config/api-endpoints";

import { api } from "../../lib/client";

export type User = {
  id: number;
  name: string;
  username: string;
  birthdate?: string;
  email: string;
};

export type AuthResponse = {
  user: User;
};

async function parseJsonOrThrow(res: Response): Promise<any> {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Failed to parse response");
  }
}

export async function login(payload: { identifier: string; password: string }) {
  const res = await api(AUTH_API_ENDPOINTS.login.path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await parseJsonOrThrow(res);
    throw new Error(data.error || "Login failed");
  }
  return parseJsonOrThrow(res) as Promise<AuthResponse>;
}

export async function register(payload: {
  name: string;
  username: string;
  birthdate: string;
  email: string;
  password: string;
}) {
  const res = await api(AUTH_API_ENDPOINTS.register.path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await parseJsonOrThrow(res);
    throw new Error(data.error || "Register failed");
  }
  return parseJsonOrThrow(res) as Promise<AuthResponse>;
}

export async function me() {
  const res = await api(AUTH_API_ENDPOINTS.me.path, { method: "GET" }, false);
  if (!res.ok) {
    throw new Error("Not authenticated");
  }
  return parseJsonOrThrow(res) as Promise<AuthResponse>;
}

export async function logout() {
  await api(AUTH_API_ENDPOINTS.logout.path, { method: "POST" }, false).catch(() => {});
}
