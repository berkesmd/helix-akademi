"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { egitimler } from "@/data/egitimler";

export default function EgitimlerPage() {
  const [arama, setArama] = useState("");
  const [kategori, setKategori] = useState("Tümü");

  const kategoriler = useMemo(
    () => ["Tümü", ...Array.from(new Set(egitimler.map((e) => e.category))).sort()],
    []
  );

  const filtrelenen = useMemo(() => {
    const q = arama.trim().toLocaleLowerCase("tr-TR");

    return egitimler.filter((egitim) => {
      const metin = `${egitim.title} ${egitim.category}`.toLocaleLowerCase("tr-TR");
      const aramaUyuyor = !q || metin.includes(q);
      const kategoriUyuyor =
        kategori === "Tümü" || egitim.category === kategori;

      return aramaUyuyor && kategoriUyuyor;
    });
  }, [arama, kategori]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#070707",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(0,0,0,0.92)",
          padding: "20px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <Link
            href="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "22px",
              fontWeight: 900,
            }}
          >
            HELIX <span style={{ color: "#f3c64d" }}>AKADEMİ</span>
          </Link>

          <Link
            href="/"
            style={{
              color: "#f3c64d",
              textDecoration: "none",
              border: "1px solid rgba(243,198,77,0.35)",
              borderRadius: "12px",
              padding: "11px 16px",
              fontWeight: 700,
            }}
          >
            Ana Sayfa
          </Link>
        </div>
      </header>

      <section
        style={{
          padding: "70px 24px 50px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p
            style={{
              color: "#f3c64d",
              fontWeight: 900,
              letterSpacing: "4px",
              fontSize: "12px",
            }}
          >
            {egitimler.length} SERTİFİKALI EĞİTİM
          </p>

          <h1
            style={{
              margin: "18px 0",
              fontSize: "clamp(40px, 7vw, 68px)",
              lineHeight: 1.05,
            }}
          >
            Eğitimlerimizi <span style={{ color: "#f3c64d" }}>Keşfet</span>
          </h1>

          <p style={{ color: "#999", fontSize: "18px", lineHeight: 1.7 }}>
            Tüm eğitimlerin ücreti 5.000 TL’dir. Arama ve kategori filtrelerini
            kullanarak size uygun programı bulun.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 280px",
            gap: "14px",
          }}
        >
          <input
            value={arama}
            onChange={(e) => setArama(e.target.value)}
            placeholder="Eğitim adı veya kategori ara..."
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "#111",
              color: "white",
              outline: "none",
            }}
          />

          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "#111",
              color: "white",
              outline: "none",
            }}
          >
            {kategoriler.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <p style={{ color: "#777", marginTop: "16px" }}>
          {filtrelenen.length} eğitim gösteriliyor
        </p>

        <div
          style={{
            marginTop: "26px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {filtrelenen.map((egitim) => (
            <article
              key={egitim.id}
              style={{
                minHeight: "270px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "linear-gradient(145deg, #151515, #0b0b0b)",
                borderRadius: "24px",
                padding: "24px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      border: "1px solid rgba(243,198,77,0.3)",
                      background: "rgba(243,198,77,0.08)",
                      color: "#f3c64d",
                      borderRadius: "999px",
                      padding: "7px 11px",
                      fontSize: "11px",
                      fontWeight: 800,
                    }}
                  >
                    {egitim.category}
                  </span>

                  <span style={{ color: "#666", fontSize: "12px" }}>
                    ID: {egitim.id}
                  </span>
                </div>

                <h2
                  style={{
                    marginTop: "22px",
                    fontSize: "21px",
                    lineHeight: 1.4,
                  }}
                >
                  {egitim.title}
                </h2>

                <p style={{ color: "#888", lineHeight: 1.7 }}>
                  Online erişim, eğitim danışmanı desteği ve sertifika imkânı.
                </p>
              </div>

              <div
                style={{
                  marginTop: "24px",
                  paddingTop: "18px",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <strong style={{ color: "#f3c64d", fontSize: "26px" }}>
                  5.000 TL
                </strong>

                <Link
                  href={`/egitimler/${egitim.slug}`}
                  style={{
                    textDecoration: "none",
                    background: "#f3c64d",
                    color: "#070707",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    fontWeight: 900,
                  }}
                >
                  İncele
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
