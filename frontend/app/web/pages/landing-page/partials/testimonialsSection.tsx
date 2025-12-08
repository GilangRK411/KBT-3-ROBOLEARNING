type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "Materi digital dan kit fisik membuat siswa langsung praktik. Progress mudah dipantau.",
    name: "Fitri, Guru Fisika",
    role: "SMA Negeri • Kurikulum STEM",
  },
  {
    quote: "Kelas live robotika membantu saya menyiapkan prototipe untuk lomba. Mentor responsif.",
    name: "Danu, Siswa Kelas 12",
    role: "Tim robotika sekolah",
  },
];

const stats = [
  { label: "Members", value: "908K+" },
  { label: "Sekolah & Kampus", value: "200+" },
  { label: "Proyek terselesaikan", value: "3.2K" },
];

const logos = ["EduTechID", "SMK Industri 4.0", "STEM Lab", "Future School"];

export default function TestimonialsSection() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#D72323]">
            Testimoni &amp; Social Proof
          </p>
          <h2 className="text-2xl font-bold text-[#000000]">Dipercaya guru, siswa, dan mitra</h2>
          <p className="text-sm text-[#3E3636]">
            Pembelajaran robotika yang profesional dengan pendampingan mentor dan komunitas aktif.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[#F5EDED] bg-white px-4 py-3 text-center shadow-sm"
            >
              <p className="text-lg font-bold text-[#D72323]">{item.value}</p>
              <p className="text-xs font-semibold text-[#3E3636]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((item) => (
          <div
            key={item.name}
            className="flex h-full flex-col justify-between rounded-2xl border border-[#F5EDED] bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-[#3E3636]">“{item.quote}”</p>
            <div className="mt-4">
              <p className="text-sm font-semibold text-[#000000]">{item.name}</p>
              <p className="text-xs text-[#3E3636]">{item.role}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#F5EDED] bg-white px-4 py-3 shadow-sm">
        <p className="text-xs font-semibold text-[#3E3636]">Mitra &amp; kolaborator</p>
        <div className="flex flex-wrap gap-3 text-xs font-semibold text-[#000000]">
          {logos.map((logo) => (
            <span
              key={logo}
              className="rounded-full border border-[#F5EDED] bg-[#F5EDED] px-3 py-1 text-[#3E3636]"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
