"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home(){

const router = useRouter();

const [videoAcik,setVideoAcik]=useState(true);



return(

<main style={page}>


{/* VIDEO */}

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

style={videoStyle}

/>


</div>

}





<section style={hero}>


<Image

src="/helix-logo.png"

alt="Helix Akademi"

width={160}

height={160}

style={logo}

/>





<h1 style={title}>

HELIX AKADEMİ

</h1>





<h2 style={subtitle}>

GELECEĞİNİ EĞİTİMLE ŞEKİLLENDİR

</h2>





<p style={desc}>

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

text="Alanında uzman eğitmenlerle kaliteli eğitim"

/>



<Card

title="ONLINE EĞİTİM"

text="Her yerden kolay erişim"

/>



<Card

title="SERTİFİKA"

text="Başarılarını belgeleyen eğitim sistemi"

/>



</div>


</section>








<section style={section}>


<h2 style={sectionTitle}>

ÖĞRENCİ YORUMLARI

</h2>



<div style={cards}>


<Card

title="⭐⭐⭐⭐⭐"

text="Hasta kayıt kabul eğitimini tamamladım. Eğitim süreci çok başarılıydı."

/>



<Card

title="⭐⭐⭐⭐⭐"

text="Makam şoförlüğü eğitimi ile kendimi geliştirdim. Teşekkürler Helix Akademi."

/>



</div>


</section>








<section style={cta}>


<h2>

GELECEĞİNİ BUGÜN ŞEKİLLENDİR

</h2>


<p>

Helix Akademi ile eğitimlerine hemen başla.

</p>



<button

style={button}

onClick={()=>router.push("/ogrenci-giris")}

>

BAŞVURU YAP

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









const page={

minHeight:"100vh",

background:
"radial-gradient(circle at top,#5b3b00,#080808 60%,#000)",

color:"#fff",

overflow:"hidden"

};






const hero={

minHeight:"100vh",

paddingTop:"110px",

paddingLeft:"20px",

paddingRight:"20px",

display:"flex",

flexDirection:"column" as const,

justifyContent:"center",

alignItems:"center",

textAlign:"center" as const

};






const logo={

filter:
"drop-shadow(0 0 35px #d4af37)"

};






const title={

fontSize:"clamp(38px,7vw,75px)",

fontWeight:900,

letterSpacing:"6px",

margin:"20px",

background:
"linear-gradient(#fff3a6,#d4af37,#806000)",

WebkitBackgroundClip:"text",

WebkitTextFillColor:"transparent"

};






const subtitle={

fontSize:"clamp(20px,4vw,36px)",

fontWeight:900,

textShadow:
"0 0 20px #d4af37"

};






const desc={

maxWidth:"650px",

fontSize:"18px",

lineHeight:"1.8",

color:"#ddd"

};






const button={

marginTop:"30px",

padding:"18px 55px",

borderRadius:"20px",

border:"none",

fontWeight:900,

letterSpacing:"3px",

background:
"linear-gradient(135deg,#fff0a0,#d4af37,#8a6500)",

boxShadow:
"0 0 35px rgba(212,175,55,.8)",

cursor:"pointer"

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

padding:"25px",

borderRadius:"25px",

background:"rgba(255,255,255,.07)",

border:"1px solid rgba(212,175,55,.4)"

};






const section={

padding:"80px 20px",

textAlign:"center" as const

};






const sectionTitle={

fontSize:"38px",

fontWeight:900,

color:"#d4af37"

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

border:"1px solid rgba(212,175,55,.35)"

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

width:"230px",

height:"130px",

borderRadius:"20px",

overflow:"hidden",

border:"2px solid #d4af37",

zIndex:30,

boxShadow:"0 0 30px rgba(212,175,55,.6)"

};






const videoStyle={

width:"100%",

height:"100%",

objectFit:"cover" as const

};






const close={

position:"absolute" as const,

right:"8px",

top:"8px",

zIndex:5,

width:"32px",

height:"32px",

borderRadius:"50%",

border:"0",

background:"#d4af37",

fontWeight:900

};