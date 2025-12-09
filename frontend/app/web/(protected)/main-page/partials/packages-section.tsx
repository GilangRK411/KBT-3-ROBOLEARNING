"use client";

import { useState } from "react";
import { useAuth } from "@/modules/auth/context/auth-context";
import type { Membership } from "@/modules/auth/auth";
import { useRouter } from "next/navigation";
import { PROTECTED_ROUTES } from "../../protected";

export type PackageItem = {
  icon: string;
  badge: string;
  badgeTone: "primary" | "dark";
  title: string;
  description: string;
  features: string[];
  price?: string;
  priceNote?: string;
  discount?: string;
  tag?: string;
  cta?: string;
};

const badgeToneClass: Record<PackageItem["badgeTone"], string> = {
  primary: "bg-[#D72323]/10 text-[#D72323]",
  dark: "bg-[#3E3636]/10 text-[#3E3636]",
};

export default function PackagesSection({ packages }: { packages: PackageItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { user, refreshProfile, loading } = useAuth();
  const membership = (user?.membership as Membership | null) ?? null;
  const endsAt = membership?.ends_at ? formatDate(membership.ends_at) : null;
  const isChecking = loading && !user;
  const router = useRouter();
  const showPackages = !membership;

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-base font-semibold text-[#000000]">
          <span className="text-[#D72323]">*</span>
          <span>Membership &amp; Langganan Kelas</span>
          <button className="rounded-full border border-[#F5EDED] bg-white px-3 py-1 text-xs font-semibold text-[#3E3636] transition hover:border-[#D72323] hover:text-[#D72323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]">
            All Access
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#3E3636]">
          <span className="h-2 w-2 rounded-full bg-[#D72323]" />
          <span>Mulai Rp 500.000/bulan: kelas, live session, mentor</span>
        </div>
      </div>

      <div className="rounded-2xl border border-[#F5EDED] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D72323]/10 text-sm font-bold text-[#D72323]">
              RL
            </span>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#000000]">Status Langganan</p>
              {isChecking ? (
                <p className="text-xs text-[#3E3636]">Memeriksa status langganan...</p>
              ) : membership ? (
                <p className="text-xs text-[#3E3636]">
                  {membership.plan?.name ?? "Membership aktif"} · Berlaku sampai {endsAt ?? "-"}
                </p>
              ) : (
                <p className="text-xs text-[#3E3636]">
                  Belum ada langganan aktif. Aktifkan untuk akses kelas, live session, dan mentor.
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                membership ? "bg-[#D72323]/10 text-[#D72323]" : "bg-[#F5EDED] text-[#D72323]"
              }`}
            >
              {isChecking ? "Memeriksa..." : membership ? "Aktif" : "Belum aktif"}
            </span>
            <button
              onClick={() => {
                if (membership) {
                  refreshProfile().catch(() => {});
                } else {
                  router.push(PROTECTED_ROUTES.membership);
                }
              }}
              disabled={loading}
              className="rounded-full bg-[#D72323] px-4 py-2 text-xs font-semibold text-white shadow transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {membership ? "Perbarui Status" : "Mulai Berlangganan"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.7fr_1.3fr]">
        <ActivityList />

        {showPackages ? (
          <div className="space-y-3 rounded-2xl border border-[#F5EDED] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#000000]">Paket Membership</p>
                <p className="text-xs text-[#3E3636]">Geser untuk lihat pilihan langganan</p>
              </div>
              <span className="text-[11px] font-semibold text-[#D72323]">All Access</span>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#F5EDED]">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {packages.map((item) => (
                  <div key={item.title} className="w-full flex-shrink-0 px-1 py-1">
                    <PackageCard item={item} onSelect={() => router.push(PROTECTED_ROUTES.membership)} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 pt-1">
              {packages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Paket ${idx + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    activeIndex === idx
                      ? "bg-[#D72323]"
                      : "border border-[#D72323]/40 bg-[#F5EDED]"
                  }`}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3 rounded-2xl border border-[#D72323]/10 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#000000]">Membership Aktif</p>
              <span className="text-[11px] font-semibold text-[#D72323]">
                {membership?.plan?.code ?? "aktif"}
              </span>
            </div>
            <p className="text-sm text-[#3E3636]">
              Kamu sudah berlangganan. Nikmati akses penuh kelas, sesi live, dan mentor sampai{" "}
              {endsAt ?? "-"}.
            </p>
            <div className="rounded-xl border border-[#D72323]/20 bg-[#D72323]/5 p-4 text-sm text-[#3E3636]">
              <p className="font-semibold text-[#000000]">{membership?.plan?.name ?? "Membership"}</p>
              <p>
                Durasi: {membership?.plan?.duration_days ?? "-"} hari · Harga: Rp{" "}
                {membership?.plan?.price_idr?.toLocaleString("id-ID") ?? "-"}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

type ActivityStatus = "ongoing" | "completed";

type ActivityItem = {
  title: string;
  status: ActivityStatus;
  actionLabel: string;
};

const activities: ActivityItem[] = [
  {
    title: "Dasar Robotika & Mekanika",
    status: "ongoing",
    actionLabel: "Lanjutkan",
  },
  {
    title: "Simulasi IoT: Sensor & Aktuator",
    status: "completed",
    actionLabel: "Lihat Sertifikat",
  },
  {
    title: "Proyek Smart Home dengan ESP32",
    status: "ongoing",
    actionLabel: "Lanjutkan",
  },
  {
    title: "Vision Robotika dengan Kamera",
    status: "ongoing",
    actionLabel: "Lanjutkan",
  },
];

function formatDate(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function ActivityList() {
  return (
      <div className="space-y-3 rounded-2xl border border-[#F5EDED] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 border-b border-[#F5EDED] pb-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5EDED] text-xs font-bold text-[#D72323]">
            AB
          </span>
          <div>
            <p className="text-sm font-semibold text-[#000000]">Aktivitas Belajar</p>
            <p className="text-xs text-[#3E3636]">
              Pantau progres kelas robotika, IoT, dan proyek tematik yang sedang dijalani
            </p>
          </div>
        </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <ActivityCard key={activity.title} activity={activity} />
        ))}
      </div>

      <div className="flex justify-end">
        <button className="text-xs font-semibold text-[#3E3636] underline decoration-[#3E3636]/50 underline-offset-4 transition hover:text-[#D72323] hover:decoration-[#D72323]">
          Selengkapnya
        </button>
      </div>
    </div>
  );
}

function ActivityCard({ activity }: { activity: ActivityItem }) {
  const isCompleted = activity.status === "completed";
  const statusLabel = isCompleted ? "Telah diselesaikan" : "Sedang dipelajari";

  return (
    <div
      className={`flex flex-col gap-2 rounded-xl border px-4 py-3 ${
        isCompleted ? "border-[#B8E2D0] bg-[#F3FBF7]" : "border-[#F5EDED] bg-[#F5EDED]"
      }`}
    >
      <div className="flex items-center justify-between">
        <p
          className={`text-xs font-semibold ${
            isCompleted ? "text-[#2F7A4D]" : "text-[#3E3636]"
          }`}
        >
          {statusLabel} {isCompleted ? "✓" : ""}
        </p>
        <button className="text-xs font-semibold text-[#D72323] underline decoration-[#D72323]/60 underline-offset-4 transition hover:opacity-80">
          {activity.actionLabel}
        </button>
      </div>
      <p className="text-sm font-semibold text-[#000000]">{activity.title}</p>
    </div>
  );
}

function PackageCard({ item, onSelect }: { item: PackageItem; onSelect: () => void }) {
  const isHighlighted = item.tag === "Paling diminati" || item.tag === "Serius upgrade";

  return (
    <div
      className={`flex h-full flex-col rounded-2xl border bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg ${
        isHighlighted ? "border-[#D72323]/50 shadow-md" : "border-[#F5EDED] shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5EDED] text-sm font-bold text-[#D72323]">
              {item.icon}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold ${badgeToneClass[item.badgeTone]}`}
            >
              {item.badge}
            </span>
          </div>
          {item.tag ? (
            <span
              className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold ${
                isHighlighted ? "bg-[#D72323]/10 text-[#D72323]" : "bg-[#F5EDED] text-[#3E3636]"
              }`}
            >
              {item.tag}
            </span>
          ) : null}
        </div>
        {item.discount ? (
          <span className="rounded-full bg-[#D72323]/10 px-3 py-1 text-[11px] font-semibold text-[#D72323]">
            {item.discount}
          </span>
        ) : null}
      </div>

      <h3 className="mt-3 text-base font-semibold text-[#000000]">{item.title}</h3>
      <p className="mt-2 text-sm text-[#3E3636]">{item.description}</p>

      <ul className="mt-3 space-y-2 rounded-2xl border border-[#F5EDED] bg-[#F5EDED]/60 p-3 text-sm text-[#3E3636]">
        {item.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#D72323]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between pt-4">
        <div>
          {item.priceNote ? <p className="text-xs font-semibold text-[#3E3636]">{item.priceNote}</p> : null}
          {item.price ? (
            <p className="text-lg font-bold text-[#D72323]">{item.price}</p>
          ) : null}
        </div>
        <button
          onClick={onSelect}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323] ${
            isHighlighted
              ? "bg-[#D72323] text-white shadow hover:opacity-90"
              : "border border-[#D72323] text-[#D72323] hover:bg-[#D72323] hover:text-white"
          }`}
        >
          {item.cta ?? "Lihat Detail"}
        </button>
      </div>
    </div>
  );
}
