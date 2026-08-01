"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home(){

const router = useRouter();

const [video,setVideo]=useState(true);


return(

<main style={page}>


{video &&

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

alt="Helix"

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

text="Alanında deneyimli profesyonel eğitim kadrosu"

/>



<Card

title="ONLINE EĞİTİM"

text="Her yerden kolay ve kaliteli eğitim"

/>



<Card

title="SERTİFİKA"

text="Başarılarını resmi olarak belgele"

/>


</div>


</section>










<section style={section}>


<h2 style={sectionTitle}>
ÖĞRENCİ YORUMLARI
</h2>



<div style={cards}>


<Comment

name="Ahmet Yılmaz"

job="Hasta Kayıt Kabul Eğitimi"

text="Helix Akademi sayesinde eğitimimi tamamladım. Sistem çok başarılı ve destek ekibi çok ilgiliydi."

/>



<Comment

name="Mehmet Kaya"

job="Makam Şoförlüğü Eğitimi"

text="Aldığım eğitim sayesinde kendimi geliştirdim ve yeni fırsatlar yakaladım."

/>



</div>


</section>









<section style={cta}>


<h2>
EĞİTİMİNİZE HEMEN BAŞLAYIN
</h2>


<p>
Öğrenci hesabınız ile eğitimlerinize erişebilirsiniz.
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


<h2 style={gold}>
{title}
</h2>


<p>
{text}
</p>


</div>

)

}








function Comment({name,job,text}:any){

return(

<div style={card}>


<div style={stars}>
★★★★★
</div>


<h3>
{name}
</h3>


<p style={gold}>
{job}
</p>


<p>
"{text}"
</p>


</div>

)

}









const page={

minHeight:"100vh",

background:
"radial-gradient(circle at top,#5a3d00,#090909 55%,#000)",

color:"white"

};




const hero={

minHeight:"100vh",

display:"flex",

flexDirection:"column" as const,

alignItems:"center",

justifyContent:"center",

textAlign:"center" as const,

padding:"30px"

};





const logo={

filter:
"drop-shadow(0 0 50px #d4af37)"

};





const title={

fontSize:"clamp(40px,8vw,80px)",

letterSpacing:"8px",

fontWeight:900,

background:
"linear-gradient(#fff,#d4af37)",

WebkitBackgroundClip:"text",

color:"transparent"

};





const subtitle={

fontSize:"clamp(20px,4vw,40px)",

color:"#fff",

textShadow:"0 0 20px #d4af37"

};





const desc={

maxWidth:"700px",

fontSize:"20px",

color:"#ddd",

lineHeight:"1.8"

};





const button={

marginTop:"30px",

padding:"18px 60px",

borderRadius:"20px",

border:"0",

background:
"linear-gradient(135deg,#fff1a6,#d4af37)",

fontWeight:900,

letterSpacing:"3px",

cursor:"pointer",

boxShadow:
"0 0 40px #d4af37"

};





const stats={

display:"flex",

gap:"25px",

marginTop:"60px",

flexWrap:"wrap" as const,

justifyContent:"center"

};





const stat={

padding:"30px",

minWidth:"150px",

background:"rgba(255,255,255,.08)",

borderRadius:"25px",

border:"1px solid #d4af37"

};





const section={

padding:"80px 30px",

textAlign:"center" as const

};





const sectionTitle={

fontSize:"45px",

color:"#d4af37"

};





const cards={

display:"grid",

gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",

gap:"30px",

marginTop:"40px"

};





const card={

padding:"35px",

background:"rgba(255,255,255,.07)",

borderRadius:"25px",

border:"1px solid rgba(212,175,55,.5)"

};





const gold={

color:"#d4af37"

};





const stars={

color:"#d4af37",

fontSize:"25px"

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

right:"25px",

bottom:"25px",

width:"320px",

height:"180px",

borderRadius:"25px",

overflow:"hidden",

border:"2px solid #d4af37",

zIndex:99

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

zIndex:2,

borderRadius:"50%",

width:"35px",

height:"35px",

background:"#d4af37",

border:"0",

fontSize:"22px"

};