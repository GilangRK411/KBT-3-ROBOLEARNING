type EventItem = {
  title: string;
  type: string;
  date: string;
  detail: string;
  cta: string;
};

const events: EventItem[] = [
  {
    title: "Webinar Gratis: IoT untuk Pemula",
    type: "Webinar",
    date: "Setiap Kamis",
    detail: "Live demo sensor + cloud, cocok untuk guru dan siswa.",
    cta: "Daftar webinar",
  },
  {
    title: "Workshop Intensif Robotika",
    type: "Workshop",
    date: "Batch Januari",
    detail: "Bangun robot line follower dan obstacle avoidance bersama mentor.",
    cta: "Amankan slot",
  },
  {
    title: "Tantangan Proyek IoT",
    type: "Challenge",
    date: "Deadline 28 Des",
    detail: "Kirim proyek smart home atau agritech. Menangkan kit advanced.",
    cta: "Ikuti tantangan",
  },
  {
    title: "Kompetisi Robotika Sekolah",
    type: "Competition",
    date: "Q1 2026",
    detail: "Kategori pemula hingga advanced dengan penjurian industri.",
    cta: "Lihat rulebook",
  },
];

export default function EventsSection() {
  const [highlight, ...rest] = events;

  return (
    <section className="rounded-[28px] border border-[#F5EDED] bg-white px-6 py-8 shadow-sm space-y-8">
      <div className="flex items-center gap-2 text-base font-semibold text-[#000000]">
        <span className="text-[#D72323]">*</span>
        <span>Event &amp; Program</span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden rounded-3xl border border-[#F5EDED] bg-gradient-to-br from-[#F5EDED] via-white to-[#D72323]/10 p-6 shadow">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <span className="rounded-full bg-[#D72323]/10 px-3 py-1 text-[11px] font-semibold text-[#D72323]">
                {highlight.type}
              </span>
              <p className="text-2xl font-bold text-[#000000]">{highlight.title}</p>
              <p className="text-sm text-[#3E3636]">{highlight.detail}</p>
              <p className="text-[12px] font-semibold text-[#3E3636]">Jadwal: {highlight.date}</p>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#3E3636] shadow-sm">
              Terbuka untuk umum
            </span>
          </div>
          <img
            src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=60"
            alt="Dummy event visual"
            className="mt-4 h-48 w-full rounded-2xl object-cover"
            loading="lazy"
          />
          <button className="mt-5 rounded-full bg-[#D72323] px-4 py-2 text-xs font-semibold text-white shadow transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]">
            {highlight.cta}
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {rest.map((event) => (
            <div
              key={event.title}
              className="flex h-full flex-col gap-3 rounded-2xl border border-[#F5EDED] bg-[#F5EDED]/70 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#D72323] shadow-sm">
                  {event.type}
                </span>
                <span className="text-[11px] font-semibold text-[#3E3636]">{event.date}</span>
              </div>
              <p className="text-base font-semibold text-[#000000]">{event.title}</p>
              <p className="text-sm text-[#3E3636]">{event.detail}</p>
              <button className="mt-auto self-start rounded-full border border-[#D72323] px-3 py-2 text-xs font-semibold text-[#D72323] transition hover:bg-[#D72323] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]">
                {event.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
