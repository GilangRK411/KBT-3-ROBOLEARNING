"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NavigationBar from "../../../../components/navigation-bar";
import { useAuth } from "@/modules/auth/context/auth-context";
import type { Membership } from "@/modules/auth/auth";
import { fetchMembershipPlans, type MembershipPlan } from "@/modules/membership/membership";
import { PROTECTED_ROUTES, buildCheckoutUrl } from "@/config/page-endpoint-config";

type PlanView = MembershipPlan & {
  number: number;
  tag: string;
  note: string;
  features: string[];
  displayName: string;
};

const planMeta: Record<string, { number: number; tag: string; note: string; features: string[] }> = {
  monthly: {
    number: 1,
    tag: "Coba dulu",
    note: "Paket fleksibel - coba dulu",
    features: [
      "Semua kelas IoT & robotika + rekaman",
      "Simulasi cloud lab & modul coding",
      "1x sesi mentor check-in dan review proyek",
    ],
  },
  quarterly: {
    number: 2,
    tag: "Paling diminati",
    note: "Hemat 10% - ritme belajar stabil",
    features: [
      "Semua kelas + live cohort & challenge",
      "Simulasi cloud lab & kit sharing",
      "4x mentor check-in + forum diskusi",
    ],
  },
  semiannual: {
    number: 3,
    tag: "Serius upgrade",
    note: "Hemat 20% - fokus sampai finish",
    features: [
      "Akses semua kelas & update materi baru",
      "Simulasi cloud lab + proyek tematik",
      "Coaching mingguan, career prep, prioritas support",
    ],
  },
};

export default function MembershipPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, refreshProfile } = useAuth();
  const membership = (user?.membership as Membership | null) ?? null;
  const endsAt = membership?.ends_at ? formatDate(membership.ends_at) : null;
  const selectedPlanNumber = planNumberFromParam(searchParams.get("plan"));
  const [plans, setPlans] = useState<PlanView[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoadingPlans(true);
      setError(null);
      try {
        const apiPlans = await fetchMembershipPlans();
        if (cancelled) return;
        const enriched = apiPlans
          .map((plan) => mergePlan(plan))
          .sort((a, b) => (a.number || 99) - (b.number || 99));
        setPlans(enriched);
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message || "Gagal memuat paket");
        }
      } finally {
        if (!cancelled) setLoadingPlans(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSelect = (planNumber: number) => {
    router.push(buildCheckoutUrl(planNumber));
  };

  return (
    <div className="min-h-screen bg-[#f4f4f5] text-[#3E3636]">
      <NavigationBar />

      <main className="mx-auto max-w-screen-xl px-4 pb-16 pt-8 space-y-10">
        <section className="relative overflow-hidden rounded-[28px] border border-[#F5EDED] bg-white shadow-sm">
          <div className="absolute left-[-120px] top-[-120px] h-56 w-56 rounded-full bg-[#D72323]/10" />
          <div className="absolute right-[-80px] bottom-[-80px] h-48 w-48 rounded-full bg-[#3E3636]/5" />

          <div className="relative grid gap-8 px-6 py-10 md:px-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#D72323]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#D72323]">
                Membership
              </div>
              <h1 className="text-3xl font-bold leading-tight text-[#000000] md:text-4xl">
                Pilih paket membership & nikmati akses penuh RoboLearning
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-[#3E3636]">
                Akses semua kelas IoT & robotika, sesi live, simulasi cloud lab, dan pendampingan mentor.
                Pilih paket sesuai ritme belajar kamu.
              </p>

              <StatusCard
                membership={membership}
                endsAt={endsAt}
                loading={loading}
                onRefresh={() => refreshProfile().catch(() => {})}
              />

              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#3E3636]">
                <span className="rounded-full bg-[#D72323] px-3 py-1 text-white">All Access</span>
                <span className="rounded-full bg-[#F5EDED] px-3 py-1">Live session & rekaman</span>
                <span className="rounded-full bg-[#F5EDED] px-3 py-1">Mentor check-in</span>
                <span className="rounded-full bg-[#F5EDED] px-3 py-1">Simulasi cloud lab</span>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-[#F5EDED] bg-gradient-to-br from-[#F5EDED] via-white to-[#D72323]/10 p-6 shadow">
              <p className="text-sm font-semibold text-[#000000]">Kenapa berlangganan?</p>
              <ul className="space-y-3 text-sm text-[#3E3636]">
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#D72323]" />
                  Akses seluruh konten premium dan challenge tanpa batas.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#D72323]" />
                  Mentor check-in rutin untuk review proyek dan progres.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#D72323]" />
                  Prioritas support + komunitas aktif untuk kolaborasi.
                </li>
              </ul>
              <button
                className="w-full rounded-full bg-[#D72323] px-5 py-2 text-xs font-semibold text-white shadow transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
                onClick={() => router.push(PROTECTED_ROUTES.main)}
              >
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-base font-semibold text-[#000000]">
            <span className="text-[#D72323]">*</span>
            <span>Pilih paket langganan</span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {loadingPlans ? (
              <PlanSkeletons />
            ) : error ? (
              <p className="text-sm text-red-600">{error}</p>
            ) : (
              plans.map((plan) => {
                const isActive = membership?.plan?.code === plan.code;
                const isSelected = selectedPlanNumber === plan.number;
                return (
                  <PlanCard
                    key={plan.code}
                    plan={plan}
                    isActive={!!isActive}
                    isSelected={isSelected}
                    onSelect={() => handleSelect(plan.number)}
                  />
                );
              })
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function StatusCard({
  membership,
  endsAt,
  loading,
  onRefresh,
}: {
  membership: Membership | null;
  endsAt: string | null;
  loading: boolean;
  onRefresh: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#F5EDED] bg-[#F5EDED]/70 px-4 py-3 text-sm text-[#3E3636]">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-[#000000]">Status Langganan</p>
        {membership ? (
          <p>
            {membership.plan?.name ?? "Membership aktif"} - berlaku sampai {endsAt ?? "-"}
          </p>
        ) : (
          <p>Belum ada langganan aktif. Pilih paket untuk mulai belajar.</p>
        )}
      </div>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="ml-auto rounded-full border border-[#D72323] px-4 py-2 text-xs font-semibold text-[#D72323] transition hover:bg-[#D72323] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {membership ? "Perbarui status" : "Refresh"}
      </button>
    </div>
  );
}

function PlanCard({
  plan,
  isActive,
  isSelected,
  onSelect,
}: {
  plan: PlanView;
  isActive: boolean;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={`flex h-full flex-col gap-3 rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
        isActive || isSelected ? "border-[#D72323]/50 shadow-md" : "border-[#F5EDED]"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[#000000]">{plan.displayName}</p>
          <p className="text-xs text-[#3E3636]">{plan.note}</p>
          <span
            className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold ${
              isActive
                ? "bg-[#D72323]/10 text-[#D72323]"
                : isSelected
                ? "bg-[#F5EDED] text-[#D72323]"
                : "bg-[#F5EDED] text-[#3E3636]"
            }`}
          >
            {isActive ? "Aktif" : isSelected ? "Dipilih" : plan.tag}
          </span>
        </div>
        <span className="rounded-full bg-[#D72323]/10 px-3 py-1 text-[11px] font-semibold text-[#D72323]">
          All Access
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-lg font-bold text-[#D72323]">
          Rp {plan.price_idr.toLocaleString("id-ID")}
        </p>
        <p className="text-xs text-[#3E3636]">Durasi {plan.duration_days} hari · All Access</p>
      </div>

      <ul className="space-y-2 rounded-2xl border border-[#F5EDED] bg-[#F5EDED]/60 p-3 text-sm text-[#3E3636]">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#D72323]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        disabled={isActive}
        className={`mt-auto rounded-full px-4 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323] ${
          isActive
            ? "cursor-not-allowed border border-[#D72323]/40 text-[#D72323]/60"
            : "bg-[#D72323] text-white shadow hover:opacity-90"
        }`}
      >
        {isActive ? "Sudah aktif" : "Langganan sekarang"}
      </button>
    </div>
  );
}

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

function planNumberFromParam(value: string | null): number | null {
  if (!value) return null;
  const parsed = Number(value);
  if (parsed === 1 || parsed === 2 || parsed === 3) {
    return parsed;
  }
  return null;
}

function mergePlan(plan: MembershipPlan): PlanView {
  const meta = planMeta[plan.code] || { number: 0, tag: "", note: "", features: [] };
  return {
    ...plan,
    number: meta.number || codeToNumber(plan.code) || 0,
    tag: meta.tag || "All Access",
    note: meta.note || "",
    features: meta.features || [],
    displayName: plan.name,
  };
}

function codeToNumber(code: string): number | null {
  switch (code) {
  case "monthly":
    return 1;
  case "quarterly":
    return 2;
  case "semiannual":
    return 3;
  default:
    return null;
  }
}

function PlanSkeletons() {
  const items = [1, 2, 3];
  return (
    <>
      {items.map((id) => (
        <div
          key={id}
          className="flex h-full flex-col gap-3 rounded-2xl border border-[#F5EDED] bg-white p-5 shadow-sm"
        >
          <div className="h-4 w-1/2 animate-pulse rounded bg-[#F5EDED]" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-[#F5EDED]" />
          <div className="h-10 w-full animate-pulse rounded bg-[#F5EDED]" />
          <div className="h-24 w-full animate-pulse rounded bg-[#F5EDED]" />
          <div className="h-8 w-1/2 animate-pulse rounded bg-[#F5EDED]" />
        </div>
      ))}
    </>
  );
}
