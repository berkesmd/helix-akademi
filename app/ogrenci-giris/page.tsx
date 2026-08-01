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



if(!supabase){

setHata("Supabase bağlantısı yok");

setLoading(false);

return;

}



const {data,error}=await supabase.auth.signInWithPassword({

email,

password:sifre

});



console.log(data);
console.log(error);



if(error){

setHata(error.message);

setLoading(false);

return;

}



window.location.href="/ogrenci";



}




return(

<div className="min-h-screen bg-black flex items-center justify-center">


<div className="bg-white p-8 rounded-xl">


<h1 className="text-3xl font-bold mb-5">

Öğrenci Giriş

</h1>


<form onSubmit={girisYap}>


<input

className="border p-3 block mb-3"

placeholder="E-posta"

value={email}

onChange={
e=>setEmail(e.target.value)
}

/>



<input

className="border p-3 block mb-3"

type="password"

placeholder="Şifre"

value={sifre}

onChange={
e=>setSifre(e.target.value)
}

/>



{
hata &&
<p className="text-red-600 mb-3">
{hata}
</p>
}



<button

disabled={loading}

className="bg-black text-white px-5 py-3"

>

{
loading
?
"Giriş yapılıyor..."
:
"Giriş Yap"
}

</button>


</form>


</div>


</div>

)

}