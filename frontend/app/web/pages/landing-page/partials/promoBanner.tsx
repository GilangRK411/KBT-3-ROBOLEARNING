export default function PromoBanner() {
  return (
    <div className="bg-[#000000] text-white">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-3 px-4 py-3 text-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#D72323] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Diskon 52%
          </span>
          <span className="text-[#F5EDED]">
            Diskon ekstra sampai 200 ribu | E-wallet sampai 200 ribu
          </span>
        </div>
        <button className="w-full rounded-full bg-[#D72323] px-4 py-2 text-xs font-semibold text-white shadow md:w-auto">
          Klaim Sekarang
        </button>
      </div>
    </div>
  );
}
