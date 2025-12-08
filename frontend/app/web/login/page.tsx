import Link from "next/link";

import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
    <main style={containerStyle}>
      <section style={cardStyle}>
        <div style={{ display: "grid", gap: "0.35rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Masuk</h1>
          <p style={{ color: "#4b5563" }}>Gunakan email atau username yang sudah terdaftar.</p>
        </div>
        <LoginForm />
        <p style={{ fontSize: "0.95rem" }}>
          Belum punya akun? <Link href="/register">Daftar</Link>
        </p>
      </section>
    </main>
  );
}

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: "2rem",
  background: "#f9fafb",
};

const cardStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 420,
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: "1.5rem",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  display: "grid",
  gap: "1rem",
};
