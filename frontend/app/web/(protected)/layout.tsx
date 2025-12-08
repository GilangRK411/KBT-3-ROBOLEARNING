import { AuthGuard } from "@/modules/auth/guards/auth-guard";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
