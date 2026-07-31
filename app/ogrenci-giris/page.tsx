"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";


export default function OgrenciGiris(){


const router=useRouter();

const supabase=createClient();



const [email,setEmail]=useState("");

const [sifre,setSifre]=useState("");

const [hata,setHata]=useState("");

const [loading,setLoading]=useState(false);







async function giris(){


setLoading(true);

setHata("");



const {error}=await supabase.auth.signInWithPassword({

email,

password:sifre

});



if(error){

setHata("Giriş bilgileri hatalı.");

setLoading(false);

return;

}



router.push("/ogrenci");



}









return(


<main style={page}>


<div style={box}>


<div style={logoBox}>


<Image

src="/helix-logo.png"

alt="Helix Akademi"

width={170}

height={170}

style={logo}

/>


</div>







<h1 style={title}>

HELIX AKADEMİ

</h1>




<p style={subtitle}>

ÖĞRENCİ PANELİ

</p>









<input

style={input}

placeholder="E-POSTA ADRESİ"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>









<input

style={input}

placeholder="ŞİFRE"

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

onClick={giris}

disabled={loading}

>


{

loading

?

"GİRİŞ YAPILIYOR..."

:

"GİRİŞ YAP"

}



</button>









<p

style={forgot}

onClick={()=>router.push("/sifre-yenile")}

>

ŞİFREMİ UNUTTUM

</p>








</div>


</main>


)

}









const page={

minHeight:"100vh",

background:

"radial-gradient(circle at top,#4a3500,#050505 70%)",

display:"flex",

alignItems:"center",

justifyContent:"center",

color:"white",

padding:"20px"

};








const box={

width:"420px",

padding:"50px",

borderRadius:"30px",

background:

"rgba(255,255,255,.07)",

border:

"1px solid rgba(212,175,55,.4)",

backdropFilter:"blur(20px)",

textAlign:"center" as const,

display:"flex",

flexDirection:"column" as const,

alignItems:"center",

boxShadow:

"0 0 70px rgba(212,175,55,.25)"

};








const logoBox={

width:"100%",

display:"flex",

justifyContent:"center",

alignItems:"center",

marginBottom:"20px"

};








const logo={

filter:

"drop-shadow(0 0 45px #d4af37)"

};








const title={

fontSize:"38px",

fontWeight:900,

letterSpacing:"5px",

margin:"10px",

background:

"linear-gradient(180deg,#fff3b0,#d4af37,#8a6500)",

WebkitBackgroundClip:"text",

WebkitTextFillColor:"transparent",

textShadow:

"0 0 25px rgba(212,175,55,.7)"

};








const subtitle={

color:"#d4af37",

fontWeight:900,

letterSpacing:"4px",

marginBottom:"25px"

};








const input={

width:"100%",

boxSizing:"border-box" as const,

padding:"18px",

marginTop:"18px",

borderRadius:"15px",

border:

"1px solid rgba(212,175,55,.4)",

background:"#050505",

color:"white",

fontSize:"15px",

fontWeight:700,

outline:"none"

};








const button={

width:"100%",

marginTop:"30px",

padding:"18px",

borderRadius:"18px",

border:"0",

background:

"linear-gradient(135deg,#fff1a6,#d4af37,#8a6500)",

fontSize:"18px",

fontWeight:900,

letterSpacing:"3px",

cursor:"pointer",

boxShadow:

"0 0 35px rgba(212,175,55,.6)"

};








const error={

color:"#ff7777",

marginTop:"20px",

fontWeight:700

};








const forgot={

marginTop:"25px",

color:"#d4af37",

fontWeight:900,

cursor:"pointer",

letterSpacing:"1px"

};