import Link from "next/link";

import { WEB_ROUTES } from "@/config/page-endpoint-config";

const navItems = ["Learning Path", "Langganan", "Program", "Capaian & Dampak", "Lainnya"];
const skillBadges = ["Web", "Android", "iOS"];

export default function PublicLandingPage() {
  return (
    <div className="min-h-screen bg-[#F5EDED] text-[#3E3636]">
      <Header />

      <main className="mx-auto max-w-screen-xl px-4 pb-16 pt-8 lg:pt-10">
        <section className="relative overflow-hidden rounded-[32px] border border-[#F5EDED] bg-white shadow-sm">
          <div className="absolute left-[-120px] top-[-120px] h-56 w-56 rounded-full bg-[#D72323]/10" />
          <div className="absolute right-[-80px] bottom-[-80px] h-48 w-48 rounded-full bg-[#3E3636]/5" />
          <div className="grid items-center gap-10 px-6 py-10 md:px-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-7">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#D72323]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#D72323]">
                Learning Path
              </div>
              <h1 className="text-3xl font-bold leading-tight text-[#000000] sm:text-4xl lg:text-5xl">
                Bangun Karirmu Sebagai Developer Profesional
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-[#3E3636]">
                Mulai belajar terarah dengan jalur yang sudah dikurasi mentor. Simulasi real, proyek
                nyata, dan dukungan komunitas supaya kamu konsisten sampai dapat hasil.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={WEB_ROUTES.register.path}
                  className="rounded-full bg-[#D72323] px-5 py-2.5 text-xs font-semibold text-white shadow transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
                >
                  Belajar Sekarang
                </Link>
                <Link
                  href={WEB_ROUTES.login.path}
                  className="rounded-full border border-[#3E3636] px-5 py-2.5 text-xs font-semibold text-[#3E3636] transition hover:border-[#D72323] hover:text-[#D72323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
                >
                  Masuk untuk lanjut
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {skillBadges.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[#F5EDED] bg-[#F5EDED]/80 px-3 py-1.5 text-[11px] font-semibold text-[#3E3636] shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative space-y-5">
              <div className="absolute left-[-24px] top-[-24px] h-12 w-12 rounded-full bg-[#D72323]/20 blur-lg" />
              <div className="absolute right-[-32px] bottom-[-28px] h-16 w-16 rounded-full bg-[#3E3636]/15 blur-xl" />

              <div className="relative overflow-hidden rounded-[28px] border border-[#F5EDED] bg-gradient-to-br from-[#F5EDED] via-white to-[#D72323]/10 shadow">
                <div className="flex flex-col gap-6 p-6 md:p-8">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-[#F5EDED] bg-gradient-to-br from-[#F5EDED] via-white to-[#D72323]/20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(215,35,35,0.25),transparent_36%),radial-gradient(circle_at_80%_0%,rgba(62,54,54,0.18),transparent_40%)]" />
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80"
                      alt="Komunitas belajar pengembang"
                      className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-multiply"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/45 via-transparent to-transparent" />

                    <div className="absolute right-5 top-5 grid gap-3">
                      {["Robot", "IoT"].map((item) => (
                        <div
                          key={item}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-[#3E3636] shadow-lg shadow-[#3E3636]/10 backdrop-blur"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[#F5EDED] bg-[#F5EDED]/80 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#3E3636]">
                        Fokus
                      </p>
                      <p className="text-sm font-semibold text-[#000000]">
                        IoT, Smart City, Robotik, dll.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#F5EDED] bg-white p-4 shadow-sm">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#D72323]">
                        Belajar dengan mentor
                      </p>
                      <p className="text-sm font-semibold text-[#3E3636]">
                        Simulasi interaktif, proyek nyata, dan sesi review rutin.
                      </p>
                    </div>
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

function Header() {
  return (
    <header className="border-b border-[#F5EDED] bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-screen-xl items-center gap-6 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D72323] text-sm font-bold text-white shadow-sm shadow-[#D72323]/30">
            RL
          </div>
          <span className="text-lg font-semibold tracking-tight text-[#3E3636]">RoboLearning</span>
        </div>

        <div className="hidden flex-1 items-center gap-4 lg:flex">
          <nav className="flex items-center gap-5 text-sm font-semibold text-[#3E3636]">
            {navItems.map((item) => (
              <button
                type="button"
                key={item}
                className="rounded-md px-1 py-1 transition hover:text-[#D72323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D72323]"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href={WEB_ROUTES.login.path}
            className="rounded-full border border-[#D72323] px-4 py-2 text-xs font-semibold text-[#D72323] transition hover:bg-[#D72323] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
          >
            Masuk
          </Link>
          <Link
            href={WEB_ROUTES.register.path}
            className="rounded-full bg-[#D72323] px-4 py-2 text-xs font-semibold text-white shadow transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
          >
            Daftar
          </Link>
        </div>
      </div>

      <div className="border-t border-[#F5EDED] px-4 pb-4 lg:hidden">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-3">
          <div className="flex items-center gap-3 overflow-x-auto text-sm font-semibold text-[#3E3636]">
            {navItems.map((item) => (
              <span
                key={item}
                className="whitespace-nowrap rounded-full border border-[#F5EDED] bg-[#F5EDED] px-3 py-2 shadow-sm"
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
