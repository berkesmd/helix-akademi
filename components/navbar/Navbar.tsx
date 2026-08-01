"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar(){

const [open,setOpen]=useState(false);


return (

<header className="
fixed
top-0
left-0
right-0
z-50
bg-black/80
backdrop-blur-xl
border-b
border-yellow-500/20
">


<div className="
h-20
px-5
flex
items-center
justify-between
">


{/* LOGO */}

<Link href="/" className="flex items-center gap-3">


<img
src="/helix-logo.png"
className="
w-12
h-12
object-contain
"
/>


<div>

<h1 className="
text-white
font-black
text-xl
tracking-[5px]
">
HELIX
</h1>


<p className="
text-yellow-400
text-[10px]
tracking-[6px]
">
AKADEMİ
</p>


</div>


</Link>





{/* PC MENU */}

<nav className="
hidden
md:flex
items-center
gap-8
">


<Link href="/" className="text-white">
Ana Sayfa
</Link>


<Link href="/egitimler" className="text-white">
Eğitimler
</Link>


<Link href="/hakkimizda" className="text-white">
Hakkımızda
</Link>


<Link href="/iletisim" className="text-white">
İletişim
</Link>



<Link
href="/ogrenci-giris"
className="
bg-gradient-to-r
from-yellow-200
via-yellow-500
to-yellow-700
text-black
font-black
px-6
py-3
rounded-xl
"
>

ÖĞRENCİ GİRİŞİ

</Link>


</nav>





{/* MOBILE */}

<button

onClick={()=>setOpen(!open)}

className="
md:hidden
w-10
h-10
rounded-xl
border
border-yellow-500/40
flex
items-center
justify-center
"

>


<div className="space-y-1">

<span className="
block
w-6
h-[2px]
bg-yellow-400
"/>

<span className="
block
w-6
h-[2px]
bg-yellow-400
"/>

<span className="
block
w-6
h-[2px]
bg-yellow-400
"/>


</div>


</button>


</div>





{/* MOBIL MENU YOK */}

</header>


)


}