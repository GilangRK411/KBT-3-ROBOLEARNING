'use client';

import { AuthProvider } from "@/modules/auth/context/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
