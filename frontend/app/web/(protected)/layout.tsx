'use client';

import type { ReactNode } from "react";

import { AuthGuard } from "@/modules/auth/guards/auth-guard";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
