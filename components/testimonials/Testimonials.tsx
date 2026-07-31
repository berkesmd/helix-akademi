const testimonials = [
  {
    name: "Ayşe Yılmaz",
    role: "Dijital Pazarlama Uzmanı",
    text: "Helix Akademi sayesinde dijital pazarlama alanında kendimi ciddi anlamda geliştirdim. Derslerin anlatımı çok anlaşılır ve sistem oldukça kullanışlı.",
    initials: "AY",
  },
  {
    name: "Mehmet Kaya",
    role: "Yazılım Geliştirici",
    text: "İçeriklerin güncel olması ve dersleri kendi hızımda takip edebilmem benim için en büyük avantaj oldu. Kesinlikle tavsiye ederim.",
    initials: "MK",
  },
  {
    name: "Zeynep Demir",
    role: "Girişimci",
    text: "Kariyerim için kendime yapabileceğim en iyi yatırımlardan biri oldu. Eğitimleri tamamladıktan sonra sertifikamı da kolayca aldım.",
    initials: "ZD",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#080808] px-6 py-24 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/5 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Başlık */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-yellow-500" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-500">
              Öğrencilerimiz
            </span>
            <span className="h-px w-8 bg-yellow-500" />
          </div>

          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Öğrencilerimiz
            <br />
            <span className="text-yellow-500">ne diyor?</span>
          </h2>

          <p className="mt-5 text-gray-500">
            Helix Akademi ile öğrenme yolculuğuna çıkan öğrencilerimizin
            deneyimleri.
          </p>
        </div>

        {/* Yorumlar */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group relative rounded-3xl border border-white/10 bg-black p-7 transition duration-300 hover:-translate-y-1 hover:border-yellow-500/30"
            >
              {/* Yıldızlar */}
              <div className="flex gap-1 text-sm text-yellow-400">
                ★ ★ ★ ★ ★
              </div>

              <p className="mt-6 min-h-[120px] text-sm leading-7 text-gray-400">
                "{testimonial.text}"
              </p>

              <div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-500 text-xs font-black text-black">
                  {testimonial.initials}
                </div>

                <div>
                  <div className="text-sm font-bold text-white">
                    {testimonial.name}
                  </div>

                  <div className="mt-1 text-xs text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Güven istatistikleri */}
        <div className="mt-16 grid overflow-hidden rounded-3xl border border-white/10 bg-black sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["50.000+", "Mutlu Öğrenci"],
            ["1.000+", "Online Eğitim"],
            ["98%", "Öğrenci Memnuniyeti"],
            ["7/24", "Eğitim Erişimi"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="border-b border-white/10 p-7 text-center last:border-b-0 sm:border-r lg:border-b-0"
            >
              <div className="text-3xl font-black text-yellow-400">
                {number}
              </div>

              <div className="mt-2 text-xs uppercase tracking-wider text-gray-600">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}