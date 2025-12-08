'use client';

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WEB_ROUTES } from "@/config/page-endpoint-config";
import { useAuth } from "@/config/context/auth-context";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, loading, error } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    try {
      await login({ identifier, password });
      const next = searchParams.get("next");
      router.push(next || WEB_ROUTES.protectedHome.path);
    } catch (err: any) {
      setLocalError(err?.message || "Login gagal");
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.75rem" }}>
      <label style={{ display: "grid", gap: "0.25rem" }}>
        <span>Email atau Username</span>
        <input
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          placeholder="email atau username"
          style={inputStyle}
        />
      </label>
      <label style={{ display: "grid", gap: "0.25rem" }}>
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••"
          style={inputStyle}
        />
      </label>
      {(error || localError) && (
        <div style={{ color: "crimson", fontSize: "0.9rem" }}>{localError || error}</div>
      )}
      <button type="submit" disabled={loading} style={buttonStyle}>
        {loading ? "Masuk..." : "Login"}
      </button>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "0.65rem 0.75rem",
  borderRadius: 8,
  border: "1px solid #d1d5db",
};

const buttonStyle: React.CSSProperties = {
  padding: "0.75rem",
  borderRadius: 8,
  border: "1px solid transparent",
  background: "#111827",
  color: "white",
  cursor: "pointer",
};
