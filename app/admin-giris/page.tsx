"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminGirisPage() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [sifre,setSifre] = useState("");
  const [hata,setHata] = useState("");
  const [loading,setLoading] = useState(false);



  async function girisYap(e:React.FormEvent){

    e.preventDefault();

    setLoading(true);
    setHata("");

    try{

      const supabase = createClient();


      const {error} = await supabase.auth.signInWithPassword({

        email,
        password:sifre

      });


      if(error){

        setHata(error.message);
        setLoading(false);
        return;

      }


      router.push("/admin");
      router.refresh();


    }catch{

      setHata(
        "Sistem bağlantı hatası oluştu."
      );

    }


    setLoading(false);

  }



return (

<div className="
min-h-screen
flex
items-center
justify-center
bg-[#050505]
overflow-hidden
relative
px-5
">


{/* GOLD GLOW */}

<div className="
absolute
w-[600px]
h-[600px]
bg-yellow-500
opacity-10
blur-[180px]
rounded-full
">
</div>



<div className="
absolute
top-0
left-0
w-full
h-full
bg-gradient-to-br
from-yellow-500/5
via-transparent
to-black
">
</div>





{/* CARD */}

<div className="
relative
w-full
max-w-md
rounded-[30px]
border
border-yellow-500/30
bg-white/[0.06]
backdrop-blur-2xl
shadow-[0_0_60px_rgba(212,175,55,0.15)]
p-10
">





{/* LOGO */}

<div className="
text-center
mb-10
">


<div className="
mx-auto
mb-5
w-20
h-20
rounded-full
border
border-yellow-500
flex
items-center
justify-center
shadow-[0_0_30px_rgba(212,175,55,.5)]
">


<span className="
text-yellow-400
text-3xl
font-black
">
H
</span>


</div>




<h1 className="
text-4xl
font-black
tracking-[8px]
text-yellow-400
">

HELIX

</h1>



<h2 className="
text-white
tracking-[5px]
text-lg
font-bold
mt-1
">

AKADEMİ

</h2>



<p className="
text-gray-400
mt-4
text-sm
">

Yönetici Paneli

</p>


</div>






<form
onSubmit={girisYap}
className="
space-y-6
"
>





<div>


<label className="
text-yellow-400
text-sm
font-bold
">

E-POSTA

</label>


<input

type="email"

value={email}

onChange={
e=>setEmail(e.target.value)
}

placeholder="admin@helixakademi.com"

className="
mt-2
w-full
rounded-2xl
bg-black/60
border
border-yellow-500/20
px-5
py-4
text-white
placeholder-gray-600
outline-none
transition
focus:border-yellow-400
focus:ring-2
focus:ring-yellow-400/20
"

/>


</div>






<div>


<label className="
text-yellow-400
text-sm
font-bold
">

ŞİFRE

</label>



<input

type="password"

value={sifre}

onChange={
e=>setSifre(e.target.value)
}

placeholder="••••••••"

className="
mt-2
w-full
rounded-2xl
bg-black/60
border
border-yellow-500/20
px-5
py-4
text-white
placeholder-gray-600
outline-none
transition
focus:border-yellow-400
focus:ring-2
focus:ring-yellow-400/20
"

/>


</div>






{
hata &&

<div className="
rounded-xl
bg-red-500/10
border
border-red-500/40
p-4
text-red-300
text-sm
">

{hata}

</div>

}






<button

disabled={loading}

className="
w-full
rounded-2xl
py-4
font-black
text-black
bg-gradient-to-r
from-yellow-500
via-yellow-300
to-yellow-600
shadow-[0_0_30px_rgba(212,175,55,.35)]
transition
hover:scale-[1.03]
active:scale-95
disabled:opacity-50
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





<div className="
text-center
mt-8
text-xs
text-gray-500
">

HELIX AKADEMİ © 2026

</div>




</div>


</div>


);

}