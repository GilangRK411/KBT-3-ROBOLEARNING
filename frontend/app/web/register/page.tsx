import Link from "next/link";

import RegisterForm from "@/components/register-form";

export default function RegisterPage() {
  return (
    <main style={containerStyle}>
      <section style={cardStyle}>
        <div style={{ display: "grid", gap: "0.35rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Daftar</h1>
          <p style={{ color: "#4b5563" }}>Buat akun baru untuk mulai menggunakan aplikasi.</p>
        </div>
        <RegisterForm />
        <p style={{ fontSize: "0.95rem" }}>
          Sudah punya akun? <Link href="/login">Masuk</Link>
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
  maxWidth: 480,
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: "1.5rem",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  display: "grid",
  gap: "1rem",
};
