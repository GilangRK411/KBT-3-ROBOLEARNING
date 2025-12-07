const highlightPoints = [
  { title: "Terlengkap", detail: "Materi terbaru + latihan adaptif" },
  { title: "Hybrid", detail: "Online interaktif dan tatap muka" },
  { title: "Terbukti", detail: "Pendampingan mentor dan laporan rutin" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[#F5EDED] bg-white shadow-sm">
      <div className="absolute left-[-120px] top-[-120px] h-56 w-56 rounded-full bg-[#D72323]/10" />
      <div className="absolute right-[-80px] bottom-[-80px] h-48 w-48 rounded-full bg-[#3E3636]/5" />
      <div className="absolute inset-x-0 top-0 h-24 bg-[#F5EDED]" />

      <div className="relative grid gap-10 px-6 py-12 md:grid-cols-2 md:px-10">
        <div className="space-y-6">
          <div className="inline-flex rounded-full bg-[#D72323]/10 px-3 py-1 text-xs font-semibold text-[#D72323]">
            Bimbel Online + Offline
          </div>
          <h1 className="text-3xl font-bold leading-tight text-[#000000] md:text-4xl">
            Bimbel Terbesar, Terlengkap, dan Terbukti di Indonesia
          </h1>
          <p className="max-w-2xl text-sm text-[#3E3636]">
            Diskon spesial untukmu. Masukkan nomor HP dan dapatkan detail paket yang sesuai
            dengan kebutuhan belajar kamu.
          </p>

          <div className="flex max-w-xl flex-col gap-3">
            <div className="flex flex-col gap-3 rounded-full border border-[#F5EDED] bg-white px-3 py-2 shadow-md sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#3E3636]">
                <span className="rounded-full bg-[#F5EDED] px-3 py-1">+62</span>
                <input
                  type="tel"
                  placeholder="Masukkan nomor HP"
                  className="w-full border-none bg-transparent text-sm text-[#000000] outline-none placeholder:text-[#3E3636]"
                  aria-label="Nomor HP"
                />
              </div>
              <button className="rounded-full bg-[#D72323] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]">
                Dapatkan Diskon
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-full bg-[#D72323] px-5 py-2 text-xs font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]">
                Beli Paket Belajar
              </button>
              <button className="rounded-full border border-[#3E3636] px-5 py-2 text-xs font-semibold text-[#3E3636] transition hover:border-[#D72323] hover:text-[#D72323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]">
                Jadwalkan Konsultasi
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlightPoints.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#F5EDED] bg-[#F5EDED]/60 p-4 text-sm text-[#3E3636]"
              >
                <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#D72323]/20 text-[11px] font-bold text-[#D72323]">
                  *
                </div>
                <p className="font-semibold text-[#000000]">{item.title}</p>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative space-y-4">
          <div className="absolute left-[-24px] top-[-16px] h-10 w-10 rounded-full bg-[#D72323]/20 blur-lg" />
          <div className="rounded-3xl border border-[#F5EDED] bg-[#F5EDED]/80 p-5 shadow">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#3E3636]">Skor kesiapanmu</p>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#D72323]">
                82/100
              </span>
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-white">
              <div className="h-2 w-[82%] rounded-full bg-[#D72323]" />
            </div>
            <p className="mt-3 text-xs text-[#3E3636]">
              Rekomendasi paket sudah siap menyesuaikan target sekolah dan jurusanmu.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-[#F5EDED] bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-[#000000]">Jadwal belajar</p>
              <div className="mt-3 space-y-2 text-xs text-[#3E3636]">
                <div className="flex items-center justify-between rounded-xl bg-[#F5EDED] px-3 py-2">
                  <span>Video belajar</span>
                  <span className="font-semibold text-[#D72323]">19:00</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#F5EDED] px-3 py-2">
                  <span>Live teaching</span>
                  <span className="font-semibold text-[#D72323]">20:00</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#F5EDED] px-3 py-2">
                  <span>Tryout online</span>
                  <span className="font-semibold text-[#D72323]">Sabtu</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-[#F5EDED] bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#000000]">Rekomendasi cepat</p>
                <span className="rounded-full bg-[#D72323]/10 px-2 py-1 text-[10px] font-semibold text-[#D72323]">
                  Baru
                </span>
              </div>
              <div className="space-y-2 text-xs text-[#3E3636]">
                <div className="flex items-center justify-between">
                  <span>Paket intensif</span>
                  <span className="font-semibold text-[#D72323]">Diskon 35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Bimbel tatap muka</span>
                  <span className="font-semibold text-[#D72323]">Slot terbatas</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>English Academy</span>
                  <span className="font-semibold text-[#D72323]">Promo tengah musim</span>
                </div>
              </div>
              <button className="mt-auto self-start rounded-full bg-[#D72323] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]">
                Lihat detail paket
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
