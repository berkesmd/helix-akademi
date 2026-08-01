"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home(){

const router = useRouter();

const [video,setVideo]=useState(true);



return(

<main style={page}>


{/* VIDEO */}

{
video &&

<div style={videoBox}>


<button

style={close}

onClick={()=>setVideo(false)}

>
×
</button>


<video

src="/helix-tanitim.mp4"

autoPlay

muted

loop

playsInline

style={videoStyle}

/>


</div>

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



<p style={description}>

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


<h2 style={heading}>

NEDEN HELIX AKADEMİ?

</h2>



<div style={cards}>


<Card

title="UZMAN EĞİTMENLER"

text="Alanında uzman eğitmenlerden profesyonel eğitim"

/>



<Card

title="ONLINE EĞİTİM"

text="Dilediğin yerden kolay erişim"

/>



<Card

title="SERTİFİKA"

text="Başarılarını belgeleyen eğitim sistemi"

/>


</div>


</section>









<section style={section}>


<h2 style={heading}>

ÖĞRENCİ YORUMLARI

</h2>



<div style={cards}>


<Card

title="⭐⭐⭐⭐⭐"

text="Hasta kayıt kabul eğitimini aldım. Kısa sürede sertifikamı tamamladım."

/>


<Card

title="⭐⭐⭐⭐⭐"

text="Makam şoförlüğü eğitimi sayesinde kendime yeni bir kariyer yolu açtım."

/>



</div>


</section>








<section style={contact}>


<h2>

GELECEĞİNE YATIRIM YAP

</h2>


<p>

Helix Akademi ile eğitimlerine hemen başla.

</p>



<button

style={button}

onClick={()=>router.push("/ogrenci-giris")}

>

BAŞLA

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

"radial-gradient(circle at top,#604000,#080808 55%,#000)",

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

"drop-shadow(0 0 40px #d4af37)"

};








const title={

fontSize:"clamp(40px,8vw,75px)",

fontWeight:900,

letterSpacing:"8px",

margin:"20px 0",

background:

"linear-gradient(#fff4b0,#d4af37,#8a6500)",

WebkitBackgroundClip:"text",

WebkitTextFillColor:"transparent"

};








const subtitle={

fontSize:"clamp(20px,4vw,38px)",

fontWeight:900,

textShadow:"0 0 25px #d4af37"

};








const description={

maxWidth:"650px",

fontSize:"20px",

lineHeight:"1.8",

color:"#ddd"

};








const button={

marginTop:"35px",

padding:"18px 60px",

borderRadius:"20px",

border:"0",

background:

"linear-gradient(135deg,#fff2a0,#d4af37,#8a6500)",

fontWeight:900,

letterSpacing:"3px",

boxShadow:"0 0 40px #d4af37"

};








const stats={

display:"flex",

flexWrap:"wrap" as const,

justifyContent:"center",

gap:"20px",

marginTop:"60px"

};








const stat={

width:"150px",

padding:"30px",

borderRadius:"25px",

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(212,175,55,.4)"

};








const section={

padding:"80px 20px",

textAlign:"center" as const

};








const heading={

fontSize:"40px",

color:"#d4af37"

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

border:"1px solid rgba(212,175,55,.4)"

};








const cardTitle={

color:"#d4af37"

};








const contact={

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

zIndex:100,

boxShadow:"0 0 40px rgba(212,175,55,.7)"

};








const videoStyle={

width:"100%",

height:"100%",

objectFit:"cover" as const

};








const close={

position:"absolute" as const,

right:"10px",

top:"10px",

zIndex:5,

width:"35px",

height:"35px",

borderRadius:"50%",

border:"0",

background:"#d4af37",

fontWeight:900

};