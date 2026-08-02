"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Home(){

const router = useRouter();


return(

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

className="student-btn"

onClick={()=>router.push("/ogrenci-giris")}

>

🎓 ÖĞRENCİ GİRİŞİ

</button>

<button

className="admin-btn"

onClick={()=>router.push("/admin-giris")}

>

🔐 YÖNETİM GİRİŞ

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








<section className="section">


<h2>

NEDEN HELIX AKADEMİ?

</h2>




<div className="cards">



<div className="card">

<h3>

Uzman Eğitmenler

</h3>


<p>

Alanında deneyimli eğitmenlerle kaliteli eğitim.

</p>


</div>






<div className="card">

<h3>

Online Eğitim

</h3>


<p>

Dilediğin yerden eğitimlere ulaş.

</p>


</div>







<div className="card">


<h3>

Sertifikalı Eğitim

</h3>


<p>

Başarılarını sertifika ile belgele.

</p>


</div>




</div>


</section>









<section className="section">


<h2>

ÖĞRENCİ YORUMLARI

</h2>





<div className="cards">



<div className="card">

<p>

"Helix Akademi sayesinde kendimi geliştirdim."

</p>


<strong>

Ahmet K.

</strong>


</div>





<div className="card">

<p>

"Eğitim sistemi çok kaliteli."

</p>


<strong>

Zeynep M.

</strong>


</div>






<div className="card">

<p>

"Profesyonel ve güvenilir platform."

</p>


<strong>

Mehmet T.

</strong>


</div>



</div>


</section>









<section className="contact">


<h2>

İLETİŞİM

</h2>


<p>

📞 +90 530 508 62 69

</p>


<p>

✉️ helix_akademi@gmail.com

</p>


<p>

🌐 helixakademi.com

</p>



</section>








<footer>


<h3>

HELIX AKADEMİ

</h3>


<p>

Geleceğin eğitim platformu

</p>


</footer>




</main>

)

}