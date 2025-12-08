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

export default function StepsSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 text-base font-semibold text-[#000000]">
        <span className="text-[#D72323]">*</span>
        <span>Cara Kerja Pembelajaran</span>
      </div>
      <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-5">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex h-full flex-col gap-2 rounded-2xl border border-[#F5EDED] bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D72323]/10 text-sm font-bold text-[#D72323]">
                {index + 1}
              </span>
              <p className="text-sm font-semibold text-[#000000]">{step.title}</p>
            </div>
            <p className="text-sm text-[#3E3636]">{step.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
