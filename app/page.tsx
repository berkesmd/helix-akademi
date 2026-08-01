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

width={180}

height={180}

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

NEDEN HELIX AKADEMİ?

</h2>




<div style={cards}>


<Card

title="UZMAN EĞİTMENLER"

text="Alanında uzman eğitim kadrosu"

/>



<Card

title="ONLINE EĞİTİM"

text="Her yerden kolay erişim"

/>




<Card

title="SERTİFİKALI EĞİTİM"

text="Başarılarını belgeye dönüştür"

/>



</div>


</section>








<section style={yorum}>


<h2 style={sectionTitle}>

ÖĞRENCİLERİMİZ NE DİYOR?

</h2>



<div style={cards}>


<Card

title="⭐⭐⭐⭐⭐"

text="Hasta kayıt kabul eğitimini tamamladım. Kısa sürede sertifikamı aldım ve iş görüşmesine başladım."

/>



<Card

title="⭐⭐⭐⭐⭐"

text="Makam şoförlüğü eğitiminden çok memnun kaldım. Profesyonel ve kaliteli bir eğitimdi."

/>



</div>



</section>










<section style={cta}>


<h2>

KARİYERİNE BUGÜN BAŞLA

</h2>


<p>

Helix Akademi ile geleceğini şekillendir.

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

"radial-gradient(circle at top,#5b4000,#080808 45%,#000)",

color:"#fff",

paddingTop:"80px"

};






const hero={

minHeight:"90vh",

display:"flex",

flexDirection:"column" as const,

justifyContent:"center",

alignItems:"center",

textAlign:"center" as const,

padding:"30px 20px"

};






const logo={

filter:

"drop-shadow(0 0 45px #d4af37)"

};





const title={

fontSize:"clamp(38px,8vw,80px)",

fontWeight:900,

letterSpacing:"8px",

margin:"20px",

background:

"linear-gradient(#fff5b8,#d4af37,#8a6500)",

WebkitBackgroundClip:"text",

WebkitTextFillColor:"transparent"

};





const subtitle={

fontSize:"clamp(20px,4vw,40px)",

fontWeight:900,

textShadow:"0 0 25px #d4af37"

};





const text={

maxWidth:"700px",

fontSize:"20px",

color:"#ddd",

lineHeight:"1.8"

};





const button={

marginTop:"30px",

padding:"18px 55px",

borderRadius:"20px",

border:"0",

background:

"linear-gradient(135deg,#fff0a0,#d4af37,#806000)",

fontWeight:900,

letterSpacing:"3px",

cursor:"pointer",

boxShadow:"0 0 35px #d4af37"

};





const stats={

display:"flex",

gap:"20px",

marginTop:"60px",

flexWrap:"wrap" as const,

justifyContent:"center"

};





const stat={

padding:"25px 40px",

borderRadius:"25px",

background:"rgba(255,255,255,.08)",

border:"1px solid rgba(212,175,55,.4)"

};





const section={

padding:"80px 20px",

textAlign:"center" as const

};





const yorum={

padding:"80px 20px",

textAlign:"center" as const

};





const sectionTitle={

fontSize:"40px",

color:"#d4af37",

fontWeight:900

};





const cards={

display:"grid",

gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",

gap:"25px",

marginTop:"40px"

};





const card={

padding:"35px",

borderRadius:"30px",

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(212,175,55,.35)",

boxShadow:"0 0 30px rgba(212,175,55,.15)"

};





const cardTitle={

color:"#d4af37",

fontWeight:900

};





const cta={

padding:"80px 20px",

textAlign:"center" as const,

background:"rgba(212,175,55,.08)"

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

width:"320px",

height:"180px",

zIndex:100,

borderRadius:"25px",

overflow:"hidden",

border:"2px solid #d4af37",

boxShadow:"0 0 40px #d4af37"

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

zIndex:100

};