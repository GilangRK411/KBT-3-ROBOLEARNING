export type PackageItem = {
  icon: string;
  badge: string;
  badgeTone: "primary" | "dark";
  title: string;
  description: string;
  features: string[];
  price?: string;
  priceNote?: string;
  discount?: string;
  tag?: string;
  cta?: string;
};

const badgeToneClass: Record<PackageItem["badgeTone"], string> = {
  primary: "bg-[#D72323]/10 text-[#D72323]",
  dark: "bg-[#3E3636]/10 text-[#3E3636]",
};

export default function PackagesSection({ packages }: { packages: PackageItem[] }) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-base font-semibold text-[#000000]">
          <span className="text-[#D72323]">*</span>
          <span>Produk &amp; Jasa Robolearning</span>
          <button className="rounded-full border border-[#F5EDED] bg-white px-3 py-1 text-xs font-semibold text-[#3E3636] transition hover:border-[#D72323] hover:text-[#D72323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]">
            IoT &amp; Robotika
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#3E3636]">
          <span className="h-2 w-2 rounded-full bg-[#D72323]" />
          <span>Fokus materi digital + kit fisik</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {packages.map((item) => (
          <PackageCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}

function PackageCard({ item }: { item: PackageItem }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#F5EDED] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5EDED] text-sm font-bold text-[#D72323]">
            {item.icon}
          </span>
          <div>
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold ${badgeToneClass[item.badgeTone]}`}
            >
              {item.badge}
            </span>
            <p className="mt-1 text-xs font-semibold text-[#3E3636]">{item.tag}</p>
          </div>
        </div>
        {item.discount ? (
          <span className="text-[11px] font-semibold text-[#D72323]">{item.discount}</span>
        ) : null}
      </div>

      <h3 className="mt-2 text-base font-semibold text-[#000000]">{item.title}</h3>
      <p className="mt-2 text-sm text-[#3E3636]">{item.description}</p>

      <ul className="mt-3 space-y-1 text-sm text-[#3E3636]">
        {item.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#D72323]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-end justify-between pt-4">
        <div>
          {item.priceNote ? <p className="text-xs text-[#3E3636]">{item.priceNote}</p> : null}
          {item.price ? (
            <p className="text-lg font-bold text-[#D72323]">{item.price}</p>
          ) : null}
        </div>
        <button className="rounded-full border border-[#D72323] px-3 py-2 text-xs font-semibold text-[#D72323] transition hover:bg-[#D72323] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D72323]">
          {item.cta ?? "Lihat Detail"}
        </button>
      </div>
    </div>
  );
}
