import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-black pt-28">
      {/* Arka plan ışıkları */}
      <div className="pointer-events-none absolute left-[-180px] top-[15%] h-[500px] w-[500px] rounded-full bg-yellow-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-150px] top-[10%] h-[600px] w-[600px] rounded-full bg-yellow-500/10 blur-[160px]" />

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 lg:grid-cols-2 lg:px-8 lg:pb-32">
        {/* Sol taraf */}
        <div>
          {/* Rozet */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/5 px-4 py-2">
            <span className="flex h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.9)]" />
            <span className="text-xs font-semibold tracking-wide text-yellow-400 sm:text-sm">
              Türkiye'nin Yeni Nesil Online Akademisi
            </span>
          </div>

          {/* Başlık */}
          <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Geleceğini
            <br />

            <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-500 bg-clip-text text-transparent">
              Helix Akademi
            </span>

            <br />
            ile inşa et.
          </h1>

          {/* Açıklama */}
          <p className="mt-7 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
            Kariyerine değer katacak eğitimlere ulaş, uzmanlardan öğren,
            kendini geliştir ve geleceğin için güçlü bir adım at.
          </p>

          {/* Butonlar */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/egitimler"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 text-sm font-bold text-black shadow-[0_0_35px_rgba(234,179,8,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-yellow-400 hover:shadow-[0_0_45px_rgba(234,179,8,0.3)]"
            >
              Eğitimleri Keşfet
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/kayit"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-7 py-4 text-sm font-semibold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-yellow-500/50 hover:bg-yellow-500/5 hover:text-yellow-400"
            >
              Ücretsiz Kayıt Ol
            </Link>
          </div>

          {/* Güven bilgileri */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-5 border-t border-white/10 pt-7">
            <div>
              <div className="text-2xl font-black text-white">1000+</div>
              <div className="mt-1 text-xs text-gray-500">
                Online Eğitim
              </div>
            </div>

            <div className="border-l border-white/10 pl-8">
              <div className="text-2xl font-black text-white">50.000+</div>
              <div className="mt-1 text-xs text-gray-500">
                Öğrenci
              </div>
            </div>

            <div className="border-l border-white/10 pl-8">
              <div className="text-2xl font-black text-yellow-400">%98</div>
              <div className="mt-1 text-xs text-gray-500">
                Memnuniyet
              </div>
            </div>
          </div>
        </div>

        {/* Sağ taraf */}
        <div className="relative hidden lg:block">
          <div className="relative mx-auto aspect-square max-w-[540px]">
            {/* Dış ışık */}
            <div className="absolute inset-10 rounded-full bg-yellow-500/10 blur-[90px]" />

            {/* Çerçeve */}
            <div className="absolute inset-6 rotate-3 rounded-[40px] border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 via-white/[0.02] to-transparent backdrop-blur-sm" />

            <div className="absolute inset-12 -rotate-3 rounded-[32px] border border-white/10 bg-[#0b0b0b] shadow-2xl">
              {/* Üst bar */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
                    HELIX AKADEMİ
                  </div>
                  <div className="mt-1 text-sm font-bold text-white">
                    Eğitim Paneli
                  </div>
                </div>

                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                </div>
              </div>

              {/* Panel içerik */}
              <div className="p-6">
                <div className="mb-5 rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/15 to-transparent p-5">
                  <div className="text-xs text-gray-400">
                    Öğrenmeye devam et
                  </div>

                  <div className="mt-2 text-xl font-bold text-white">
                    Kariyerini ileri taşı
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[72%] rounded-full bg-yellow-500" />
                  </div>

                  <div className="mt-2 flex justify-between text-[11px]">
                    <span className="text-gray-500">
                      Eğitim ilerlemesi
                    </span>
                    <span className="font-semibold text-yellow-400">
                      %72
                    </span>
                  </div>
                </div>

                {/* Kurslar */}
                <div className="space-y-3">
                  {[
                    ["Dijital Pazarlama", "12 Ders", "Başlangıç"],
                    ["Yapay Zeka Eğitimi", "24 Ders", "Orta Seviye"],
                    ["Kariyer Gelişimi", "18 Ders", "Uzman"],
                  ].map(([title, lessons, level], index) => (
                    <div
                      key={title}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-yellow-500/30"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10 text-lg text-yellow-400">
                        {index === 0 ? "◈" : index === 1 ? "✦" : "◆"}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-white">
                          {title}
                        </div>
                        <div className="mt-1 text-[11px] text-gray-500">
                          {lessons} • {level}
                        </div>
                      </div>

                      <span className="text-gray-600">→</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Yüzen kart - sertifika */}
            <div className="absolute -bottom-2 -left-6 w-52 rounded-2xl border border-yellow-500/20 bg-[#0c0c0c]/95 p-4 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10 text-lg text-yellow-400">
                  ✓
                </div>

                <div>
                  <div className="text-xs font-bold text-white">
                    Sertifikan Hazır
                  </div>
                  <div className="mt-1 text-[10px] text-gray-500">
                    Başarıyla tamamlandı
                  </div>
                </div>
              </div>
            </div>

            {/* Yüzen kart - öğrenci */}
            <div className="absolute -right-5 top-20 rounded-2xl border border-white/10 bg-[#0c0c0c]/95 px-5 py-4 shadow-2xl backdrop-blur-xl">
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                Aktif Öğrenci
              </div>

              <div className="mt-1 text-2xl font-black text-white">
                50K+
              </div>

              <div className="mt-1 text-xs text-yellow-400">
                Her gün büyüyoruz
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alt geçiş */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
    </section>
  );
}