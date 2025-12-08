const footerLinks = {
  Tentang: ["Profil", "Tim", "Karier"],
  Produk: ["Platform", "Kit IoT & Robotika", "Workshop", "Konsultasi"],
  Kontak: ["support@robolearning.id", "(+62) 812-0000-0000", "Jakarta & Bandung"],
  Kebijakan: ["Syarat & Ketentuan", "Kebijakan Privasi", "FAQ"],
};

export default function FooterSection() {
  return (
    <footer className="mt-10 rounded-3xl border border-[#F5EDED] bg-white px-6 py-10 shadow-sm">
      <div className="grid gap-8 md:grid-cols-4">
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="space-y-3 text-sm">
            <p className="text-base font-semibold text-[#000000]">{title}</p>
            <div className="space-y-2">
              {links.map((link) => (
                <p key={link} className="text-[#3E3636]">
                  {link}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-2 border-t border-[#F5EDED] pt-4 text-sm text-[#3E3636] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D72323] text-sm font-bold text-white">
            RL
          </div>
          <p className="font-semibold text-[#000000]">Robolearning</p>
        </div>
        <p>© {new Date().getFullYear()} Robolearning. All rights reserved.</p>
      </div>
    </footer>
  );
}
