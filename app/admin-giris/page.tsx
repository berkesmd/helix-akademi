"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function AdminGirisPage(){

const router = useRouter();

const [email,setEmail] = useState("");
const [sifre,setSifre] = useState("");
const [hata,setHata] = useState("");
const [loading,setLoading] = useState(false);



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

setHata("Giriş bilgileri hatalı");

setLoading(false);

return;

}


router.push("/admin");
router.refresh();

}



return(

<div style={page}>


<div style={goldGlow}></div>



<div style={card}>


<div style={logoArea}>


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

Yönetim Paneline

<br/>

<span>

Hoş Geldiniz

</span>

</h3>



<p style={desc}>

Helix Akademi Yönetim Merkezi

</p>



</div>







<form

onSubmit={girisYap}

style={form}

>



<input

style={input}

placeholder="E-posta"

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

<div style={error}>

{hata}

</div>

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

"YÖNETİME GİRİŞ"

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

padding:"30px",

background:

"radial-gradient(circle at top,#3b2800,#050505 60%)",

position:"relative" as const,

overflow:"hidden"

};



const goldGlow={

position:"absolute" as const,

width:"500px",

height:"500px",

background:"#d4af37",

filter:"blur(180px)",

opacity:.18

};



const card={

position:"relative" as const,

width:"100%",

maxWidth:"450px",

padding:"45px 35px",

borderRadius:"40px",

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(212,175,55,.5)",

backdropFilter:"blur(20px)",

boxShadow:

"0 0 60px rgba(212,175,55,.25)"

};



const logoArea={

textAlign:"center" as const

};



const logo={

width:"130px",

height:"130px",

objectFit:"contain" as const,

filter:

"drop-shadow(0 0 35px rgba(212,175,55,.7))"

};



const helix={

marginTop:"20px",

fontSize:"55px",

letterSpacing:"12px",

fontWeight:900,

color:"#d4af37"

};



const akademi={

fontSize:"25px",

letterSpacing:"8px",

color:"#ffe58a",

fontWeight:900

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

boxShadow:

"0 0 25px rgba(212,175,55,.5)"

};



const welcome={

marginTop:"35px",

fontSize:"28px",

fontWeight:900,

color:"white",

lineHeight:"1.3"

};



const welcomeSpan={

color:"#d4af37"

};



const desc={

marginTop:"15px",

color:"#bbb",

fontSize:"16px"

};



const form={

marginTop:"35px"

};



const input={

width:"100%",

padding:"17px",

marginBottom:"18px",

borderRadius:"18px",

background:"#050505",

border:"1px solid rgba(212,175,55,.5)",

color:"white",

outline:"none",

fontSize:"16px"

};



const button={

width:"100%",

padding:"18px",

borderRadius:"20px",

border:"0",

background:

"linear-gradient(135deg,#fff0a0,#d4af37)",

fontWeight:900,

fontSize:"17px",

cursor:"pointer",

boxShadow:

"0 0 30px rgba(212,175,55,.5)"

};



const error={

padding:"12px",

marginBottom:"15px",

borderRadius:"15px",

background:"rgba(255,0,0,.15)",

border:"1px solid red",

color:"#ffaaaa",

textAlign:"center" as const

};



const footer={

marginTop:"35px",

textAlign:"center" as const,

color:"#777",

fontSize:"13px"

};