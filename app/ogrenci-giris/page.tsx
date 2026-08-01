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

setHata("E-posta veya şifre hatalı");

setLoading(false);

return;

}


window.location.href="/ogrenci";


}



return(

<div className="login-page">


<div className="login-box">


<div className="logo">

HELIX

</div>


<div className="academy">

AKADEMİ

</div>


<p className="desc">

Öğrenci Paneli

</p>



<form onSubmit={girisYap}>


<input

className="login-input"

placeholder="E-posta"

type="email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>



<input

className="login-input"

placeholder="Şifre"

type="password"

value={sifre}

onChange={(e)=>setSifre(e.target.value)}

/>




{
hata &&

<div className="error">

{hata}

</div>

}



<button className="login-button">

{
loading
?
"GİRİŞ YAPILIYOR..."
:
"ÖĞRENCİ GİRİŞ"
}


</button>



</form>


<div className="footer">

HELIX AKADEMİ © 2026

</div>


</div>


</div>

)

}