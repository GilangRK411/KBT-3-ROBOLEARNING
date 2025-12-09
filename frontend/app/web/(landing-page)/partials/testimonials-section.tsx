import { useMemo, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  image: string;
  cta?: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "Materi digital dan kit fisik membuat siswa langsung praktik. Progress mudah dipantau.",
    name: "Fitri, Guru Fisika",
    role: "SMA Negeri - Kurikulum STEM",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=60",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
    cta: "Tonton video story",
  },
  {
    quote: "Kelas live robotika membantu saya menyiapkan prototipe untuk lomba. Mentor responsif.",
    name: "Danu, Siswa Kelas 12",
    role: "Tim robotika sekolah",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=60",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1400&q=80",
    cta: "Lihat demo proyek",
  },
  {
    quote: "Cocok untuk program kampus. Tugasnya modular, jadi mahasiswa bisa fokus ke demo mingguan.",
    name: "Nabila, Dosen Informatika",
    role: "Komunitas riset IoT kampus",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=60",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
    cta: "Baca studi kasus",
  },
];

const stats = [
  { label: "Rating rata-rata", value: "4.8/5" },
  { label: "Selesai challenge", value: "92%" },
  { label: "NPS community", value: "78" },
];

const logos = ["EduTechID", "SMK Industri 4.0", "STEM Lab", "Future School"];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const active = useMemo(() => testimonials[index] ?? testimonials[0], [index]);

  const handleNext = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="rounded-[28px] border border-[#F5EDED] bg-white px-6 py-8 shadow-sm space-y-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#D72323]">Testimoni &amp; Social Proof</p>
          <h2 className="text-2xl font-bold text-[#000000]">Dipercaya guru, siswa, kampus, dan mitra</h2>
          <p className="text-sm text-[#3E3636]">
            Format hybrid ala Dicoding: kombinasi video ringkas, live cohort, forum, dan review proyek yang konsisten.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[#F5EDED] bg-[#F5EDED]/70 px-4 py-3 text-center shadow-sm"
            >
              <p className="text-lg font-bold text-[#D72323]">{item.value}</p>
              <p className="text-xs font-semibold text-[#3E3636]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden rounded-3xl border border-[#F5EDED] bg-gradient-to-br from-[#F5EDED] via-white to-[#D72323]/10 p-6 shadow">
          <div className="absolute right-6 top-6 grid gap-2 text-right text-[11px] font-semibold text-[#D72323]">
            <span className="rounded-full bg-white/90 px-3 py-1 shadow-sm">Community-first</span>
            <span className="rounded-full bg-white/90 px-3 py-1 shadow-sm">Mentor-led</span>
          </div>
          <div className="space-y-3">
            <p className="text-lg font-bold text-[#000000]">{`"${active.quote}"`}</p>
            <div>
              <p className="text-sm font-semibold text-[#000000]">{active.name}</p>
              <p className="text-xs text-[#3E3636]">{active.role}</p>
            </div>
            <hr className="border-[#F5EDED]" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={active.avatar}
                  alt={active.name}
                  className="h-10 w-10 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="text-[12px] text-[#3E3636]">
                  <p>Story siswa</p>
                  <p className="font-semibold text-[#000000]">RoboLearning</p>
                </div>
              </div>
              {active.cta && (
                <button className="inline-flex items-center gap-2 rounded-full bg-[#D72323] px-4 py-2 text-[11px] font-semibold text-white shadow transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]">
                  {active.cta} {"->"}
                </button>
              )}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="h-10 w-10 rounded-full border border-[#F5EDED] bg-white text-lg font-bold text-[#3E3636] shadow-sm transition hover:border-[#D72323] hover:text-[#D72323]"
                aria-label="Sebelumnya"
              >
                {"<"}
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="h-10 w-10 rounded-full border border-[#F5EDED] bg-white text-lg font-bold text-[#3E3636] shadow-sm transition hover:border-[#D72323] hover:text-[#D72323]"
                aria-label="Berikutnya"
              >
                {">"}
              </button>
            </div>
            <div className="flex items-center gap-2 pt-1">
              {testimonials.map((_, dotIndex) => (
                <span
                  key={dotIndex}
                  className={`h-2 w-2 rounded-full transition-colors ${dotIndex === index ? "bg-[#D72323]" : "bg-[#F5EDED]"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-[#F5EDED] bg-[#F5EDED]/70 shadow">
          <img
            src={active.image}
            alt={active.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/30 via-transparent to-transparent" />
          <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#3E3636] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#D72323] animate-pulse" />
            Cuplikan dummy
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#F5EDED] bg-[#F5EDED]/70 px-4 py-3 shadow-sm">
        <p className="text-xs font-semibold text-[#3E3636]">Mitra &amp; kolaborator</p>
        <div className="flex flex-wrap gap-3 text-xs font-semibold text-[#000000]">
          {logos.map((logo) => (
            <span
              key={logo}
              className="rounded-full border border-[#F5EDED] bg-white px-3 py-1 text-[#3E3636] shadow-sm"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}