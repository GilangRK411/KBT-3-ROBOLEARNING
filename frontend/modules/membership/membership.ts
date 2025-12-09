import { api } from "@/lib/client";

export type MembershipPlan = {
  id: number;
  code: string;
  name: string;
  duration_days: number;
  price_idr: number;
  created_at: string;
};

export type CheckoutSession = {
  id: number;
  user_id: number;
  plan_code: string;
  amount_idr: number;
  status: string;
  expires_at: string;
  created_at: string;
  paid_at?: string;
};

export type Membership = {
  id: number;
  user_id: number;
  plan_id: number;
  starts_at: string;
  ends_at: string;
  status: string;
  created_at: string;
  plan?: MembershipPlan;
};

type PlansResponse = {
  plans: MembershipPlan[];
};

export async function fetchMembershipPlans(): Promise<MembershipPlan[]> {
  const res = await api("/memberships/plans", { method: "GET" });
  if (!res.ok) {
    throw new Error("Gagal memuat paket membership");
  }
  const data = (await res.json()) as PlansResponse;
  return data.plans || [];
}

export async function getPlan(planInput: string | number): Promise<MembershipPlan> {
  const input = typeof planInput === "number" ? String(planInput) : planInput;
  const res = await api(`/memberships/plan/${input}`, { method: "GET" });
  if (!res.ok) {
    throw new Error("Paket tidak ditemukan");
  }
  const data = (await res.json()) as { plan: MembershipPlan };
  return data.plan;
}

export async function createCheckout(planNumber: number): Promise<CheckoutSession> {
  const res = await api("/memberships/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan: planNumber }),
  });
  if (!res.ok) {
    throw new Error("Gagal membuat checkout");
  }
  const data = (await res.json()) as { checkout_session: CheckoutSession };
  return data.checkout_session;
}

export async function confirmCheckout(sessionId: number): Promise<Membership> {
  const res = await api(`/memberships/checkout/${sessionId}/confirm`, { method: "POST" });
  if (!res.ok) {
    throw new Error("Gagal mengonfirmasi checkout");
  }
  const data = (await res.json()) as { membership: Membership };
  return data.membership;
}
