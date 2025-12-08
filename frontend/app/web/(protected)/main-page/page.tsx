import FloatingBadges from "./partials/floating-badges";
import FooterSection from "./partials/footer-section";
import HeroSection from "./partials/hero-section";
import NavigationBar from "./partials/navigation-bar";
import PackagesSection, { PackageItem } from "./partials/packages-section";
import PromoBanner from "./partials/promo-banner";

const packages: PackageItem[] = [
  {
    icon: "M1",
    badge: "Membership",
    badgeTone: "primary",
    title: "Langganan 1 Bulan",
    description: "Coba full akses kelas dan live session selama 30 hari.",
    features: [
      "Semua kelas IoT & robotika + rekaman",
      "Simulasi cloud lab & modul coding",
      "1x sesi mentor check-in dan review proyek",
    ],
    priceNote: "Paket fleksibel",
    price: "Rp 500.000 / bulan",
    tag: "Coba dulu",
    cta: "Mulai 1 Bulan",
  },
  {
    icon: "M3",
    badge: "Membership",
    badgeTone: "dark",
    title: "Langganan 3 Bulan",
    description: "Belajar konsisten dengan jalur terarah dan komunitas.",
    features: [
      "Semua kelas + live cohort & challenge",
      "Simulasi cloud lab & kit sharing",
      "4x mentor check-in + forum diskusi",
    ],
    priceNote: "Hemat 10%",
    price: "Rp 1.350.000 / 3 bulan",
    tag: "Paling diminati",
    cta: "Pilih 3 Bulan",
  },
  {
    icon: "M6",
    badge: "Membership",
    badgeTone: "primary",
    title: "Langganan 6 Bulan",
    description: "Roadmap lengkap dengan pendampingan intensif sampai finish.",
    features: [
      "Akses semua kelas & update materi baru",
      "Simulasi cloud lab + proyek tematik",
      "Coaching mingguan, career prep, prioritas support",
    ],
    priceNote: "Hemat 20%",
    price: "Rp 2.400.000 / 6 bulan",
    tag: "Serius upgrade",
    cta: "Ambil 6 Bulan",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5EDED] text-[#000000]">
      <PromoBanner />
      <NavigationBar />
      <main className="mx-auto max-w-screen-xl space-y-10 px-4 pb-16 pt-6">
        <HeroSection />
        <PackagesSection packages={packages} />
        <FooterSection />
      </main>
      <FloatingBadges />
    </div>
  );
}
