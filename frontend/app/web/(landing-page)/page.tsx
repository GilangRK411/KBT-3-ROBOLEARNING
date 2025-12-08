import Link from "next/link";

import { WEB_ROUTES } from "@/config/page-endpoint-config";

const navItems = ["Learning Path", "Langganan", "Program", "Capaian & Dampak", "Lainnya"];
const skillBadges = ["Web", "Android", "iOS", "Data", "Cloud"];

export default function PublicLandingPage() {
  return (
    <div className="min-h-screen bg-[#f6f8fb] text-[#0f1b2d]">
      <TopAnnouncement />
      <Header />

      <main className="mx-auto max-w-screen-xl px-4 pb-16 pt-12 lg:pt-14">
        <section className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-7">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1b7d8f]">
              Learning Path
            </p>
            <h1 className="text-4xl font-bold leading-tight text-[#1b2d3f] sm:text-5xl">
              Bangun Karirmu Sebagai Developer Profesional
            </h1>
            <p className="text-lg leading-relaxed text-[#4b5563]">
              Mulai belajar terarah dengan jalur yang sudah dikurasi mentor. Simulasi real, proyek
              nyata, dan dukungan komunitas supaya kamu konsisten sampai dapat hasil.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={WEB_ROUTES.register.path}
                className="rounded-lg bg-[#1b2d3f] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1b2d3f]/20 transition hover:-translate-y-0.5 hover:bg-[#0f1f33]"
              >
                Belajar Sekarang
              </Link>
              <Link
                href={WEB_ROUTES.login.path}
                className="rounded-lg border border-[#1b2d3f] px-5 py-3 text-sm font-semibold text-[#1b2d3f] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Masuk untuk lanjut
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {skillBadges.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#1b2d3f] shadow-sm ring-1 ring-[#d8e1f2]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute -left-6 -top-8 h-32 w-32 rounded-full bg-[#c7ecf0] blur-2xl"
            />
            <div
              aria-hidden
              className="absolute -right-8 bottom-0 h-40 w-40 rounded-full bg-[#d6def7] blur-3xl"
            />

            <div className="relative overflow-hidden rounded-[32px] bg-white shadow-2xl ring-1 ring-[#e7ecf5]">
              <div className="flex flex-col gap-6 p-6 md:p-8">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#12b3c7] via-[#1d91c2] to-[#0f4c75]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_36%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.12),transparent_40%)]" />
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80"
                    alt="Komunitas belajar pengembang"
                    className="absolute inset-0 h-full w-full object-cover opacity-95 mix-blend-luminosity"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f33]/60 via-transparent to-transparent" />

                  <div className="absolute right-5 top-5 grid gap-3">
                    {["</>", "AI", "IoT", "Cloud"].map((item) => (
                      <div
                        key={item}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-[#0f1f33] shadow-lg shadow-[#0f1f33]/10 backdrop-blur"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#f5f7fb] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#4b5563]">
                      Fokus
                    </p>
                    <p className="text-sm font-semibold text-[#1b2d3f]">
                      Coding, UI/UX, DevOps, dan soft-skill industri.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#f0f9fb] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#1b7d8f]">
                      Belajar dengan mentor
                    </p>
                    <p className="text-sm font-semibold text-[#0f2d52]">
                      Simulasi interaktif, proyek tematik, dan sesi review rutin.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function TopAnnouncement() {
  return (
    <div className="bg-[#0f2d52] px-4 py-3 text-xs font-medium text-white sm:text-sm">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-3">
        <span>
          Dibuka! Beasiswa Coding Camp 2026 powered by DBS Foundation untuk pelajar & umum.
        </span>
        <Link
          href={WEB_ROUTES.login.path}
          className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20"
        >
          Lihat di sini →
        </Link>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="border-b border-[#e7ecf5] bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-screen-xl items-center gap-6 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0f2d52] text-lg font-extrabold text-white shadow-md shadow-[#0f2d52]/20">
            g
          </div>
          <span className="text-lg font-semibold tracking-tight text-[#1b2d3f]">RoboLearning</span>
        </div>

        <div className="hidden flex-1 items-center gap-4 lg:flex">
          <SearchBox />
          <nav className="flex items-center gap-5 text-sm font-semibold text-[#1b2d3f]">
            {navItems.map((item) => (
              <button
                type="button"
                key={item}
                className="rounded-md px-1 py-1 transition hover:text-[#0f2d52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0f2d52]"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href={WEB_ROUTES.login.path}
            className="rounded-lg border border-[#0f2d52] px-4 py-2 text-sm font-semibold text-[#0f2d52] transition hover:bg-[#0f2d52] hover:text-white"
          >
            Masuk
          </Link>
          <Link
            href={WEB_ROUTES.register.path}
            className="rounded-lg bg-[#0f2d52] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#0f2d52]/20 transition hover:-translate-y-0.5 hover:bg-[#0a1f3b]"
          >
            Daftar
          </Link>
        </div>
      </div>

      <div className="border-t border-[#e7ecf5] px-4 pb-4 lg:hidden">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-3">
          <SearchBox />
          <div className="flex items-center gap-3 overflow-x-auto text-sm font-semibold text-[#1b2d3f]">
            {navItems.map((item) => (
              <span
                key={item}
                className="whitespace-nowrap rounded-full bg-[#f0f4fa] px-3 py-2 shadow-sm ring-1 ring-[#d8e1f2]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function SearchBox() {
  return (
    <div className="relative w-full max-w-xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6b7280]"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="16.65" y1="16.65" x2="21" y2="21" />
      </svg>
      <input
        type="search"
        placeholder="Apa yang ingin Anda pelajari?"
        className="w-full rounded-xl border border-[#e7ecf5] bg-[#f3f6fb] px-4 py-3 pl-11 text-sm text-[#1b2d3f] placeholder:text-[#8a92a6] shadow-inner shadow-white/60 transition focus:border-[#0f2d52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2fa8b8]/40"
      />
    </div>
  );
}
