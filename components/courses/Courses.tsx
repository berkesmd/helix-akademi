import Link from "next/link";

const courses = [
  {
    category: "KARİYER",
    title: "Kariyer ve Kişisel Gelişim",
    description:
      "Kariyerinde fark yaratmak, hedeflerini belirlemek ve profesyonel hayatında daha güçlü ilerlemek için kapsamlı eğitim.",
    lessons: "24 Ders",
    duration: "8 Saat",
    level: "Başlangıç",
    price: "499 TL",
    oldPrice: "799 TL",
    badge: "ÇOK SATAN",
    icon: "◆",
  },
  {
    category: "DİJİTAL",
    title: "Dijital Pazarlama Uzmanlığı",
    description:
      "Dijital pazarlama dünyasını öğren, markaları büyütmek için gereken güncel bilgi ve becerileri kazan.",
    lessons: "32 Ders",
    duration: "12 Saat",
    level: "Orta Seviye",
    price: "699 TL",
    oldPrice: "999 TL",
    badge: "POPÜLER",
    icon: "✦",
  },
  {
    category: "TEKNOLOJİ",
    title: "Yapay Zeka Eğitimi",
    description:
      "Yapay zekanın gücünü keşfet. Günlük işlerinden kariyerine kadar AI araçlarını etkili şekilde kullanmayı öğren.",
    lessons: "28 Ders",
    duration: "10 Saat",
    level: "Tüm Seviyeler",
    price: "599 TL",
    oldPrice: "899 TL",
    badge: "YENİ",
    icon: "✧",
  },
];

export default function Courses() {
  return (
    <section className="relative overflow-hidden bg-[#080808] px-6 py-24 lg:px-8">
      {/* Arka plan ışığı */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-yellow-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Başlık */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-yellow-500" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-500">
                Eğitimlerimiz
              </span>
            </div>

            <h2 className="max-w-2xl text-4xl font-black tracking-tight text-white sm:text-5xl">
              Geleceğin için
              <span className="text-yellow-500"> doğru eğitimi</span> seç.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-500">
              Uzmanlar tarafından hazırlanan, kariyerine doğrudan katkı
              sağlayacak eğitimleri keşfet.
            </p>
          </div>

          <Link
            href="/egitimler"
            className="group flex w-fit items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-yellow-500/40 hover:text-yellow-400"
          >
            Tüm Eğitimleri Gör
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Kurslar */}
        <div className="grid gap-6 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] transition duration-500 hover:-translate-y-2 hover:border-yellow-500/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            >
              {/* Üst görsel alan */}
              <div className="relative h-52 overflow-hidden bg-gradient-to-br from-yellow-500/20 via-[#111] to-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(234,179,8,0.18),transparent_40%)]" />

                <div className="absolute left-6 top-6 rounded-full border border-yellow-500/30 bg-black/60 px-3 py-1.5 text-[10px] font-bold tracking-wider text-yellow-400 backdrop-blur">
                  {course.badge}
                </div>

                <div className="absolute bottom-5 left-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-500/20 bg-yellow-500/10 text-3xl text-yellow-400 backdrop-blur">
                  {course.icon}
                </div>

                {/* Dekoratif çizgiler */}
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-yellow-500/10" />
                <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full border border-yellow-500/10" />
              </div>

              {/* İçerik */}
              <div className="p-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-yellow-500">
                  {course.category}
                </div>

                <h3 className="mt-3 text-xl font-bold leading-snug text-white">
                  {course.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                  {course.description}
                </p>

                {/* Bilgiler */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-white/[0.04] px-3 py-2 text-xs text-gray-400">
                    ◷ {course.duration}
                  </span>

                  <span className="rounded-lg bg-white/[0.04] px-3 py-2 text-xs text-gray-400">
                    ▣ {course.lessons}
                  </span>

                  <span className="rounded-lg bg-white/[0.04] px-3 py-2 text-xs text-gray-400">
                    ◈ {course.level}
                  </span>
                </div>

                {/* Alt */}
                <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-5">
                  <div>
                    <div className="text-xs text-gray-600 line-through">
                      {course.oldPrice}
                    </div>
                    <div className="mt-1 text-2xl font-black text-white">
                      {course.price}
                    </div>
                  </div>

                  <Link
                    href="/egitimler"
                    className="rounded-xl bg-yellow-500 px-5 py-3 text-xs font-bold text-black transition hover:bg-yellow-400"
                  >
                    İncele
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Alt güven mesajı */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#080808] bg-gradient-to-br from-yellow-300 to-yellow-700 text-[10px] font-bold text-black"
              >
                {item}
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            <span className="font-semibold text-white">50.000+</span>{" "}
            öğrenci Helix Akademi'yi tercih ediyor.
          </p>
        </div>
      </div>
    </section>
  );
}