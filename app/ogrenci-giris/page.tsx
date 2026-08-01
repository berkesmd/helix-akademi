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


<div className="
min-h-screen
bg-black
flex
items-center
justify-center
px-5
overflow-hidden
">



<div className="
absolute
w-96
h-96
bg-yellow-500/20
blur-3xl
rounded-full
">
</div>





<div className="
relative
w-full
max-w-md
bg-white/10
backdrop-blur-xl
border
border-yellow-500/40
rounded-3xl
p-10
shadow-2xl
">





<div className="text-center mb-8">


<h1 className="
text-5xl
font-black
tracking-widest
text-yellow-400
">

HELIX

</h1>


<h2 className="
text-white
text-xl
mt-2
tracking-widest
">

AKADEMİ

</h2>



<p className="
text-gray-400
mt-4
">

Öğrenci Paneli

</p>



</div>







<form
onSubmit={girisYap}
className="space-y-5"
>



<div>


<label className="
text-gray-300
text-sm
">

E-POSTA

</label>


<input

type="email"

placeholder="mail@example.com"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="
mt-2
w-full
bg-black/60
border
border-yellow-500/30
rounded-xl
p-4
text-white
outline-none
focus:border-yellow-400
transition
"

/>


</div>






<div>


<label className="
text-gray-300
text-sm
">

ŞİFRE

</label>


<input


type="password"

placeholder="••••••••"

value={sifre}

onChange={(e)=>setSifre(e.target.value)}

className="
mt-2
w-full
bg-black/60
border
border-yellow-500/30
rounded-xl
p-4
text-white
outline-none
focus:border-yellow-400
transition
"

/>



</div>







{
hata &&

<div className="
bg-red-500/20
border
border-red-500/50
text-red-300
rounded-xl
p-3
text-center
">

{hata}

</div>

}







<button


disabled={loading}


className="
w-full
mt-5
bg-gradient-to-r
from-yellow-500
to-yellow-300
text-black
font-black
py-4
rounded-xl
hover:scale-105
transition
shadow-lg
"


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







<div className="
mt-8
text-center
text-gray-500
text-sm
">

HELIX AKADEMİ © 2026

</div>






</div>


</div>


)


}