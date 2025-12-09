'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import brandLogo from "@/assets/robolearning-logo.png";
import { PUBLIC_ROUTES, PROTECTED_ROUTES } from "@/config/page-endpoint-config";
import { useAuth } from "@/modules/auth/context/auth-context";

const navItems = ["Learning Path", "Langganan", "Program", "Capaian & Dampak", "Lainnya"];

export default function NavigationBar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const avatarUrl = user?.avatar_url;
  const displayName = user?.username || user?.name || "Tamu";
  const avatarSrc = avatarUrl || "https://avatar.iran.liara.run/public";

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
  };

  return (
    <div className="border-b border-[#F5EDED] bg-white">
      <div className="mx-auto flex max-w-screen-xl items-center gap-4 px-4 py-4">
        <Link href={PUBLIC_ROUTES.landing} aria-label="Beranda RoboLearning" className="flex items-center">
          <Image src={brandLogo} alt="RoboLearning" className="h-12 w-auto" priority />
        </Link>

        <nav className="hidden flex-1 items-center gap-6 text-sm font-semibold text-[#3E3636] md:flex">
          {navItems.map((item) => (
            <button
              key={item}
              className="rounded px-2 py-1 transition hover:text-[#D72323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Link
            href={PROTECTED_ROUTES.main}
            className="text-sm font-semibold text-[#3E3636] transition hover:text-[#D72323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
          >
            Dashboard
          </Link>

          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-white"
              onClick={() => setMenuOpen((prev) => !prev)}
              onBlur={() => setTimeout(() => setMenuOpen(false), 120)}
              aria-label="Menu pengguna"
            >
              <img
                src={avatarSrc}
                alt={displayName}
                className="h-9 w-9 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://avatar.iran.liara.run/public";
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-[#3E3636]"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path d="M6 8l4 4 4-4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {menuOpen ? (
              <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-lg">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm font-semibold text-[#D72323] transition hover:bg-[#f4f4f5]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M15 12H4"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11 8l-4 4 4 4"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 4h2a3 3 0 013 3v10a3 3 0 01-3 3h-2"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F5EDED] bg-white text-[#3E3636] transition hover:border-[#D72323] hover:text-[#D72323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
            aria-label="Notifikasi"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M12 6a4 4 0 00-4 4v2.5c0 .47-.17.93-.48 1.28l-.96 1.12a.75.75 0 00.57 1.22h10.74a.75.75 0 00.57-1.22l-.96-1.12a1.8 1.8 0 01-.48-1.28V10a4 4 0 00-4-4z"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M10 19a2 2 0 004 0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
