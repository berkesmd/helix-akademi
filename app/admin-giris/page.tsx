"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminGirisPage(){

const router = useRouter();

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

setHata("Giriş bilgileri hatalı");

setLoading(false);

return;

}


router.push("/admin");

router.refresh();


}



return(

<div className="min-h-screen bg-black flex items-center justify-center px-5">


<div className="
w-full max-w-md
bg-white/10
backdrop-blur-xl
border border-yellow-500/40
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


<p className="text-white mt-2 text-xl">
AKADEMİ
</p>


<p className="text-gray-400 mt-4">
Yönetici Paneli
</p>


</div>



<form 
onSubmit={girisYap}
className="space-y-5"
>



<input

className="
w-full
bg-black/60
border
border-yellow-500/30
rounded-xl
p-4
text-white
outline-none
focus:border-yellow-400
"

placeholder="E-posta"

type="email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>



<input

className="
w-full
bg-black/60
border
border-yellow-500/30
rounded-xl
p-4
text-white
outline-none
focus:border-yellow-400
"

placeholder="Şifre"

type="password"

value={sifre}

onChange={(e)=>setSifre(e.target.value)}

/>




{
hata &&

<div className="
bg-red-500/20
border
border-red-500
text-red-300
p-3
rounded-xl
">

{hata}

</div>

}




<button

disabled={loading}

className="
w-full
bg-gradient-to-r
from-yellow-500
to-yellow-300
text-black
font-black
py-4
rounded-xl
hover:scale-105
transition
"

>


{
loading
?
"GİRİŞ YAPILIYOR..."
:
"ADMİN GİRİŞ"
}


</button>


</form>



<p className="
text-center
text-gray-500
mt-8
text-sm
">

HELIX AKADEMİ © 2026

</p>



</div>


</div>


)

}