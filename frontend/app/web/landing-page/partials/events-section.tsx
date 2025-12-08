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
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 text-base font-semibold text-[#000000]">
        <span className="text-[#D72323]">*</span>
        <span>Event &amp; Program</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {events.map((event) => (
          <div
            key={event.title}
            className="flex h-full flex-col gap-3 rounded-2xl border border-[#F5EDED] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#D72323]/10 px-3 py-1 text-[11px] font-semibold text-[#D72323]">
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
    </section>
  );
}
