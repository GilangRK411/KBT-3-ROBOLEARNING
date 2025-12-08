const badges = [
  { title: "+908K members", note: "Komunitas pembelajar IoT & robotika" },
  { title: "Mitra sekolah", note: "200+ sekolah & kampus berkolaborasi" },
];

export default function FloatingBadges() {
  return (
    <div className="pointer-events-none fixed right-6 top-1/3 hidden flex-col gap-3 lg:flex">
      {badges.map((badge) => (
        <div
          key={badge.title}
          className="pointer-events-auto rounded-2xl border border-[#F5EDED] bg-white px-4 py-3 text-xs shadow-md"
        >
          <p className="font-semibold text-[#000000]">{badge.title}</p>
          <p className="text-[#3E3636]">{badge.note}</p>
        </div>
      ))}
    </div>
  );
}
