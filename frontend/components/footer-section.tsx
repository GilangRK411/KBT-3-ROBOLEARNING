const footerLinks = {
  Tentang: ["Profil", "Tim", "Karier"],
  Produk: ["Platform", "Kit IoT & Robotika", "Workshop", "Konsultasi"],
  Kontak: ["support@robolearning.id", "(+62) 812-0000-0000", "Jakarta & Bandung"],
  Kebijakan: ["Syarat & Ketentuan", "Kebijakan Privasi", "FAQ"],
};

export default function FooterSection() {
  return (
    <footer className="mt-10 border-t border-gray-200 bg-white px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-4">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">{title}</p>
              <div className="space-y-1">
                {links.map((link) => (
                  <p key={link} className="text-xs text-gray-600">
                    {link}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-gray-200 pt-4">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Robolearning. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}