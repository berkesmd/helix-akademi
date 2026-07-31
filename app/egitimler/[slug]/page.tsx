import Link from "next/link";
import { notFound } from "next/navigation";
import { egitimler } from "@/data/egitimler";

type EgitimDetayPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return egitimler.map((egitim) => ({
    slug: egitim.slug,
  }));
}

export default async function EgitimDetayPage({
  params,
}: EgitimDetayPageProps) {
  const { slug } = await params;

  const egitim = egitimler.find((item) => item.slug === slug);

  if (!egitim) {
    notFound();
  }

  const whatsappMesaji = encodeURIComponent(
    `Merhaba, ${egitim.title} eğitimi hakkında bilgi almak istiyorum.`
  );

  const whatsappLink = `https://wa.me/905305086269?text=${whatsappMesaji}`;

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#070707",
        color: "#ffffff",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <header
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          backgroundColor: "#090909",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            minHeight: "78px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <Link
            href="/"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "22px",
              fontWeight: 900,
              letterSpacing: "1px",
            }}
          >
            HELIX <span style={{ color: "#f3c64d" }}>AKADEMİ</span>
          </Link>

          <Link
            href="/egitimler"
            style={{
              color: "#f3c64d",
              textDecoration: "none",
              fontWeight: 700,
              border: "1px solid rgba(243,198,77,0.4)",
              borderRadius: "12px",
              padding: "12px 18px",
            }}
          >
            Tüm Eğitimler
          </Link>
        </div>
      </header>

      <section
        style={{
          padding: "85px 24px",
          background:
            "radial-gradient(circle at top left, rgba(243,198,77,0.18), transparent 45%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.5fr) minmax(300px, 0.7fr)",
            gap: "45px",
            alignItems: "center",
          }}
        >
          <div>
            <Link
              href="/egitimler"
              style={{
                color: "#8d8d8d",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              ← Eğitimlere geri dön
            </Link>

            <div
              style={{
                marginTop: "35px",
                display: "inline-block",
                color: "#f3c64d",
                backgroundColor: "rgba(243,198,77,0.08)",
                border: "1px solid rgba(243,198,77,0.3)",
                borderRadius: "999px",
                padding: "9px 14px",
                fontSize: "12px",
                fontWeight: 800,
              }}
            >
              {egitim.category}
            </div>

            <h1
              style={{
                margin: "22px 0",
                maxWidth: "850px",
                fontSize: "clamp(38px, 6vw, 68px)",
                lineHeight: 1.08,
                letterSpacing: "-2px",
              }}
            >
              {egitim.title}
            </h1>

            <p
              style={{
                maxWidth: "760px",
                margin: 0,
                color: "#a0a0a0",
                fontSize: "18px",
                lineHeight: 1.8,
              }}
            >
              Alanında uzmanlaşmak, mesleki gelişiminizi desteklemek ve
              sertifika sahibi olmak için hazırlanan kapsamlı eğitim programı.
            </p>

            <div
              style={{
                marginTop: "35px",
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#080808",
                  backgroundColor: "#f3c64d",
                  textDecoration: "none",
                  borderRadius: "14px",
                  padding: "16px 24px",
                  fontWeight: 900,
                }}
              >
                Hemen Başvur
              </a>

              <a
                href="tel:+905305086269"
                style={{
                  color: "#ffffff",
                  backgroundColor: "#151515",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "14px",
                  padding: "16px 24px",
                  fontWeight: 800,
                }}
              >
                0530 508 62 69
              </a>
            </div>
          </div>

          <aside
            style={{
              background:
                "linear-gradient(145deg, rgba(31,31,31,0.98), rgba(12,12,12,0.98))",
              border: "1px solid rgba(243,198,77,0.25)",
              borderRadius: "28px",
              padding: "30px",
              boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#777777",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "2px",
              }}
            >
              EĞİTİM ÜCRETİ
            </p>

            <div
              style={{
                marginTop: "10px",
                color: "#f3c64d",
                fontSize: "42px",
                fontWeight: 900,
              }}
            >
              5.000 TL
            </div>

            <div
              style={{
                marginTop: "28px",
                display: "grid",
                gap: "14px",
              }}
            >
              {[
                "Online eğitim erişimi",
                "Eğitim danışmanı desteği",
                "Sertifika imkânı",
                "Esnek çalışma programı",
                "Profesyonel eğitim içeriği",
              ].map((ozellik) => (
                <div
                  key={ozellik}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "11px",
                    color: "#cfcfcf",
                    fontSize: "15px",
                  }}
                >
                  <span
                    style={{
                      width: "25px",
                      height: "25px",
                      flexShrink: 0,
                      display: "grid",
                      placeItems: "center",
                      color: "#080808",
                      backgroundColor: "#f3c64d",
                      borderRadius: "50%",
                      fontSize: "13px",
                      fontWeight: 900,
                    }}
                  >
                    ✓
                  </span>

                  {ozellik}
                </div>
              ))}
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "100%",
                boxSizing: "border-box",
                display: "block",
                marginTop: "30px",
                color: "#080808",
                backgroundColor: "#f3c64d",
                textAlign: "center",
                textDecoration: "none",
                borderRadius: "14px",
                padding: "17px",
                fontWeight: 900,
              }}
            >
              WhatsApp ile Başvur
            </a>
          </aside>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "75px 24px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) minmax(280px, 0.6fr)",
            gap: "50px",
          }}
        >
          <div>
            <div style={{ marginBottom: "55px" }}>
              <p
                style={{
                  margin: 0,
                  color: "#f3c64d",
                  fontSize: "12px",
                  fontWeight: 900,
                  letterSpacing: "3px",
                }}
              >
                EĞİTİM HAKKINDA
              </p>

              <h2
                style={{
                  margin: "15px 0 20px",
                  fontSize: "35px",
                }}
              >
                Eğitim programının amacı
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#9a9a9a",
                  fontSize: "17px",
                  lineHeight: 1.9,
                }}
              >
                {egitim.title} eğitimi, katılımcıların ilgili alandaki bilgi ve
                becerilerini geliştirmeleri amacıyla hazırlanmıştır. Eğitim
                süresince temel bilgilerden uygulamalı konulara kadar kapsamlı
                içerikler sunulur.
              </p>

              <p
                style={{
                  margin: "18px 0 0",
                  color: "#9a9a9a",
                  fontSize: "17px",
                  lineHeight: 1.9,
                }}
              >
                Program, mevcut mesleğinde kendisini geliştirmek isteyenler,
                yeni bir alanda uzmanlaşmayı hedefleyenler ve öz geçmişini
                güçlendirmek isteyen katılımcılar için uygundur.
              </p>
            </div>

            <div style={{ marginBottom: "55px" }}>
              <p
                style={{
                  margin: 0,
                  color: "#f3c64d",
                  fontSize: "12px",
                  fontWeight: 900,
                  letterSpacing: "3px",
                }}
              >
                KİMLER KATILABİLİR?
              </p>

              <h2
                style={{
                  margin: "15px 0 25px",
                  fontSize: "35px",
                }}
              >
                Bu eğitim kimler için uygun?
              </h2>

              <div
                style={{
                  display: "grid",
                  gap: "15px",
                }}
              >
                {[
                  "Mesleki bilgi ve becerilerini geliştirmek isteyenler",
                  "Yeni bir uzmanlık alanı kazanmak isteyenler",
                  "Öz geçmişine sertifika eklemek isteyenler",
                  "Kariyerine yeni bir yön vermeyi hedefleyenler",
                  "Kişisel gelişimine yatırım yapmak isteyenler",
                ].map((madde) => (
                  <div
                    key={madde}
                    style={{
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                      padding: "18px",
                      backgroundColor: "#111111",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "15px",
                      color: "#c7c7c7",
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: "#f3c64d", fontWeight: 900 }}>
                      ◆
                    </span>

                    {madde}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p
                style={{
                  margin: 0,
                  color: "#f3c64d",
                  fontSize: "12px",
                  fontWeight: 900,
                  letterSpacing: "3px",
                }}
              >
                EĞİTİM İÇERİĞİ
              </p>

              <h2
                style={{
                  margin: "15px 0 25px",
                  fontSize: "35px",
                }}
              >
                Eğitimde neler öğreneceksiniz?
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "18px",
                }}
              >
                {[
                  {
                    number: "01",
                    title: "Temel Kavramlar",
                    text: "Eğitim alanının temel kavramları ve gerekli başlangıç bilgileri.",
                  },
                  {
                    number: "02",
                    title: "Uygulamalı Bilgiler",
                    text: "Mesleki hayatta kullanılabilecek uygulamalar ve yöntemler.",
                  },
                  {
                    number: "03",
                    title: "Alan Bilgisi",
                    text: "Uzmanlaşmayı destekleyen kapsamlı ve güncel konu anlatımları.",
                  },
                  {
                    number: "04",
                    title: "Değerlendirme",
                    text: "Eğitim sonunda öğrenilen bilgilerin ölçülmesi ve değerlendirilmesi.",
                  },
                ].map((konu) => (
                  <article
                    key={konu.number}
                    style={{
                      padding: "24px",
                      backgroundColor: "#111111",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "20px",
                    }}
                  >
                    <div
                      style={{
                        color: "#f3c64d",
                        fontSize: "30px",
                        fontWeight: 900,
                      }}
                    >
                      {konu.number}
                    </div>

                    <h3
                      style={{
                        margin: "20px 0 10px",
                        fontSize: "20px",
                      }}
                    >
                      {konu.title}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: "#888888",
                        lineHeight: 1.7,
                        fontSize: "14px",
                      }}
                    >
                      {konu.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <aside>
            <div
              style={{
                position: "sticky",
                top: "25px",
                padding: "27px",
                backgroundColor: "#111111",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "22px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 22px",
                  fontSize: "23px",
                }}
              >
                Eğitim Bilgileri
              </h3>

              {[
                ["Eğitim Türü", "Online Eğitim"],
                ["Kategori", egitim.category],
                ["Ücret", "5.000 TL"],
                ["Sertifika", "Mevcuttur"],
                ["Danışmanlık", "Mevcuttur"],
              ].map(([baslik, deger]) => (
                <div
                  key={baslik}
                  style={{
                    padding: "16px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    style={{
                      color: "#666666",
                      fontSize: "12px",
                    }}
                  >
                    {baslik}
                  </div>

                  <div
                    style={{
                      marginTop: "6px",
                      color: "#e5e5e5",
                      fontWeight: 700,
                    }}
                  >
                    {deger}
                  </div>
                </div>
              ))}

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  marginTop: "25px",
                  color: "#080808",
                  backgroundColor: "#f3c64d",
                  textAlign: "center",
                  textDecoration: "none",
                  borderRadius: "13px",
                  padding: "16px",
                  fontWeight: 900,
                }}
              >
                Bilgi Al ve Başvur
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section
        style={{
          padding: "70px 24px",
          textAlign: "center",
          backgroundColor: "#101010",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(32px, 5vw, 52px)",
            }}
          >
            Kariyeriniz için ilk adımı{" "}
            <span style={{ color: "#f3c64d" }}>bugün atın</span>
          </h2>

          <p
            style={{
              margin: "22px auto 30px",
              color: "#929292",
              fontSize: "17px",
              lineHeight: 1.7,
            }}
          >
            Eğitim hakkında ayrıntılı bilgi almak ve kayıt işlemini başlatmak
            için eğitim danışmanımızla iletişime geçin.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              color: "#080808",
              backgroundColor: "#f3c64d",
              textDecoration: "none",
              borderRadius: "14px",
              padding: "17px 30px",
              fontWeight: 900,
            }}
          >
            Hemen Başvur
          </a>
        </div>
      </section>
    </main>
  );
}