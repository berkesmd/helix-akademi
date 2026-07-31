export default function Stats() {
  const stats = [
    { value: "1000+", label: "Online Eğitim" },
    { value: "50.000+", label: "Aktif Öğrenci" },
    { value: "120+", label: "Uzman Eğitmen" },
    { value: "%98", label: "Memnuniyet" },
  ];

  return (
    <section className="bg-zinc-950 py-16">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-yellow-500/20 bg-black p-8 text-center"
          >
            <h2 className="text-5xl font-black text-yellow-500">
              {item.value}
            </h2>

            <p className="mt-3 text-gray-400">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}