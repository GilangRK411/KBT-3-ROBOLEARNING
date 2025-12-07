import CategoryBar, { CategoryItem } from "./partials/categoryBar";
import FloatingBadges from "./partials/floatingBadges";
import HeroSection from "./partials/heroSection";
import NavigationBar from "./partials/navigationBar";
import PackagesSection, { PackageItem } from "./partials/packagesSection";
import PromoBanner from "./partials/promoBanner";

const categories: CategoryItem[] = [
  { label: "Persiapan UTBK-SNBT", icon: "UTBK", active: true },
  { label: "Bimbel Tatap Muka", icon: "Tatap" },
  { label: "Bimbel Online", icon: "Online" },
  { label: "Video Belajar", icon: "Video" },
  { label: "English Academy", icon: "EN" },
  { label: "Semua Produk", icon: "All" },
];

const packages: PackageItem[] = [
  {
    badge: "SNBT 2025",
    badgeTone: "primary",
    title: "Video belajar dan latihan soal Tes Skolastik",
    description:
      "Kombinasi video, latihan soal, dan rangkuman materi untuk persiapan UTBK terbaru.",
    features: [
      "Masterclass UTBK + kit UTBK",
      "Latihan harian adaptif",
      "Tryout terjadwal",
    ],
    priceNote: "Mulai dari",
    price: "Rp 54.083/bulan",
    discount: "48% off",
    tag: "Ruangbelajar + UTBK",
  },
  {
    badge: "Fasilitas lengkap",
    badgeTone: "dark",
    title: "Kelas tatap muka + video belajar dan latihan soal",
    description:
      "Pengalaman hybrid dengan pendampingan mentor dan akses video belajar di mana saja.",
    features: [
      "Jadwal kelas fleksibel",
      "Sesi konsultasi mentor",
      "Bank soal lengkap",
    ],
    priceNote: "Early Bird 25/26",
    price: "Rp 280.000/bulan",
    discount: "48% off",
    tag: "Brain Academy Center",
  },
  {
    badge: "Live Teaching",
    badgeTone: "primary",
    title: "Live teaching interaktif + konsultasi PR",
    description:
      "Belajar langsung dengan tutor, tanya jawab real-time, dan tugas terarah.",
    features: [
      "Kelas live setiap pekan",
      "Rekaman bisa diulang",
      "Konsultasi PR cepat",
    ],
    priceNote: "Paket Tahun Ajaran 25/26",
    price: "Rp 515.000/bulan",
    discount: "35% off",
    tag: "Brain Academy Online",
  },
  {
    badge: "Standar internasional",
    badgeTone: "dark",
    title: "Kursus bahasa Inggris bersama pengajar asing",
    description:
      "Program speaking, grammar, dan writing dengan kurikulum global dan native coach.",
    features: [
      "Kelas kecil fokus",
      "Modul praktik mingguan",
      "Feedback personal",
    ],
    priceNote: "Premium Ranger",
    price: "Rp 2.240.000",
    discount: "20% off",
    tag: "English Academy Online",
  },
  {
    badge: "Tutor profesional",
    badgeTone: "primary",
    title: "Les privat eksklusif bersama pengajar terbaik",
    description:
      "Pendampingan privat yang disesuaikan dengan target belajar dan jadwalmu.",
    features: [
      "Rencana belajar khusus",
      "Pilihan jadwal fleksibel",
      "Progress report rutin",
    ],
    priceNote: "Mulai dari",
    price: "Rp 212.000",
    discount: "24% off",
    tag: "Ruanguru Privat",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5EDED] text-[#000000]">
      <PromoBanner />
      <NavigationBar />
      <main className="mx-auto max-w-screen-xl space-y-8 px-4 pb-16 pt-6">
        <HeroSection />
        <CategoryBar items={categories} />
        <PackagesSection packages={packages} />
      </main>
      <FloatingBadges />
    </div>
  );
}
