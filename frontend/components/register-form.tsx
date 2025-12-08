'use client';

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/config/context/auth-context";

export default function RegisterForm() {
  const router = useRouter();
  const { register, loading, error } = useAuth();
  const [form, setForm] = useState({
    name: "",
    username: "",
    birthdate: "",
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    try {
      await register(form);
      router.push("/");
    } catch (err: any) {
      setLocalError(err?.message || "Register gagal");
    }
  };

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.75rem" }}>
      <label style={{ display: "grid", gap: "0.25rem" }}>
        <span>Nama</span>
        <input
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          required
          placeholder="Nama lengkap"
          style={inputStyle}
        />
      </label>
      <label style={{ display: "grid", gap: "0.25rem" }}>
        <span>Username</span>
        <input
          value={form.username}
          onChange={(e) => update("username", e.target.value)}
          required
          placeholder="username"
          style={inputStyle}
        />
      </label>
      <label style={{ display: "grid", gap: "0.25rem" }}>
        <span>Tanggal Lahir</span>
        <input
          type="date"
          value={form.birthdate}
          onChange={(e) => update("birthdate", e.target.value)}
          required
          style={inputStyle}
        />
      </label>
      <label style={{ display: "grid", gap: "0.25rem" }}>
        <span>Email</span>
        <input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          required
          placeholder="email@example.com"
          style={inputStyle}
        />
      </label>
      <label style={{ display: "grid", gap: "0.25rem" }}>
        <span>Password</span>
        <input
          type="password"
          value={form.password}
          onChange={(e) => update("password", e.target.value)}
          required
          placeholder="••••••"
          style={inputStyle}
        />
      </label>
      {(error || localError) && (
        <div style={{ color: "crimson", fontSize: "0.9rem" }}>{localError || error}</div>
      )}
      <button type="submit" disabled={loading} style={buttonStyle}>
        {loading ? "Mendaftar..." : "Daftar"}
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
