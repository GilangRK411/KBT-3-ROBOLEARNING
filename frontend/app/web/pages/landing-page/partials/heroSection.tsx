const highlightPoints = [
  { title: "IoT & Robotik", detail: "Simulasi, coding, dan kontrol perangkat nyata" },
  { title: "Hybrid Kit + Digital", detail: "Modul interaktif dengan kit fisik siap pakai" },
  { title: "Project-based", detail: "Bangun portfolio dari proyek tematik industri" },
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
            IoT &amp; Robotika | Hybrid Learning
          </div>
          <h1 className="text-3xl font-bold leading-tight text-[#000000] md:text-4xl">
            Belajar IoT &amp; Robotika, rakit kit fisik, dan kuasai AI edge device
          </h1>
          <p className="max-w-2xl text-sm text-[#3E3636]">
            Kombinasi materi digital interaktif, sesi live, dan kit fisik yang dikirim ke rumah.
            Cocok untuk siswa, guru, hingga profesional yang ingin membangun proyek robotik nyata.
          </p>

          <div className="flex max-w-xl flex-col gap-3">
            <div className="flex flex-col gap-3 rounded-2xl border border-[#F5EDED] bg-white px-3 py-3 shadow-md sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#3E3636]">
                <span className="rounded-full bg-[#F5EDED] px-3 py-1">Email</span>
                <input
                  type="email"
                  placeholder="nama@email.com"
                  className="w-full border-none bg-transparent text-sm text-[#000000] outline-none placeholder:text-[#3E3636]"
                  aria-label="Email"
                />
              </div>
              <button className="rounded-full bg-[#D72323] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]">
                Dapatkan Akses
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-full bg-[#D72323] px-5 py-2 text-xs font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]">
                Pelajari Sekarang
              </button>
              <button className="rounded-full border border-[#3E3636] px-5 py-2 text-xs font-semibold text-[#3E3636] transition hover:border-[#D72323] hover:text-[#D72323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]">
                Lihat Kit Fisik
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
          <div className="relative overflow-hidden rounded-3xl border border-[#F5EDED] bg-gradient-to-br from-[#F5EDED] via-white to-[#D72323]/10 p-5 shadow">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #D72323 0, transparent 25%), radial-gradient(circle at 80% 0%, #3E3636 0, transparent 25%)" }} />
            <div className="relative flex h-full flex-col justify-between gap-3">
              <div className="inline-flex w-fit rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold text-[#D72323]">
                Ilustrasi Robotika
              </div>
              <p className="text-lg font-bold text-[#000000]">
                Rakit robot, program sensor, dan uji AI edge device
              </p>
              <p className="text-sm text-[#3E3636]">
                Visual mockup siswa sedang merakit robot dan antarmuka AI futuristik.
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-[#3E3636]">
                <span className="rounded-full bg-white px-3 py-1 text-[#D72323]">Arms</span>
                <span className="rounded-full bg-white px-3 py-1 text-[#D72323]">Sensor</span>
                <span className="rounded-full bg-white px-3 py-1 text-[#D72323]">AI Edge</span>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-[#F5EDED] bg-[#F5EDED]/80 p-5 shadow">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#3E3636]">Kesiapan proyekmu</p>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#D72323]">
                82/100
              </span>
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-white">
              <div className="h-2 w-[82%] rounded-full bg-[#D72323]" />
            </div>
            <p className="mt-3 text-xs text-[#3E3636]">
              Rekomendasi kit dan modul akan disesuaikan dengan target proyek IoT/robotika-mu.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-[#F5EDED] bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-[#000000]">Jalur belajar</p>
              <div className="mt-3 space-y-2 text-xs text-[#3E3636]">
                <div className="flex items-center justify-between rounded-xl bg-[#F5EDED] px-3 py-2">
                  <span>Video &amp; simulasi</span>
                  <span className="font-semibold text-[#D72323]">On-demand</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#F5EDED] px-3 py-2">
                  <span>Live building session</span>
                  <span className="font-semibold text-[#D72323]">Jadwal mingguan</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#F5EDED] px-3 py-2">
                  <span>Pengiriman kit</span>
                  <span className="font-semibold text-[#D72323]">1-3 hari</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-[#F5EDED] bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#000000]">Rekomendasi cepat</p>
                <span className="rounded-full bg-[#D72323]/10 px-2 py-1 text-[10px] font-semibold text-[#D72323]">
                  IoT
                </span>
              </div>
              <div className="space-y-2 text-xs text-[#3E3636]">
                <div className="flex items-center justify-between">
                  <span>Kit Smart Home</span>
                  <span className="font-semibold text-[#D72323]">Ready stock</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Workshop weekend</span>
                  <span className="font-semibold text-[#D72323]">Slot terbatas</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Konsultasi kurikulum STEM</span>
                  <span className="font-semibold text-[#D72323]">Buka jadwal</span>
                </div>
              </div>
              <button className="mt-auto self-start rounded-full bg-[#D72323] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]">
                Lihat jadwal sesi
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
