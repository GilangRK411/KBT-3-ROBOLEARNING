"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import NavigationBar from "../../../../components/navigation-bar";
import FooterSection from "../../../../components/footer-section";
import { PROTECTED_ROUTES } from "@/config/page-endpoint-config";
import { useAuth } from "@/modules/auth/context/auth-context";
import {
  confirmCheckout,
  createCheckout,
  getPlan,
  type Membership,
  type MembershipPlan,
} from "@/modules/membership/membership";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refreshProfile } = useAuth();
  const planParam = searchParams.get("plan");
  const planNumber = parsePlanNumber(planParam);

  const [plan, setPlan] = useState<MembershipPlan | null>(null);
  const [membership, setMembership] = useState<Membership | null>(null);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loadPlan = async () => {
      if (!planNumber) {
        setError("Paket tidak valid");
        setLoadingPlan(false);
        return;
      }
      setError(null);
      setLoadingPlan(true);
      try {
        const data = await getPlan(planNumber);
        if (!cancelled) setPlan(data);
      } catch (err: any) {
        if (!cancelled) setError(err?.message || "Gagal memuat paket");
      } finally {
        if (!cancelled) setLoadingPlan(false);
      }
    };
    loadPlan();
    return () => {
      cancelled = true;
    };
  }, [planNumber]);

  const handleCheckout = async () => {
    if (!planNumber) {
      setError("Paket tidak valid");
      return;
    }
    setProcessing(true);
    setError(null);
    try {
      const session = await createCheckout(planNumber);
      const activated = await confirmCheckout(session.id);
      setMembership(activated);
      await refreshProfile();
    } catch (err: any) {
      setError(err?.message || "Checkout gagal");
    } finally {
      setProcessing(false);
    }
  };

  const planLabel = plan?.name ?? `Paket ${planParam ?? "-"}`;

  return (
    <div className="min-h-screen bg-[#f4f4f5] text-[#3E3636]">
      <NavigationBar />
      <main className="mx-auto max-w-screen-md space-y-6 px-4 pb-16 pt-10">
        <div className="rounded-3xl border border-[#F5EDED] bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D72323]">Checkout</p>
          <h1 className="text-2xl font-bold text-[#000000]">Konfirmasi Langganan</h1>
          {loadingPlan ? (
            <p className="text-sm text-[#3E3636]">Memuat detail paket...</p>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : plan ? (
            <>
              <div className="mt-3 space-y-2">
                <p className="text-sm text-[#3E3636]">
                  Paket yang dipilih: <span className="font-semibold text-[#000000]">{planLabel}</span>
                </p>
                <p className="text-sm text-[#3E3636]">
                  Durasi: {plan.duration_days} hari · Harga: Rp {plan.price_idr.toLocaleString("id-ID")}
                </p>
              </div>
              {membership ? (
                <div className="mt-4 space-y-2 rounded-2xl border border-[#D72323]/20 bg-[#D72323]/5 p-4 text-sm text-[#3E3636]">
                  <p className="font-semibold text-[#000000]">Membership aktif</p>
                  <p>
                    Berlaku sampai: {formatDate(membership.ends_at)} · Plan:{" "}
                    {membership.plan?.name ?? planLabel}
                  </p>
                  <button
                    className="mt-2 rounded-full bg-[#D72323] px-4 py-2 text-xs font-semibold text-white shadow transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
                    onClick={() => router.push(PROTECTED_ROUTES.main)}
                  >
                    Kembali ke Dashboard
                  </button>
                </div>
              ) : (
                <div className="mt-4 space-y-3 text-sm text-[#3E3636]">
                  <p>Checkout akan langsung mengaktifkan membership (tanpa pembayaran).</p>
                  <div className="flex gap-3">
                    <button
                      className="rounded-full bg-[#D72323] px-5 py-2 text-xs font-semibold text-white shadow transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323] disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={handleCheckout}
                      disabled={processing}
                    >
                      {processing ? "Memproses..." : "Checkout & Aktifkan"}
                    </button>
                    <button
                      className="rounded-full border border-[#D72323] px-5 py-2 text-xs font-semibold text-[#D72323] transition hover:bg-[#D72323] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
                      onClick={() => router.back()}
                    >
                      Ganti Paket
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>
      </main>
      <div className="mx-auto max-w-screen-xl px-4 pb-12">
        <FooterSection />
      </div>
    </div>
  );
}

function parsePlanNumber(value: string | null): number | null {
  if (!value) return null;
  const n = Number(value);
  if (n === 1 || n === 2 || n === 3) return n;
  return null;
}

function formatDate(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
