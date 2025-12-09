type Step = {
  title: string;
  detail: string;
};

const steps: Step[] = [
  { title: "Akses materi digital", detail: "Video, simulasi IoT, dan modul coding siap dipakai." },
  { title: "Pengiriman kit", detail: "Kit IoT/robotika dikirim ke alamatmu dengan panduan." },
  { title: "Praktik project-based", detail: "Bangun proyek tematik: smart home, agritech, atau AI edge." },
  { title: "Upload hasil", detail: "Kirim dokumentasi proyek untuk dinilai mentor." },
  { title: "Sertifikat", detail: "Dapatkan sertifikat dan rekomendasi proyek." },
];

const rhythm = [
  "Blend belajar mandiri + live cohort tiap minggu.",
  "Review tugas + feedback video/teks dari mentor.",
  "Forum diskusi yang ringan, fokus ke troubleshooting.",
];

const visuals = [
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
];

export default function StepsSection() {
  return (
    <section className="rounded-[28px] border border-[#F5EDED] bg-white px-6 py-10 shadow-sm space-y-8 sm:px-8">
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#D72323]">Cara Kerja Pembelajaran</p>
        <h2 className="text-2xl font-bold text-[#000000]">Workflow hybrid yang rapi seperti storyboard</h2>
        <p className="text-sm text-[#3E3636]">
          Dari onboarding, kirim kit, sampai upload hasil akhir. Setiap langkah diberi visual supaya mudah dipahami.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden rounded-[24px] border border-[#F5EDED] bg-[#F5EDED]/70 shadow-sm">
          <img
            src={visuals[0]}
            alt="Cuplikan kelas"
            className="h-full max-h-[360px] w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0" />
          <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#3E3636] shadow">
            Hybrid kit + digital
          </div>
          <div className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#D72323] shadow">
            Mentor-led
          </div>
          <div className="absolute left-5 bottom-5 flex flex-col gap-3">
            <div className="rounded-2xl bg-white/90 px-4 py-3 shadow-sm">
              <p className="text-xs font-semibold text-[#D72323]">Ritme mingguan</p>
              <p className="text-sm text-[#3E3636]">Live cohort, tugas pendek, review terjadwal.</p>
            </div>
            <div className="rounded-2xl bg-white/90 px-4 py-3 shadow-sm">
              <p className="text-xs font-semibold text-[#3E3636]">Forum & support</p>
              <p className="text-sm text-[#3E3636]">Diskusi ringan dan troubleshooting cepat.</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-[#F5EDED] bg-[#F5EDED]/70 p-4 shadow-sm">
            <p className="text-sm font-semibold text-[#000000]">Ritme mingguan</p>
            <p className="text-sm text-[#3E3636]">
              Sesi live, tugas, dan review dibuat blok pendek supaya kamu mudah menyelesaikan setiap tahap.
            </p>
            <div className="mt-3 space-y-2">
              {rhythm.map((item) => (
                <div key={item} className="flex items-start gap-2 text-[12px] text-[#3E3636]">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-[#D72323]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <ol className="relative space-y-4">
            <span className="absolute left-5 top-4 bottom-6 w-px bg-[#F5EDED]" />
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="relative grid gap-2 bg-white p-4 pl-14"
              >
                <span className="absolute left-1 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#D72323]/10 text-sm font-bold text-[#D72323]">
                  {index + 1}
                </span>
                <p className="text-sm font-semibold text-[#000000]">{step.title}</p>
                <p className="text-sm text-[#3E3636]">{step.detail}</p>
              </li>
            ))}
          </ol>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-[#D72323] px-5 py-2 text-xs font-semibold text-white shadow transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]">
              Mulai roadmap
            </button>
            <button className="rounded-full border border-[#3E3636] px-5 py-2 text-xs font-semibold text-[#3E3636] transition hover:border-[#D72323] hover:text-[#D72323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]">
              Lihat contoh project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
