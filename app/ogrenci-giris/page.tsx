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

<div style={{

minHeight:"100vh",
background:"#050505",
display:"flex",
alignItems:"center",
justifyContent:"center",
position:"relative",
overflow:"hidden",
fontFamily:"Arial"


}}>


<div style={{

position:"absolute",
width:"600px",
height:"600px",
background:"#d4af37",
opacity:.15,
filter:"blur(120px)",
borderRadius:"50%"


}}/>




<div style={{

width:"420px",
padding:"45px",
background:"rgba(255,255,255,0.08)",
border:"1px solid rgba(212,175,55,.5)",
borderRadius:"30px",
backdropFilter:"blur(20px)",
boxShadow:"0 30px 80px black",
zIndex:2


}}>



<div style={{

textAlign:"center"

}}>


<h1 style={{

fontSize:"60px",
fontWeight:900,
letterSpacing:"15px",
color:"#d4af37",
margin:0


}}>

HELIX

</h1>


<h2 style={{

color:"white",
letterSpacing:"8px",
marginTop:"10px"

}}>

AKADEMİ

</h2>


<p style={{

color:"#aaa",
marginTop:"25px"

}}>

Öğrenci Giriş Paneli

</p>


</div>






<form onSubmit={girisYap}>


<input

style={{

width:"100%",
boxSizing:"border-box",
padding:"16px",
marginTop:"20px",
borderRadius:"15px",
background:"#111",
border:"1px solid #d4af37",
color:"white",
fontSize:"16px"

}}

placeholder="E-Posta"

type="email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>





<input

style={{

width:"100%",
boxSizing:"border-box",
padding:"16px",
marginTop:"15px",
borderRadius:"15px",
background:"#111",
border:"1px solid #d4af37",
color:"white",
fontSize:"16px"

}}

placeholder="Şifre"

type="password"

value={sifre}

onChange={(e)=>setSifre(e.target.value)}

/>




{

hata &&

<p style={{

color:"#ff7777",
textAlign:"center"

}}>

{hata}

</p>


}




<button

style={{

width:"100%",
marginTop:"25px",
padding:"16px",
borderRadius:"15px",
border:"0",
background:"linear-gradient(90deg,#d4af37,#ffe88a)",
fontWeight:900,
fontSize:"16px",
cursor:"pointer"

}}

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



<p style={{

color:"#777",
textAlign:"center",
marginTop:"35px",
fontSize:"13px"

}}>

HELIX AKADEMİ © 2026

</p>




</div>


</div>


)

}