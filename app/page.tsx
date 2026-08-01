"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


export default function Home(){

const router=useRouter();

const [videoAcik,setVideoAcik]=useState(true);
const [mobil,setMobil]=useState(false);



useEffect(()=>{

const kontrol=()=>{

setMobil(window.innerWidth < 768);

};


kontrol();

window.addEventListener("resize",kontrol);


return()=>window.removeEventListener("resize",kontrol);


},[]);



return(

<main style={page}>


{
videoAcik &&

<div style={{
...videoBox,
right:mobil ? "15px":"30px",
bottom:mobil ? "15px":"30px",
width:mobil ? "260px":"330px",
height:mobil ? "150px":"190px"
}}>


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







<section

style={{
...hero,
padding:mobil ? "20px 15px":"50px"
}}

>



<Image

src="/helix-logo.png"

alt="Helix Akademi"

width={mobil?150:230}

height={mobil?150:230}

style={logo}

/>







<h1

style={{
...title,
fontSize:mobil?"38px":"78px",
letterSpacing:mobil?"4px":"12px"
}}

>

HELIX AKADEMİ

</h1>








<h2

style={{
...subtitle,
fontSize:mobil?"20px":"38px"
}}

>

GELECEĞİNİ EĞİTİMLE ŞEKİLLENDİR

</h2>







<p

style={{
...text,
fontSize:mobil?"15px":"22px"
}}

>

Profesyonel eğitim programları ile

kendini geliştir,

kariyerinde fark yarat.

</p>







<button

style={{
...button,
padding:mobil?"16px 45px":"20px 70px",
fontSize:mobil?"14px":"18px"
}}

onClick={()=>router.push("/ogrenci-giris")}

>

ÖĞRENCİ GİRİŞİ

</button>







<div

style={{
...stats,
flexDirection:mobil?"column":"row",
width:mobil?"90%":"auto",
gap:mobil?"15px":"30px",
marginTop:mobil?"40px":"70px"
}}

>



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



<div

style={{
...cards,
gridTemplateColumns:mobil?"1fr":"repeat(3,1fr)"
}}

>


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

textAlign:"center" as const

};




const logo={

filter:

"drop-shadow(0 0 50px #d4af37)"

};




const title={

fontWeight:900,

margin:"25px",

background:

"linear-gradient(180deg,#fff5b8,#d4af37,#7a5600)",

WebkitBackgroundClip:"text",

WebkitTextFillColor:"transparent",

textShadow:

"0 0 25px rgba(212,175,55,.9)"

};




const subtitle={

fontWeight:900,

color:"#fff",

textShadow:

"0 0 15px #d4af37"

};




const text={

fontWeight:600,

color:"#ddd",

maxWidth:"700px",

lineHeight:"1.8"

};




const button={

marginTop:"35px",

background:

"linear-gradient(135deg,#fff1a6,#d4af37,#8a6500)",

border:"0",

borderRadius:"20px",

fontWeight:900,

letterSpacing:"3px",

cursor:"pointer",

boxShadow:

"0 0 30px rgba(212,175,55,.8)"

};




const stats={

display:"flex"

};




const stat={

padding:"30px",

background:"rgba(255,255,255,.07)",

borderRadius:"25px",

border:"1px solid rgba(212,175,55,.4)"

};




const section={

padding:"100px 30px",

textAlign:"center" as const

};




const sectionTitle={

fontSize:"45px",

color:"#d4af37"

};




const cards={

display:"grid",

gap:"30px",

marginTop:"50px"

};




const card={

padding:"40px",

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(212,175,55,.4)",

borderRadius:"30px"

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

textAlign:"center" as const

};




const footerTitle={

color:"#d4af37"

};




const videoBox={

position:"fixed" as const,

overflow:"hidden",

borderRadius:"25px",

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

fontWeight:900

};




const openVideo={

position:"fixed" as const,

right:"20px",

bottom:"20px",

width:"60px",

height:"60px",

borderRadius:"50%",

background:"#050505",

color:"#d4af37",

border:"2px solid #d4af37",

zIndex:99

};