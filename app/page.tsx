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

Profesyonel eğitim programları ile kendini geliştir,
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

ÖĞRENCİ YORUMLARI

</h2>



<div style={cards}>


<Card

title="Ayşe K."

text="Hasta kayıt kabul eğitimini tamamladım. Kısa sürede sertifikamı aldım ve iş hayatımda çok faydasını gördüm."

/>



<Card

title="Mehmet T."

text="Makam şoförlüğü eğitiminden çok memnun kaldım. Eğitim sistemi gerçekten profesyonel."

/>


</div>


</section>








<section style={cta}>


<h2>

EĞİTİM YOLCULUĞUNA BAŞLA

</h2>


<p>

Hemen giriş yaparak eğitimlerine ulaş.

</p>



<button

style={button}

onClick={()=>router.push("/ogrenci-giris")}

>

ÖĞRENCİ GİRİŞİ

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
"radial-gradient(circle at top,#5a3d00,#080808 60%,#000)",

color:"#fff",

overflow:"hidden"

};







const hero={

minHeight:"100vh",

paddingTop:"120px",

paddingLeft:"20px",

paddingRight:"20px",

display:"flex",

flexDirection:"column" as const,

alignItems:"center",

justifyContent:"center",

textAlign:"center" as const

};







const logo={

filter:
"drop-shadow(0 0 45px #d4af37)"

};







const title={

fontSize:"clamp(40px,8vw,78px)",

fontWeight:900,

letterSpacing:"8px",

background:
"linear-gradient(180deg,#fff5b8,#d4af37,#8a6500)",

WebkitBackgroundClip:"text",

WebkitTextFillColor:"transparent",

textShadow:
"0 0 30px #d4af37"

};







const subtitle={

fontSize:"clamp(22px,4vw,38px)",

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

padding:"18px 60px",

borderRadius:"20px",

border:"0",

fontWeight:900,

letterSpacing:"3px",

background:
"linear-gradient(135deg,#fff1a6,#d4af37,#8a6500)",

cursor:"pointer",

boxShadow:
"0 0 40px rgba(212,175,55,.7)"

};







const stats={

display:"flex",

gap:"20px",

marginTop:"60px",

flexWrap:"wrap" as const,

justifyContent:"center"

};







const stat={

padding:"25px",

minWidth:"150px",

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(212,175,55,.4)",

borderRadius:"25px"

};







const section={

padding:"80px 20px",

textAlign:"center" as const

};







const sectionTitle={

fontSize:"40px",

color:"#d4af37"

};







const cards={

display:"grid",

gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",

gap:"25px",

marginTop:"40px"

};







const card={

padding:"35px",

borderRadius:"25px",

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(212,175,55,.3)"

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

right:"20px",

bottom:"20px",

width:"260px",

height:"150px",

borderRadius:"25px",

overflow:"hidden",

border:"2px solid #d4af37",

zIndex:99,

boxShadow:"0 0 40px rgba(212,175,55,.6)"

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

border:"0",

borderRadius:"50%",

width:"35px",

height:"35px",

background:"#d4af37",

fontWeight:900

};