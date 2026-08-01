"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home(){

const router = useRouter();

const [videoAcik,setVideoAcik]=useState(true);



return(

<main style={page}>


{/* TANITIM VİDEOSU */}

{
videoAcik &&

<div style={videoBox}>


<button

style={close}

onClick={()=>setVideoAcik(false)}

>

×

</button>


<video

src="/helix-tanitim.mp4"

autoPlay

muted

loop

playsInline

style={video}

/>


</div>

}



{
!videoAcik &&

<button

style={openVideo}

onClick={()=>setVideoAcik(true)}

>

▶

</button>

}





<section style={hero}>


<Image

src="/helix-logo.png"

alt="Helix Akademi"

width={220}

height={220}

style={logo}

/>





<h1 style={title}>

HELIX AKADEMİ

</h1>





<h2 style={subtitle}>

GELECEĞİNİ EĞİTİMLE ŞEKİLLENDİR

</h2>





<p style={text}>

Profesyonel eğitim programları ile

kendini geliştir,

kariyerinde fark yarat.

</p>





<button

style={button}

onClick={()=>router.push("/ogrenci-giris")}

>

ÖĞRENCİ GİRİŞİ

</button>







<div style={stats}>


<Stat

number="10.000+"

text="ÖĞRENCİ"

/>



<Stat

number="50+"

text="EĞİTİM"

/>



<Stat

number="%98"

text="MEMNUNİYET"

/>



</div>


</section>








<section style={section}>


<h2 style={sectionTitle}>

NEDEN HELIX AKADEMİ?

</h2>



<div style={cards}>


<Card

title="UZMAN EĞİTMENLER"

text="Alanında uzman eğitmenlerle kaliteli eğitim"

/>



<Card

title="ONLINE EĞİTİM"

text="Her yerden kolay ve hızlı erişim"

/>



<Card

title="SERTİFİKA"

text="Başarılarını belgeleyen eğitim sistemi"

/>



</div>


</section>









<section style={comments}>


<h2 style={sectionTitle}>

ÖĞRENCİ YORUMLARI

</h2>



<div style={cards}>


<Card

title="⭐⭐⭐⭐⭐"

text="Hasta kayıt kabul eğitimini tamamladım. Kısa sürede sertifikamı aldım ve işe başladım."

/>



<Card

title="⭐⭐⭐⭐⭐"

text="Makam şoförlüğü eğitimi sayesinde kendimi geliştirdim. Eğitim sistemi çok başarılı."

/>



</div>


</section>









<section style={cta}>


<h2>

KARİYERİNİ BUGÜN GELİŞTİR

</h2>


<p>

Helix Akademi ile geleceğine yatırım yap.

</p>


<button

style={button}

onClick={()=>router.push("/ogrenci-giris")}

>

HEMEN BAŞLA

</button>


</section>







<footer style={footer}>


<h2 style={footerTitle}>

HELIX AKADEMİ

</h2>


<p>

+90 530 508 62 69

</p>


<p>

helix_akademi@gmail.com

</p>


</footer>




</main>


)

}







function Stat({number,text}:any){

return(

<div style={stat}>

<h2>

{number}

</h2>


<p>

{text}

</p>


</div>

)

}







function Card({title,text}:any){

return(

<div style={card}>


<h3 style={cardTitle}>

{title}

</h3>


<p>

{text}

</p>


</div>

)

}







const page={

minHeight:"100vh",

background:

"radial-gradient(circle at top,#604000,#090909 55%,#000)",

color:"#fff",

overflow:"hidden"

};







const hero={

minHeight:"auto",

paddingTop:"140px",

paddingBottom:"80px",

display:"flex",

flexDirection:"column" as const,

alignItems:"center",

justifyContent:"center",

textAlign:"center" as const,

paddingLeft:"20px",

paddingRight:"20px"

};







const logo={

filter:

"drop-shadow(0 0 50px #d4af37)"

};







const title={

fontSize:"clamp(38px,8vw,78px)",

fontWeight:900,

letterSpacing:"8px",

margin:"25px 0",

background:

"linear-gradient(180deg,#fff5b8,#d4af37,#7a5600)",

WebkitBackgroundClip:"text",

WebkitTextFillColor:"transparent",

textShadow:

"0 0 30px rgba(212,175,55,.8)"

};







const subtitle={

fontSize:"clamp(22px,5vw,38px)",

fontWeight:900,

textShadow:

"0 0 20px #d4af37"

};







const text={

maxWidth:"700px",

fontSize:"20px",

lineHeight:"1.8",

color:"#ddd"

};







const button={

marginTop:"35px",

padding:"18px 55px",

borderRadius:"20px",

border:"0",

background:

"linear-gradient(135deg,#fff1a6,#d4af37,#8a6500)",

fontWeight:900,

letterSpacing:"3px",

cursor:"pointer",

boxShadow:

"0 0 40px rgba(212,175,55,.7)"

};







const stats={

display:"flex",

flexWrap:"wrap" as const,

justifyContent:"center",

gap:"20px",

marginTop:"60px"

};







const stat={

padding:"30px",

minWidth:"150px",

background:"rgba(255,255,255,.08)",

borderRadius:"25px",

border:"1px solid rgba(212,175,55,.5)"

};







const section={

padding:"80px 20px",

textAlign:"center" as const

};







const comments={

padding:"80px 20px",

textAlign:"center" as const

};







const sectionTitle={

fontSize:"42px",

fontWeight:900,

color:"#d4af37",

textShadow:"0 0 20px #d4af37"

};







const cards={

display:"grid",

gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",

gap:"25px",

marginTop:"40px"

};







const card={

padding:"35px",

borderRadius:"30px",

background:"rgba(255,255,255,.07)",

border:"1px solid rgba(212,175,55,.35)",

boxShadow:"0 0 25px rgba(212,175,55,.15)"

};







const cardTitle={

color:"#d4af37"

};







const cta={

padding:"80px 20px",

textAlign:"center" as const

};







const footer={

padding:"50px",

textAlign:"center" as const,

color:"#aaa"

};







const footerTitle={

color:"#d4af37"

};







const videoBox={

position:"fixed" as const,

right:"15px",

bottom:"15px",

width:"240px",

height:"135px",

borderRadius:"22px",

overflow:"hidden",

border:"2px solid #d4af37",

zIndex:99,

boxShadow:"0 0 40px rgba(212,175,55,.7)"

};







const video={

width:"100%",

height:"100%",

objectFit:"cover" as const

};







const close={

position:"absolute" as const,

right:"10px",

top:"10px",

zIndex:2,

width:"35px",

height:"35px",

borderRadius:"50%",

border:"0",

background:"#d4af37",

fontWeight:900

};







const openVideo={

position:"fixed" as const,

right:"20px",

bottom:"20px",

width:"60px",

height:"60px",

borderRadius:"50%",

background:"#000",

color:"#d4af37",

border:"2px solid #d4af37",

zIndex:99

};