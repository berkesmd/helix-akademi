"use client";

import {useState} from "react";
import Image from "next/image";
import {createClient} from "@/lib/supabase/client";
import {useRouter} from "next/navigation";

export default function AdminGirisPage(){

const router=useRouter();

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

<div className="min-h-screen bg-black flex items-center justify-center p-5 relative overflow-hidden">

<div className="absolute inset-0 bg-gradient-to-br from-yellow-900/40 via-black to-black"/>


<div className="
relative
w-full
max-w-md
rounded-[40px]
p-8
bg-black/70
backdrop-blur-xl
border
border-yellow-500/50
shadow-[0_0_80px_rgba(212,175,55,.25)]
">


<div className="text-center">


<div className="
mx-auto
w-32
h-32
rounded-full
border
border-yellow-500
p-3
shadow-[0_0_40px_rgba(212,175,55,.6)]
">

<Image
src="/helix-logo.png"
alt="Helix Akademi"
width={120}
height={120}
className="rounded-full"
/>

</div>



<h1 className="
mt-6
text-5xl
font-black
tracking-[8px]
bg-gradient-to-r
from-yellow-200
via-yellow-500
to-yellow-200
bg-clip-text
text-transparent
">
HELIX
</h1>


<h2 className="
text-yellow-400
text-xl
font-black
tracking-[6px]
">
AKADEMİ
</h2>


<div className="
inline-block
mt-5
px-6
py-2
rounded-full
border
border-yellow-500
text-yellow-300
tracking-[5px]
font-bold
shadow-[0_0_20px_rgba(212,175,55,.5)]
">
SINCE 2020
</div>



<h3 className="
mt-8
text-white
text-2xl
font-black
">
Yönetim Paneline
</h3>

<h3 className="
text-yellow-400
text-2xl
font-black
">
Hoş Geldiniz
</h3>


<p className="text-gray-400 mt-3">
Helix Akademi Yönetim Merkezi
</p>

</div>



<form onSubmit={girisYap} className="mt-8 space-y-5">


<input
className="
w-full
rounded-2xl
p-4
bg-black
border
border-yellow-500/50
text-white
outline-none
focus:border-yellow-300
"
placeholder="E-posta"
type="email"
value={email}
onChange={e=>setEmail(e.target.value)}
/>


<input
className="
w-full
rounded-2xl
p-4
bg-black
border
border-yellow-500/50
text-white
outline-none
focus:border-yellow-300
"
placeholder="Şifre"
type="password"
value={sifre}
onChange={e=>setSifre(e.target.value)}
/>



{hata &&
<div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-xl text-center">
{hata}
</div>
}



<button
disabled={loading}
className="
w-full
py-4
rounded-2xl
font-black
text-black
bg-gradient-to-r
from-yellow-600
via-yellow-300
to-yellow-600
shadow-[0_0_35px_rgba(212,175,55,.5)]
hover:scale-105
transition
"
>

{loading ? "GİRİŞ YAPILIYOR..." : "YÖNETİME GİRİŞ"}

</button>


</form>


<p className="text-center text-gray-500 mt-8 text-sm">
HELIX AKADEMİ © 2026
</p>


</div>

</div>

)

}