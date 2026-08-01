"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();


  return (

    <main className="home">


      <section className="hero">


        <Image
          src="/helix-logo.png"
          alt="Helix Akademi"
          width={260}
          height={260}
          priority
          className="logo"
        />


        <h1>
          HELIX AKADEMİ
        </h1>


        <h2>
          GELECEĞİNİ EĞİTİMLE ŞEKİLLENDİR
        </h2>


        <p>
          Profesyonel eğitim programları ile kendini geliştir,
          kariyerinde fark yarat.
        </p>



        <button
          onClick={() => router.push("/ogrenci-giris")}
        >
          ÖĞRENCİ GİRİŞİ
        </button>



        <div className="stats">


          <div className="stat-box">
            <strong>
              10.000+
            </strong>

            <span>
              ÖĞRENCİ
            </span>
          </div>



          <div className="stat-box">
            <strong>
              50+
            </strong>

            <span>
              EĞİTİM
            </span>
          </div>



          <div className="stat-box">
            <strong>
              %98
            </strong>

            <span>
              MEMNUNİYET
            </span>
          </div>


        </div>


      </section>


    </main>

  );
}