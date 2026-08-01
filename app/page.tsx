"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home(){

const router = useRouter();

const [videoAcik,setVideoAcik] = useState(true);


return (

<main style={page}>


{videoAcik && (

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

)}





<section style={hero}>


<Image

src="/helix-logo.png"

alt="Helix Akademi"

width={220}

height={220}

priority

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


<Stat number="10.000+" text="ÖĞRENCİ"/>

<Stat number="50+" text="EĞİTİM"/>

<Stat number="%98" text="MEMNUNİYET"/>


</div>



</section>







<section style={section}>


<h2 style={goldTitle}>

NEDEN HELIX AKADEMİ?

</h2>


<div style={cards}>


<Card

title="UZMAN EĞİTMENLER"

text="Alanında deneyimli eğitim kadrosu"

/>



<Card

title="ONLINE EĞİTİM"

text="Her yerden kaliteli eğitim"

/>



<Card

title="SERTİFİKA"

text="Başarılarını belgelendir"

/>



</div>


</section>







<footer style={footer}>


<h2 style={goldTitle}>

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

<h2>{number}</h2>

<p>{text}</p>

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







const page = {

minHeight:"100vh",

background:
"radial-gradient(circle at top,#5a3d00,#080808 60%,#000)",

color:"#fff",

overflowX:"hidden"

} as const;






const hero = {

minHeight:"100vh",

display:"flex",

flexDirection:"column",

justifyContent:"center",

alignItems:"center",

textAlign:"center",

padding:"40px 20px"

} as const;






const logo = {

objectFit:"contain",

filter:
"drop-shadow(0 0 45px rgba(212,175,55,.8))"

} as const;






const title = {

fontSize:"clamp(38px,8vw,80px)",

fontWeight:900,

letterSpacing:"10px",

margin:"20px 0",

background:
"linear-gradient(180deg,#fff5b8,#d4af37,#8a6500)",

WebkitBackgroundClip:"text",

WebkitTextFillColor:"transparent"

} as const;






const subtitle = {

fontSize:"clamp(20px,4vw,38px)",

fontWeight:900,

textShadow:"0 0 20px #d4af37"

} as const;






const text = {

maxWidth:"700px",

fontSize:"20px",

lineHeight:"1.7",

color:"#ddd"

} as const;






const button = {

marginTop:"35px",

padding:"20px 70px",

borderRadius:"20px",

border:"none",

fontWeight:900,

letterSpacing:"3px",

background:
"linear-gradient(135deg,#fff1a6,#d4af37,#8a6500)",

boxShadow:
"0 0 40px rgba(212,175,55,.8)",

cursor:"pointer"

} as const;






const stats = {

display:"flex",

gap:"25px",

flexWrap:"wrap",

justifyContent:"center",

marginTop:"60px"

} as const;






const stat = {

padding:"30px 45px",

borderRadius:"25px",

border:"1px solid rgba(212,175,55,.5)",

background:"rgba(255,255,255,.06)"

} as const;






const section = {

padding:"80px 20px",

textAlign:"center"

} as const;






const goldTitle = {

color:"#d4af37",

fontSize:"40px",

fontWeight:900

} as const;






const cards = {

display:"grid",

gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",

gap:"25px",

marginTop:"40px"

} as const;






const card = {

padding:"35px",

borderRadius:"25px",

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(212,175,55,.4)"

} as const;






const cardTitle = {

color:"#d4af37"

} as const;






const footer = {

padding:"50px",

textAlign:"center",

color:"#aaa"

} as const;






const videoBox = {

position:"fixed",

right:"20px",

bottom:"20px",

width:"280px",

height:"160px",

borderRadius:"25px",

overflow:"hidden",

border:"2px solid #d4af37",

zIndex:99,

boxShadow:"0 0 40px rgba(212,175,55,.7)"

} as const;






const video = {

width:"100%",

height:"100%",

objectFit:"cover"

} as const;






const close = {

position:"absolute",

right:"10px",

top:"10px",

width:"35px",

height:"35px",

borderRadius:"50%",

border:"none",

background:"#d4af37",

fontWeight:900,

zIndex:2,

cursor:"pointer"

} as const;