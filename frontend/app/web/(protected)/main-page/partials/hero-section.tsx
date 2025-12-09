const featureList = [
  "IoT & Robotik: simulasi, coding, dan kontrol perangkat nyata",
  "Hybrid kit + digital: modul interaktif dengan kit fisik siap pakai",
  "Project-based: portfolio dari proyek tematik industri",
];

export default function HeroSection() {
  return (
    <section className="rounded-[28px] border border-[#E5E7EB] bg-white px-6 py-12 shadow-sm md:px-10">
      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#D72323] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#D72323]" />
            IoT &amp; Robotika · Hybrid Learning
          </div>
          <h1 className="text-3xl font-bold leading-tight text-[#0F172A] md:text-4xl">
            Belajar IoT &amp; Robotika secara fokus, tanpa distraksi
          </h1>
          <p className="max-w-2xl text-sm text-[#374151]">
            Materi ringkas, sesi live, dan kit fisik yang langsung bisa dipakai. Bangun skill inti IoT &
            robotika dengan pendekatan praktik yang minimalis dan jelas.
          </p>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-[#D72323] px-5 py-2 text-xs font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]">
              Mulai belajar
            </button>
            <button className="rounded-full border border-[#0F172A] px-5 py-2 text-xs font-semibold text-[#0F172A] transition hover:border-[#D72323] hover:text-[#D72323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]">
              Lihat kit fisik
            </button>
          </div>

          <ul className="space-y-3 text-sm text-[#374151]">
            {featureList.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-sm">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#D72323]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm backdrop-blur">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D72323]/10 text-sm font-bold text-[#D72323]">
                RL
              </span>
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">Simulasi langsung</p>
                <p className="text-xs text-[#6B7280]">Sensor, aktuator, dan AI edge siap diuji</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A]">
              <p className="font-semibold">Build your first robot</p>
              <p className="text-xs text-[#6B7280]">Rangkai, program, dan jalankan dalam satu sesi.</p>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-[#0F172A]">
              <span className="rounded-full bg-[#D72323]/10 px-3 py-1 text-[#D72323]">IoT</span>
              <span className="rounded-full bg-[#E5E7EB] px-3 py-1">Robotik</span>
              <span className="rounded-full bg-[#E5E7EB] px-3 py-1">AI Edge</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
