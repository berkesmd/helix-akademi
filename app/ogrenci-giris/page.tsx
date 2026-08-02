"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";


export default function OgrenciGirisPage(){

const [email,setEmail]=useState("");
const [sifre,setSifre]=useState("");
const [hata,setHata]=useState("");
const [loading,setLoading]=useState(false);



async function girisYap(e:React.FormEvent){

e.preventDefault();

setLoading(true);
setHata("");

const supabase=createClient();


const {error}=await supabase.auth.signInWithPassword({

email,
password:sifre

});


if(error){

setHata("E-posta veya şifre yanlış");

setLoading(false);

return;

}


window.location.href="/ogrenci";

}




return(

<div style={page}>


<div style={glow}></div>



<div style={card}>


<div style={center}>


<img

src="/helix-logo.png"

alt="Helix Akademi"

style={logo}

/>




<h1 style={helix}>

HELIX

</h1>



<h2 style={akademi}>

AKADEMİ

</h2>




<div style={since}>

✦ SINCE 2020 ✦

</div>





<h3 style={welcome}>

Öğrenci Paneline

<br/>

<span>

Hoş Geldiniz

</span>

</h3>




<p style={desc}>

Eğitimlerinize devam edin,

<br/>

geleceğinizi şekillendirin.

</p>



</div>







<form onSubmit={girisYap}>


<input

style={input}

placeholder="E-Posta"

type="email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>





<input

style={input}

placeholder="Şifre"

type="password"

value={sifre}

onChange={(e)=>setSifre(e.target.value)}

/>





{

hata &&

<p style={error}>

{hata}

</p>

}







<button

style={button}

disabled={loading}

>


{

loading

?

"GİRİŞ YAPILIYOR..."

:

"ÖĞRENCİ GİRİŞ"

}


</button>



</form>







<p style={footer}>

HELIX AKADEMİ © 2026

</p>




</div>


</div>

)

}






const page={

minHeight:"100vh",

display:"flex",

alignItems:"center",

justifyContent:"center",

padding:"20px",

background:

"radial-gradient(circle at top,#3b2800,#050505 60%)",

position:"relative" as const,

overflow:"hidden"

};




const glow={

position:"absolute" as const,

width:"600px",

height:"600px",

background:"#d4af37",

filter:"blur(180px)",

opacity:.18,

borderRadius:"50%"

};




const card={

width:"100%",

maxWidth:"420px",

padding:"45px",

borderRadius:"40px",

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(212,175,55,.5)",

backdropFilter:"blur(20px)",

boxShadow:"0 30px 80px rgba(0,0,0,.8)"

};




const center={

textAlign:"center" as const

};




const logo={

width:"130px",

height:"130px",

objectFit:"contain" as const,

filter:"drop-shadow(0 0 35px rgba(212,175,55,.7))"

};




const helix={

fontSize:"55px",

letterSpacing:"12px",

fontWeight:900,

color:"#d4af37",

marginTop:"15px"

};




const akademi={

color:"#fff0a0",

letterSpacing:"8px",

fontSize:"25px"

};




const since={

display:"inline-block",

marginTop:"25px",

padding:"10px 25px",

borderRadius:"30px",

border:"1px solid #d4af37",

color:"#fff0a0",

fontWeight:900,

letterSpacing:"4px",

boxShadow:"0 0 25px rgba(212,175,55,.5)"

};




const welcome={

marginTop:"35px",

color:"white",

fontSize:"28px",

fontWeight:900,

lineHeight:"1.3"

};




const desc={

color:"#bbb",

marginTop:"15px",

lineHeight:"1.7"

};




const input={

width:"100%",

boxSizing:"border-box" as const,

padding:"17px",

marginTop:"18px",

borderRadius:"18px",

background:"#050505",

border:"1px solid rgba(212,175,55,.5)",

color:"white",

fontSize:"16px",

outline:"none"

};




const button={

width:"100%",

marginTop:"25px",

padding:"18px",

borderRadius:"20px",

border:"0",

background:"linear-gradient(135deg,#fff0a0,#d4af37)",

fontWeight:900,

fontSize:"17px",

cursor:"pointer",

boxShadow:"0 0 30px rgba(212,175,55,.5)"

};




const error={

color:"#ff9999",

textAlign:"center" as const,

marginTop:"15px"

};




const footer={

color:"#777",

textAlign:"center" as const,

marginTop:"35px",

fontSize:"13px"

};