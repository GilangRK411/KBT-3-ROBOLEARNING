'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import NavigationBar from "../../../../../components/navigation-bar";
import FooterSection from "../../../../../components/footer-section";
import iotHero from "@/assets/class/iot/iot-2.png";
import kitThumb from "@/assets/class/iot/iot-1.png";
import { PROTECTED_ROUTES, RouteHelpers } from "@/config/page-endpoint-config";
import { useAuth } from "@/modules/auth/context/auth-context";
import { getMyMembership, type Membership } from "@/modules/membership/membership";

type ModuleItem = {
  title: string;
  status: "ongoing" | "locked" | "completed";
  summary: string;
};

const modules: ModuleItem[] = [
  { title: "Dasar IoT & Sensor", status: "ongoing", summary: "Mengenal sensor, aktuator, dan alur data." },
  { title: "Konektivitas & Cloud", status: "locked", summary: "Kirim data ke cloud, visualisasi, dan alert." },
  { title: "Automasi & Edge AI", status: "locked", summary: "Logika kontrol, automasi, dan model ringan di device." },
];

const resources = [
  "Kit starter: board, sensor, aktuator, kabel",
  "Template dashboard & contoh kode",
  "Checklist instalasi dan quick start",
];

export default function IoTClassPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [membership, setMembership] = useState<Membership | null>((user?.membership as Membership | null) ?? null);
  const [checkingMembership, setCheckingMembership] = useState(true);

  useEffect(() => {
    setMembership((user?.membership as Membership | null) ?? null);
  }, [user]);

  useEffect(() => {
    const needsMembership = RouteHelpers.requiresMembership(PROTECTED_ROUTES.classes.iot);
    if (loading || !needsMembership) return;

    let cancelled = false;
    setCheckingMembership(true);
    getMyMembership()
      .then((active) => {
        if (cancelled) return;
        setMembership((active as Membership | null) ?? null);
        if (!active) {
          router.replace(PROTECTED_ROUTES.membership);
        }
      })
      .catch(() => {
        if (!cancelled) router.replace(PROTECTED_ROUTES.membership);
      })
      .finally(() => {
        if (!cancelled) setCheckingMembership(false);
      });

    return () => {
      cancelled = true;
    };
  }, [loading, router]);

  if (loading || checkingMembership || !membership) {
    return (
      <div className="min-h-screen bg-[#f4f4f5] text-[#0F172A]">
        <NavigationBar />
        <main className="mx-auto max-w-screen-xl px-4 pb-16 pt-10">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 text-sm text-[#4B5563] shadow-sm">
            Memeriksa akses membership...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f4f5] text-[#0F172A]">
      <NavigationBar />

      <main className="mx-auto max-w-screen-xl space-y-8 px-4 pb-16 pt-8">
        <section className="grid gap-6 rounded-[20px] border border-[#E5E7EB] bg-white p-6 shadow-sm md:grid-cols-[1.1fr_0.9fr] md:p-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F8FAFC] px-3 py-1 text-xs font-semibold text-[#D72323]">
              <span className="h-2 w-2 rounded-full bg-[#D72323]" />
              IoT · Jalur kelas
            </div>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">Kelas IoT</h1>
            <p className="max-w-2xl text-sm text-[#4B5563]">
              Pelajari sensor, aktuator, konektivitas, dan automasi dengan kit fisik dan simulasi. Semua materi
              dirancang minimalis supaya fokus ke praktik inti.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#modules"
                className="rounded-full bg-[#D72323] px-5 py-2 text-xs font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
              >
                Mulai modul
              </Link>
              <Link
                href="#resources"
                className="rounded-full border border-[#0F172A] px-5 py-2 text-xs font-semibold text-[#0F172A] transition hover:border-[#D72323] hover:text-[#D72323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
              >
                Lihat resource
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-5">
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 overflow-hidden rounded-xl bg-white shadow-sm">
                <Image src={kitThumb} alt="Kit IoT" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">Progress kelas</p>
                <p className="text-xs text-[#6B7280]">Modul 1 dari 3</p>
              </div>
            </div>
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
              <p className="text-sm font-semibold text-[#0F172A]">Kit & simulasi</p>
              <p className="text-xs text-[#6B7280]">Siapkan board, sensor, dan koneksi WiFi sebelum mulai.</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
              <Image src{iotHero} alt="Ilustrasi IoT" className="h-full w-full object-cover" />
            </div>
          </div>
        </section>

        <section id="modules" className="grid gap-4 md:grid-cols-3">
          {modules.map((mod) => (
            <article
              key={mod.title}
              className="flex h-full flex-col gap-2 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                    mod.status === "completed"
                      ? "bg-green-50 text-green-700"
                      : mod.status === "ongoing"
                      ? "bg-[#D72323]/10 text-[#D72323]"
                      : "bg-[#F5EDED] text-[#D72323]"
                  }`}
                >
                  {mod.status === "completed" ? "Selesai" : mod.status === "ongoing" ? "Sedang berjalan" : "Terkunci"}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-[#0F172A]">{mod.title}</h3>
              <p className="text-xs text-[#4B5563]">{mod.summary}</p>
              <button
                className="mt-auto inline-flex w-fit items-center gap-2 text-xs font-semibold text-[#D72323] underline decoration-[#D72323]/60 underline-offset-4 transition hover:text-[#a51616]"
                type="button"
              >
                {mod.status === "locked" ? "Buka modul" : "Lanjutkan"}
              </button>
            </article>
          ))}
        </section>

        <section id="resources" className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm md:p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#0F172A]">Resource utama</p>
            <span className="text-[11px] font-semibold text-[#D72323]">IoT</span>
          </div>
          <ul className="mt-3 space-y-3 text-sm text-[#374151]">
            {resources.map((item) => (
              <li key={item} className="flex items-start gap-2 rounded-xl bg-[#F8FAFC] px-3 py-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#D72323]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <FooterSection />
      </main>
    </div>
  );
}
