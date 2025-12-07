const navItems = ["Produk", "Offline Centers", "Program", "Promo", "Event", "Testimoni"];

export default function NavigationBar() {
  return (
    <div className="border-b border-[#F5EDED] bg-white">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D72323] text-sm font-bold text-white">
            RL
          </div>
          <span className="text-lg font-semibold text-[#3E3636]">RoboLearning</span>
        </div>

        <div className="hidden items-center gap-6 text-sm font-semibold text-[#3E3636] md:flex">
          {navItems.map((item) => (
            <button
              key={item}
              className="transition hover:text-[#D72323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]"
            >
              {item}git add README.md
            </button>
          ))}
        </div>

        <button className="rounded-full border border-[#D72323] px-4 py-2 text-xs font-semibold text-[#D72323] transition hover:bg-[#D72323] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]">
          Beli Paket Belajars
        </button>
      </div>
    </div>
  );
}
