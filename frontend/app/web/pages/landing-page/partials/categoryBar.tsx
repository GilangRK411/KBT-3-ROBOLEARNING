export type CategoryItem = {
  label: string;
  icon: string;
  active?: boolean;
};

export default function CategoryBar({ items }: { items: CategoryItem[] }) {
  return (
    <section className="rounded-2xl border border-[#F5EDED] bg-white p-3 shadow-sm">
      <div className="flex gap-3 overflow-x-auto pb-1">
        {items.map((item) => {
          const isActive = item.active;

          return (
            <button
              key={item.label}
              className={`flex min-w-[180px] items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323] ${
                isActive
                  ? "border-[#D72323] bg-white text-[#000000] shadow-sm"
                  : "border-[#F5EDED] bg-[#F5EDED] text-[#3E3636] hover:border-[#D72323] hover:text-[#000000]"
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#D72323]">
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
