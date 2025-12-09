"use client";

import { useSearchParams, useRouter } from "next/navigation";
import NavigationBar from "../main-page/partials/navigation-bar";
import FooterSection from "../main-page/partials/footer-section";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan") ?? "monthly";

  return (
    <div className="min-h-screen bg-[#F5EDED] text-[#3E3636]">
      <NavigationBar />
      <main className="mx-auto max-w-screen-md space-y-6 px-4 pb-16 pt-10">
        <div className="rounded-3xl border border-[#F5EDED] bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D72323]">Checkout</p>
          <h1 className="text-2xl font-bold text-[#000000]">Konfirmasi Langganan</h1>
          <p className="text-sm text-[#3E3636]">
            Paket yang dipilih: <span className="font-semibold text-[#000000]">{plan}</span>
          </p>
          <div className="mt-4 space-y-3 text-sm text-[#3E3636]">
            <p>Langkah berikutnya: integrasi pembayaran atau konfirmasi manual.</p>
            <p>
              Tombol ini sementara hanya menutup halaman. Sesuaikan dengan alur pembayaran yang diinginkan.
            </p>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              className="rounded-full bg-[#D72323] px-5 py-2 text-xs font-semibold text-white shadow transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
              onClick={() => router.push("/web/main-page")}
            >
              Kembali ke Dashboard
            </button>
            <button
              className="rounded-full border border-[#D72323] px-5 py-2 text-xs font-semibold text-[#D72323] transition hover:bg-[#D72323] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
              onClick={() => router.back()}
            >
              Ganti Paket
            </button>
          </div>
        </div>
      </main>
      <div className="mx-auto max-w-screen-xl px-4 pb-12">
        <FooterSection />
      </div>
    </div>
  );
}
