'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@/config/context/auth-context";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!loading && !user) {
      const next = searchParams.get("next");
      const redirect = next ? `/login?next=${encodeURIComponent(next)}` : "/login";
      router.replace(redirect);
    }
  }, [loading, user, router, searchParams]);

  if (loading) {
    return <div style={{ padding: "1rem" }}>Memeriksa sesi...</div>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
