import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Logo */}
          <div>
            <h2 className="text-3xl font-black text-white">
              HELIX <span className="text-yellow-500">AKADEMİ</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-500">
              Kariyerini ileri taşımak isteyen herkes için hazırlanmış
              profesyonel online eğitim platformu.
            </p>
          </div>

          {/* Menü */}
          <div>
            <h3 className="mb-5 font-bold text-white">Menü</h3>

            <div className="space-y-3">
              <Link href="/" className="block text-gray-500 hover:text-yellow-400">Ana Sayfa</Link>
              <Link href="/egitimler" className="block text-gray-500 hover:text-yellow-400">Eğitimler</Link>
              <Link href="/blog" className="block text-gray-500 hover:text-yellow-400">Blog</Link>
              <Link href="/iletisim" className="block text-gray-500 hover:text-yellow-400">İletişim</Link>
            </div>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="mb-5 font-bold text-white">Kurumsal</h3>

            <div className="space-y-3">
              <Link href="/hakkimizda" className="block text-gray-500 hover:text-yellow-400">Hakkımızda</Link>
              <Link href="/gizlilik" className="block text-gray-500 hover:text-yellow-400">Gizlilik Politikası</Link>
              <Link href="/kvkk" className="block text-gray-500 hover:text-yellow-400">KVKK</Link>
              <Link href="/kullanim" className="block text-gray-500 hover:text-yellow-400">Kullanım Şartları</Link>
            </div>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="mb-5 font-bold text-white">İletişim</h3>

            <div className="space-y-3 text-gray-500">
              <p>📞 +90 530 508 62 69</p>
              <p>📧 helix_akademi@gmail.com</p>
              <p>🌐 helixakademi.com</p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-gray-600">
          © 2026 Helix Akademi • Tüm Hakları Saklıdır.
        </div>
      </div>
    </footer>
  );
}