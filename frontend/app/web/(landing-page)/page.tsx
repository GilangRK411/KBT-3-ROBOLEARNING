'use client';

import Image from "next/image";
import Link from "next/link";

import NavigationBar from "../../../components/navigation-bar";
import brandLogo from "@/assets/robolearning-logo.png";
import { PROTECTED_ROUTES, WEB_ROUTES } from "@/config/page-endpoint-config";
import { useAuth } from "@/modules/auth/context/auth-context";
import EventsSection from "./partials/events-section";
import StepsSection from "./partials/steps-section";
import TestimonialsSection from "./partials/testimonials-section";

const navItems = ["Learning Path", "Langganan", "Program", "Capaian & Dampak", "Lainnya"];
const skillBadges = ["Web", "Android", "iOS"];
const heroStats = [
  { label: "Pembelajar aktif", value: "908K+", detail: "Komunitas digital & sekolah" },
  { label: "Mentor & reviewer", value: "60+", detail: "Praktisi IoT, robotik, AIoT" },
  { label: "Project terselesaikan", value: "3.2K", detail: "Portofolio siap demo" },
];
const heroGallery = [
  {
    title: "Dashboard latihan",
    caption: "Progress blok per modul",
    src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Kit robotik",
    src: "https://images.unsplash.com/photo-1582719478248-54e9f2a4f6f7?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Live cohort",
    caption: "Screen mentornya",
    src: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=800&q=60",
  },
];
const spotlightModules = [
  { title: "Fundamental & pemrograman", detail: "Dasar hardware, C/Python, kontrol perangkat." },
  { title: "Simulasi & cloud lab", detail: "MQTT, dashboard, dan integrasi API modern." },
  { title: "Bangun & demo", detail: "Line follower, smart home, AI edge siap dinilai." },
];
const learningPillars = [
  {
    title: "Jalur terkurasi",
    detail: "Track IoT & robotik dibuat menyerupai alur kerja industri supaya progresmu lurus.",
  },
  {
    title: "Hybrid kit + digital",
    detail: "Kit fisik dikirim, materi digital step-by-step, dan simulasi cloud untuk eksperimen.",
  },
  {
    title: "Ritme modern",
    detail: "Live cohort, forum diskusi, challenge bulanan, serta review tugas terjadwal.",
  },
];
const learningTracks = [
  {
    title: "Learning Path IoT",
    detail: "Kelas inti sampai proyek smart city & agritech. Cocok untuk siswa, guru, dan profesional.",
    points: ["MQTT, dashboard, otomasi sensor", "Live + rekaman, kit siap pakai"],
  },
  {
    title: "Learning Path Robotik",
    detail: "Dari dasar sampai robot otonom. Fokus ke logika kontrol, sensorik, dan demo lomba.",
    points: ["Line follower ke obstacle avoidance", "Mentor check-in dan review rutin"],
  },
  {
    title: "Workshop & Challenge",
    detail: "Sprint 2-4 minggu dengan hadiah kit advanced dan showcase ke komunitas.",
    points: ["Batch rutin, sertifikat kelulusan", "Cocok untuk klub, sekolah, kampus"],
  },
];

export default function PublicLandingPage() {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  return (
    <div className="min-h-screen bg-[#f4f4f5] text-[#3E3636]">
      {isLoggedIn ? <NavigationBar /> : <Header />}

      <main className="mx-auto max-w-screen-xl px-4 pb-20 pt-8 lg:pt-12">
        <div className="space-y-14 lg:space-y-16">
          <section className="relative overflow-hidden rounded-[32px] border border-[#F5EDED] bg-white shadow-sm">
            <div className="absolute left-[-140px] top-[-120px] h-64 w-64 rounded-full bg-[#D72323]/10 blur-3xl" />
            <div className="absolute right-[-120px] bottom-[-140px] h-64 w-64 rounded-full bg-[#3E3636]/10 blur-3xl" />

            <div className="grid items-center gap-10 px-6 py-10 md:px-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-7">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#D72323]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#D72323]">
                  IoT &amp; Robotika
                </div>
                <h1 className="text-3xl font-bold leading-tight text-[#000000] sm:text-4xl lg:text-5xl">
                  Rancang masa depanmu lewat jalur belajar yang panjang &amp; modern
                </h1>
                <p className="max-w-3xl text-sm leading-relaxed text-[#3E3636]">
                  Kurikulum bergaya industri dengan modul digital, kit fisik, dan sesi live. Semua dibuat
                  memanjang ke bawah seperti storyline supaya progresmu terasa jelas dari dasar sampai demo.
                </p>

                {isLoggedIn ? (
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={PROTECTED_ROUTES.main}
                      className="rounded-full bg-[#D72323] px-5 py-2.5 text-xs font-semibold text-white shadow transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
                    >
                      Lanjutkan belajar
                    </Link>
                    <Link
                      href={PROTECTED_ROUTES.main}
                      className="rounded-full border border-[#3E3636] px-5 py-2.5 text-xs font-semibold text-[#3E3636] transition hover:border-[#D72323] hover:text-[#D72323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
                    >
                      Jelajahi kelas
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={WEB_ROUTES.register.path}
                      className="rounded-full bg-[#D72323] px-5 py-2.5 text-xs font-semibold text-white shadow transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
                    >
                      Mulai gratis
                    </Link>
                    <Link
                      href={WEB_ROUTES.login.path}
                      className="rounded-full border border-[#3E3636] px-5 py-2.5 text-xs font-semibold text-[#3E3636] transition hover:border-[#D72323] hover:text-[#D72323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
                    >
                      Lihat demo
                    </Link>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  {skillBadges.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-[#F5EDED] bg-[#F5EDED]/80 px-3 py-1.5 text-[11px] font-semibold text-[#3E3636] shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                  <span className="rounded-full border border-[#D72323]/30 bg-[#D72323]/10 px-3 py-1.5 text-[11px] font-semibold text-[#D72323] shadow-sm">
                    Live &amp; on-demand
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {heroStats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-[#F5EDED] bg-[#F5EDED]/60 px-4 py-3 shadow-sm"
                    >
                      <p className="text-lg font-bold text-[#000000]">{item.value}</p>
                      <p className="text-xs font-semibold text-[#3E3636]">{item.label}</p>
                      <p className="text-[11px] text-[#3E3636]">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative space-y-5">
                <div className="absolute left-[-32px] top-[-20px] h-16 w-16 rounded-full bg-[#D72323]/15 blur-2xl" />
                <div className="absolute right-[-20px] bottom-[-24px] h-14 w-14 rounded-full bg-[#3E3636]/15 blur-2xl" />

                <div className="relative overflow-hidden rounded-[28px] border border-[#F5EDED] bg-gradient-to-br from-[#F5EDED] via-white to-[#D72323]/10 shadow">
                  <div className="flex flex-col gap-5 p-6 md:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#D72323]">
                          Learning Path
                        </p>
                        <p className="text-lg font-bold text-[#000000]">Robotik &amp; IoT profesional</p>
                        <p className="text-xs text-[#3E3636]">Mode mentor-led + project-based</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {spotlightModules.map((module, index) => (
                        <div
                          key={module.title}
                          className="flex items-start justify-between gap-3 rounded-2xl border border-[#F5EDED] bg-white/80 px-4 py-3 shadow-sm"
                        >
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#D72323]/10 text-xs font-bold text-[#D72323]">
                              {index + 1}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-[#000000]">{module.title}</p>
                              <p className="text-[12px] text-[#3E3636]">{module.detail}</p>
                            </div>
                          </div>
                          <span className="rounded-full bg-[#D72323]/10 px-3 py-1 text-[11px] font-semibold text-[#D72323]">
                            Live
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#F5EDED] bg-white p-4 shadow-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#D72323]">
                      Mentoring terjadwal
                    </p>
                    <p className="text-sm font-semibold text-[#000000]">
                      Check-in mingguan + review tugas oleh praktisi industri.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#D72323]/10 px-3 py-1 text-[11px] font-semibold text-[#D72323]">
                        Cohort live
                      </span>
                      <span className="rounded-full bg-[#F5EDED] px-3 py-1 text-[11px] font-semibold text-[#3E3636]">
                        Rekaman siap ulang
                      </span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[#F5EDED] bg-[#F5EDED]/70 p-4 shadow-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#3E3636]">
                      Kit fisik dikirim
                    </p>
                    <p className="text-sm font-semibold text-[#000000]">
                      Board, sensor, dan modul latihan siap dipakai tanpa ribet setup.
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="h-10 w-10 rounded-full bg-white text-center text-xs font-bold leading-10 text-[#D72323] shadow-sm">
                        Kit
                      </span>
                      <div className="text-[12px] text-[#3E3636]">
                        <p>Disertai panduan visual, video, dan forum troubleshooting.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-[#F5EDED] bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#D72323]">Cuplikan kelas</p>
                    </div>
                    <span className="rounded-full bg-[#F5EDED] px-3 py-1 text-[11px] font-semibold text-[#3E3636]">
                      Preview
                    </span>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {heroGallery.map((item) => (
                      <div key={item.title} className="overflow-hidden rounded-xl border border-[#F5EDED] bg-[#F5EDED]/60">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="h-28 w-full object-cover"
                          loading="lazy"
                        />
                        <div className="px-3 py-2">
                          <p className="text-[12px] font-semibold text-[#000000]">{item.title}</p>
                          <p className="text-[11px] text-[#3E3636]">{item.caption}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[28px] bg-white px-4 py-10 shadow-sm sm:px-8">
            <div className="mx-auto max-w-3xl text-center space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#D72323]">Kenapa RoboLearning</p>
              <h2 className="text-3xl font-bold text-[#000000]">Kurikulum ala industri, ritme modern</h2>
              <p className="text-sm text-[#3E3636]">
                Tidak pakai kartu terpisah: semua menempel di kanvas putih supaya alur belajar terlihat rapi seperti
                di Dicoding. Jelaskan value dari kiri ke kanan dengan visual learning path.
              </p>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="space-y-4">
                {learningPillars.map((pillar, idx) => (
                  <div key={pillar.title} className="border-b border-[#F5EDED] pb-4 last:border-b-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="mt-1 h-3 w-3 rounded-full bg-[#D72323]" />
                        <div>
                          <p className="text-base font-semibold text-[#000000]">{pillar.title}</p>
                          <p className="text-sm text-[#3E3636]">{pillar.detail}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[#D72323]">{idx === 0 ? "v" : ">"}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-10 h-20 w-20 rounded-full bg-[#D72323]/10 blur-3xl" />
                <div className="absolute right-6 bottom-12 h-16 w-16 rounded-full bg-[#3E3636]/10 blur-2xl" />

                <div className="relative overflow-hidden rounded-[24px] border border-[#F5EDED] bg-[#F5EDED]/60">
                  <img
                    src="https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80"
                    alt="Cuplikan kelas RoboLearning"
                    className="h-full max-h-[360px] w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 pointer-events-none">
                  <div className="pointer-events-auto absolute left-6 top-8 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#3E3636] shadow-sm">
                    {learningTracks[0].title}
                  </div>
                  <div className="pointer-events-auto absolute right-6 top-12 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#D72323] shadow-sm">
                    {learningTracks[1].title}
                  </div>
                  <div className="pointer-events-auto absolute left-10 bottom-14 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#3E3636] shadow-sm">
                    {learningTracks[2].title}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <TestimonialsSection />
          <StepsSection />
          <EventsSection />
        </div>
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="border-b border-[#F5EDED] bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-screen-xl items-center gap-6 px-4 py-4">
        <Link href={WEB_ROUTES.landing} className="flex items-center" aria-label="Beranda RoboLearning">
          <Image src={brandLogo} alt="RoboLearning" className="h-12 w-auto" priority />
        </Link>

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
