"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function Navbar(){

const [open,setOpen]=useState(false);


return(

<header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-yellow-500/20">


<div className="max-w-7xl mx-auto h-20 px-5 flex items-center justify-between">


{/* LOGO */}

<Link href="/" className="flex items-center gap-3">

<Image

src="/helix-logo.png"

alt="Helix Akademi"

width={55}

height={55}

/>


<div>

<h1 className="text-white font-black tracking-widest text-lg">

HELIX

</h1>


<p className="text-yellow-400 text-[10px] tracking-[5px]">

AKADEMİ

</p>


</div>


</Link>





{/* DESKTOP */}

<nav className="hidden md:flex items-center gap-8">


<Link href="/" className="text-white hover:text-yellow-400">

Ana Sayfa

</Link>


<Link href="/egitimler" className="text-gray-300 hover:text-yellow-400">

Eğitimler

</Link>


<Link href="/hakkimizda" className="text-gray-300 hover:text-yellow-400">

Hakkımızda

</Link>


<Link href="/iletisim" className="text-gray-300 hover:text-yellow-400">

İletişim

</Link>


<Link

href="/ogrenci-giris"

className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 text-black font-bold px-6 py-3 rounded-xl shadow-lg"

>

ÖĞRENCİ GİRİŞ

</Link>


</nav>






{/* HAMBURGER */}


<button

onClick={()=>setOpen(!open)}

className="md:hidden flex flex-col gap-1.5 p-3 border border-yellow-500/40 rounded-xl"

>


<span className="w-7 h-0.5 bg-yellow-400"></span>

<span className="w-7 h-0.5 bg-yellow-400"></span>

<span className="w-7 h-0.5 bg-yellow-400"></span>


</button>




</div>







{/* MOBİL MENÜ */}


{

open &&

<div className="md:hidden bg-black border-t border-yellow-500/20 px-6 py-6">


<div className="flex flex-col gap-5">


<Link

onClick={()=>setOpen(false)}

href="/"

className="text-white"

>

Ana Sayfa

</Link>



<Link

onClick={()=>setOpen(false)}

href="/egitimler"

className="text-white"

>

Eğitimler

</Link>



<Link

onClick={()=>setOpen(false)}

href="/hakkimizda"

className="text-white"

>

Hakkımızda

</Link>



<Link

onClick={()=>setOpen(false)}

href="/iletisim"

className="text-white"

>

İletişim

</Link>



<Link

onClick={()=>setOpen(false)}

href="/ogrenci-giris"

className="bg-yellow-500 text-black text-center py-3 rounded-xl font-bold"

>

ÖĞRENCİ GİRİŞ

</Link>


</div>


</div>

}


</header>


)

}