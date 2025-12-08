import CategoryBar, { CategoryItem } from "./partials/categoryBar";
import EventsSection from "./partials/eventsSection";
import FloatingBadges from "./partials/floatingBadges";
import FooterSection from "./partials/footerSection";
import HeroSection from "./partials/heroSection";
import NavigationBar from "./partials/navigationBar";
import PackagesSection, { PackageItem } from "./partials/packagesSection";
import PromoBanner from "./partials/promoBanner";
import StepsSection from "./partials/stepsSection";
import TestimonialsSection from "./partials/testimonialsSection";

const categories: CategoryItem[] = [
  { label: "IoT & Robotika", icon: "IoT", active: true },
  { label: "Kit Pembelajaran", icon: "Kit" },
  { label: "Workshop & Training", icon: "WS" },
  { label: "Konsultasi Proyek", icon: "KP" },
  { label: "Pelatihan Guru", icon: "Guru" },
  { label: "Semua Produk", icon: "All" },
];

const packages: PackageItem[] = [
  {
    icon: "PF",
    badge: "Platform",
    badgeTone: "primary",
    title: "Platform Pembelajaran IoT & Robotika",
    description:
      "Video, simulasi IoT, live session, dan dashboard progres untuk guru & siswa.",
    features: ["Simulasi sensor & aktuator", "Latihan coding microcontroller", "Dashboard kelas"],
    priceNote: "Akses tahunan",
    price: "Mulai dari Rp 180.000/bln",
    discount: "Promo Tech Week",
    tag: "Digital",
    cta: "Coba gratis",
  },
  {
    icon: "KB",
    badge: "Kit Fisik",
    badgeTone: "dark",
    title: "Kit IoT & Robotika - Basic",
    description: "Starter kit dengan sensor dasar, microcontroller, dan modul konektivitas.",
    features: ["Panduan proyek pemula", "Pengiriman 1-3 hari", "Garansi komponen"],
    price: "Mulai dari Rp 1,2 juta",
    tag: "Kit Pembelajaran",
  },
  {
    icon: "KA",
    badge: "Kit Fisik",
    badgeTone: "primary",
    title: "Kit IoT & Robotika - Advanced",
    description: "Dukungan AI edge, kamera, dan modul komunikasi lanjutan untuk proyek serius.",
    features: ["Project lab AI edge", "Dokumentasi lengkap", "Sertifikat proyek"],
    price: "Mulai dari Rp 2,8 juta",
    tag: "Kit Pembelajaran",
  },
  {
    icon: "TP",
    badge: "Project",
    badgeTone: "dark",
    title: "Thematic Project Kit",
    description: "Paket proyek Smart Home, AgroTech, atau EcoCity untuk showcase sekolah.",
    features: ["Blueprint tematik", "Mentoring 2x sesi", "Demo day virtual"],
    tag: "Project-based",
  },
  {
    icon: "TR",
    badge: "Workshop",
    badgeTone: "primary",
    title: "Workshop & Pelatihan Praktis",
    description: "Sesi intensif tatap muka atau online dengan mentor robotika industri.",
    features: ["Kelas weekend", "Cohort kecil", "Toolkit dipinjamkan"],
    priceNote: "Batch Januari",
    tag: "Workshop",
    cta: "Lihat jadwal",
  },
  {
    icon: "KG",
    badge: "Guru",
    badgeTone: "dark",
    title: "Pelatihan Guru & Integrasi STEM",
    description: "Pendampingan kurikulum, bank soal, dan modul ajar robotika untuk sekolah.",
    features: ["Modul ajar siap pakai", "Sesi konsultasi", "Lisensi kelas"],
    tag: "Pelatihan Guru",
  },
  {
    icon: "KP",
    badge: "Konsultasi",
    badgeTone: "primary",
    title: "Konsultasi Proyek Pribadi",
    description: "Bimbingan membangun prototype robotika atau IoT sesuai targetmu.",
    features: ["Review desain & BOM", "Coaching mingguan", "Rencana uji coba"],
    tag: "Konsultasi",
    cta: "Atur sesi",
  },
  {
    icon: "ST",
    badge: "Support",
    badgeTone: "dark",
    title: "Konsultasi Kurikulum STEM",
    description: "Integrasi IoT/robotika ke kurikulum sekolah dengan asesmen dan reporting.",
    features: ["Audit kesiapan", "Desain kurikulum", "Laporan berkala"],
    tag: "STEM",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5EDED] text-[#000000]">
      <PromoBanner />
      <NavigationBar />
      <main className="mx-auto max-w-screen-xl space-y-10 px-4 pb-16 pt-6">
        <HeroSection />
        <CategoryBar items={categories} />
        <PackagesSection packages={packages} />
        <TestimonialsSection />
        <StepsSection />
        <EventsSection />
        <FooterSection />
      </main>
      <FloatingBadges />
    </div>
  );
}
