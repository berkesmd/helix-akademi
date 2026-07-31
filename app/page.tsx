"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home(){

const router=useRouter();

const [videoAcik,setVideoAcik]=useState(true);


return(

<main style={page}>


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

width={230}

height={230}

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

text="Alanında deneyimli eğitim kadrosu"

/>



<Card

title="ONLINE EĞİTİM"

text="Dilediğin yerden kaliteli eğitim"

/>



<Card

title="SERTİFİKA"

text="Başarılarını resmi olarak belgelendir"

/>



</div>


</section>









<section style={cta}>


<h2>

ÖĞRENME YOLCULUĞUNUZA BAŞLAYIN

</h2>



<p>

Öğrenci hesabınız ile eğitimlerinize hemen erişin.

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









function Stat({

number,

text

}:any){


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









function Card({

title,

text

}:any){


return(

<div style={card}>


<h2 style={cardTitle}>

{title}

</h2>


<p>

{text}

</p>



</div>

)

}









const page={

minHeight:"100vh",

background:

"radial-gradient(circle at top,#5a3d00,#080808 55%,#000)",

color:"white",

overflow:"hidden"

};







const hero={

minHeight:"100vh",

display:"flex",

flexDirection:"column" as const,

alignItems:"center",

justifyContent:"center",

textAlign:"center" as const,

padding:"50px"

};







const logo={

filter:

"drop-shadow(0 0 50px #d4af37)"

};







const title={

fontSize:"78px",

fontWeight:900,

letterSpacing:"12px",

margin:"25px",

background:

"linear-gradient(180deg,#fff5b8,#d4af37,#7a5600)",

WebkitBackgroundClip:"text",

WebkitTextFillColor:"transparent",

textShadow:

"0 0 25px rgba(212,175,55,.9)"

};







const subtitle={

fontSize:"38px",

fontWeight:900,

color:"#fff",

textShadow:

"0 0 15px #d4af37,0 0 40px rgba(212,175,55,.7)"

};







const text={

fontSize:"22px",

fontWeight:600,

color:"#ddd",

maxWidth:"700px",

lineHeight:"1.8",

textShadow:

"0 0 15px rgba(255,255,255,.25)"

};







const button={

marginTop:"35px",

padding:"20px 70px",

background:

"linear-gradient(135deg,#fff1a6,#d4af37,#8a6500)",

border:"0",

borderRadius:"20px",

fontSize:"18px",

fontWeight:900,

letterSpacing:"3px",

cursor:"pointer",

boxShadow:

"0 0 30px rgba(212,175,55,.8),0 0 70px rgba(212,175,55,.4)"

};







const stats={

display:"flex",

gap:"30px",

marginTop:"70px"

};







const stat={

padding:"30px 55px",

background:"rgba(255,255,255,.07)",

borderRadius:"25px",

border:"1px solid rgba(212,175,55,.4)",

boxShadow:

"0 0 25px rgba(212,175,55,.15)"

};







const section={

padding:"100px 50px",

textAlign:"center" as const

};







const sectionTitle={

fontSize:"48px",

fontWeight:900,

color:"#d4af37",

textShadow:

"0 0 25px rgba(212,175,55,.8)"

};







const cards={

display:"grid",

gridTemplateColumns:"repeat(3,1fr)",

gap:"30px",

marginTop:"50px"

};







const card={

padding:"45px",

background:

"rgba(255,255,255,.06)",

border:

"1px solid rgba(212,175,55,.35)",

borderRadius:"30px",

boxShadow:

"0 0 30px rgba(212,175,55,.1)"

};







const cardTitle={

color:"#d4af37",

fontWeight:900,

textShadow:

"0 0 15px rgba(212,175,55,.8)"

};







const cta={

padding:"100px",

textAlign:"center" as const,

background:

"rgba(212,175,55,.08)"

};







const footer={

padding:"60px",

textAlign:"center" as const,

color:"#aaa"

};







const footerTitle={

color:"#d4af37",

textShadow:

"0 0 20px rgba(212,175,55,.8)"

};







const videoBox={

position:"fixed" as const,

right:"30px",

bottom:"30px",

width:"330px",

height:"190px",

borderRadius:"25px",

overflow:"hidden",

border:"2px solid #d4af37",

zIndex:99,

boxShadow:

"0 0 50px rgba(212,175,55,.7)"

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

fontWeight:900,

cursor:"pointer"

};







const openVideo={

position:"fixed" as const,

right:"30px",

bottom:"30px",

width:"60px",

height:"60px",

borderRadius:"50%",

background:"#050505",

color:"#d4af37",

border:"2px solid #d4af37",

cursor:"pointer",

zIndex:99

};