"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar(){

const [open,setOpen]=useState(false);


return(

<header className="fixed top-0 left-0 w-full z-50">


<div className="
h-20
px-5
flex
items-center
justify-between
bg-black/90
backdrop-blur-xl
border-b
border-yellow-500/20
">


{/* LOGO */}

<Link href="/" className="flex items-center gap-3">


<img
src="/helix-logo.png"
className="w-10 h-10 object-contain"
/>


<div>

<h1 className="
text-white
font-black
tracking-[4px]
text-xl
">
HELIX
</h1>


<p className="
text-yellow-400
text-[9px]
tracking-[5px]
">
AKADEMİ
</p>


</div>


</Link>





{/* DESKTOP */}

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
bg-yellow-500
text-black
px-6
py-3
rounded-xl
font-bold
"

>
ÖĞRENCİ GİRİŞ
</Link>


</nav>






{/* MOBILE */}

<button

className="
md:hidden
text-yellow-400
text-3xl
"

onClick={()=>setOpen(!open)}

>

☰

</button>


</div>






{
open &&

<div

className="
md:hidden
absolute
top-20
right-4
w-64
bg-black
border
border-yellow-500/30
rounded-2xl
p-6
shadow-xl
"

>


<div className="
flex
flex-col
gap-5
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
bg-yellow-500
text-black
text-center
py-3
rounded-xl
font-bold
"

>
ÖĞRENCİ GİRİŞ
</Link>


</div>


</div>


}


</header>

)

}