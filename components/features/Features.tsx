const features = [
  {
    number: "01",
    icon: "✦",
    title: "Uzmanlardan Öğren",
    description:
      "Alanında deneyimli eğitmenler tarafından hazırlanan güncel ve uygulama odaklı içeriklerle öğren.",
  },
  {
    number: "02",
    icon: "◈",
    title: "Kendi Hızında İlerle",
    description:
      "Derslerine istediğin zaman, istediğin cihazdan ulaş. Öğrenme sürecini tamamen kendin yönet.",
  },
  {
    number: "03",
    icon: "◇",
    title: "Sertifikanı Al",
    description:
      "Eğitimini başarıyla tamamladığında profesyonel sertifikanı al ve kariyerine değer kat.",
  },
  {
    number: "04",
    icon: "∞",
    title: "Sürekli Güncel İçerik",
    description:
      "Değişen sektör ihtiyaçlarına göre güncellenen içeriklerle güncel kal ve rakiplerinin önüne geç.",
  },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 lg:px-8">
      {/* Arka plan */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-yellow-500/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Başlık */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-yellow-500" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-500">
                Neden Helix?
              </span>
            </div>

            <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Sadece eğitim değil,
              <br />
              <span className="text-yellow-500">geleceğine yatırım.</span>
            </h2>
          </div>

          <p className="max-w-xl text-base leading-7 text-gray-500 lg:ml-auto">
            Helix Akademi, öğrenmek isteyen herkes için kaliteli eğitimi
            erişilebilir hale getirir. Amacımız sadece bilgi vermek değil,
            öğrendiklerini gerçek hayatta kullanabileceğin bir deneyim
            sunmak.
          </p>
        </div>

        {/* Özellikler */}
        <div className="mt-16 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="group relative border-b border-white/10 p-7 transition duration-300 hover:bg-white/[0.025] sm:border-r lg:border-b-0"
            >
              {/* Numara */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest text-gray-700">
                  {feature.number}
                </span>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-500/20 bg-yellow-500/5 text-xl text-yellow-400 transition duration-300 group-hover:border-yellow-500/40 group-hover:bg-yellow-500/10">
                  {feature.icon}
                </div>
              </div>

              {/* İçerik */}
              <h3 className="mt-10 text-lg font-bold text-white">
                {feature.title}
              </h3>

              <p className="mt-4 text-sm leading-6 text-gray-500">
                {feature.description}
              </p>

              {/* Hover çizgisi */}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-yellow-500 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* Alt CTA */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-yellow-500/5 to-transparent p-8 sm:p-10">
          <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-500">
                Hazır mısın?
              </div>

              <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                Öğrenmeye bugün başla.
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Kendine yapacağın en iyi yatırımlardan biri bilgiye yapılan
                yatırımdır.
              </p>
            </div>

            <a
              href="/kayit"
              className="shrink-0 rounded-xl bg-yellow-500 px-7 py-4 text-sm font-bold text-black transition hover:bg-yellow-400"
            >
              Hemen Başla →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}