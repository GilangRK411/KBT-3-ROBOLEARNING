const BASE_URL = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080/api";

async function refreshToken(): Promise<void> {
  const res = await fetch(`${BASE_URL}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}), // backend will also read refresh token from cookie
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Refresh token failed");
  }
}

export async function api(
  path: string,
  init: RequestInit = {},
  retryOn401 = true
): Promise<Response> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      ...(init.headers || {}),
    },
  });

  if (res.status === 401 && retryOn401) {
    try {
      await refreshToken();
      return api(path, init, false);
    } catch {
      throw new Error("Unauthorized");
    }
  }

  return res;
}
