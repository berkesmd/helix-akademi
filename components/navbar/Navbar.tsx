"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {

  const [menuOpen,setMenuOpen]=useState(false);


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
mx-auto
flex
h-20
max-w-7xl
items-center
justify-between
px-5
">


{/* LOGO */}

<Link
href="/"
className="
flex
items-center
gap-3
"
>


<img

src="/helix-logo.png"

alt="Helix"

className="
h-12
w-12
object-contain
"

/>


<div>


<div className="
text-xl
font-black
tracking-[5px]
text-white
">

HELIX

</div>


<div className="
text-[11px]
tracking-[7px]
text-yellow-500
">

AKADEMİ

</div>


</div>


</Link>






{/* DESKTOP MENU */}

<nav className="
hidden
md:flex
items-center
gap-8
">


<Link
href="/"
className="
text-white
font-semibold
hover:text-yellow-400
transition
"
>

Ana Sayfa

</Link>


<Link
href="/egitimler"
className="
text-gray-300
font-semibold
hover:text-yellow-400
transition
"
>

Eğitimler

</Link>


<Link
href="/hakkimizda"
className="
text-gray-300
font-semibold
hover:text-yellow-400
transition
"
>

Hakkımızda

</Link>


<Link
href="/iletisim"
className="
text-gray-300
font-semibold
hover:text-yellow-400
transition
"
>

İletişim

</Link>





<Link
href="/ogrenci-giris"
className="
rounded-xl
px-6
py-3
font-black
text-black
bg-gradient-to-r
from-yellow-200
via-yellow-500
to-yellow-700
shadow-lg
shadow-yellow-500/30
"
>

ÖĞRENCİ GİRİŞİ

</Link>


</nav>







{/* MOBİL HAMBURGER */}

<button

onClick={()=>setMenuOpen(!menuOpen)}

className="
md:hidden
border
border-yellow-500/40
rounded-xl
p-3
"

>


<div className="
space-y-1.5
">


<span className="
block
w-6
h-0.5
bg-yellow-400
"/>


<span className="
block
w-6
h-0.5
bg-yellow-400
"/>


<span className="
block
w-6
h-0.5
bg-yellow-400
"/>


</div>


</button>



</div>









{/* MOBİL MENU */}

{

menuOpen && (


<div

className="
md:hidden
absolute
top-20
left-0
right-0
bg-black/95
border-t
border-yellow-500/30
p-6
"

>


<Link

href="/ogrenci-giris"

onClick={()=>setMenuOpen(false)}

className="
block
w-full
text-center
rounded-xl
py-4
font-black
tracking-widest
text-black
bg-gradient-to-r
from-yellow-200
via-yellow-500
to-yellow-700
shadow-xl
shadow-yellow-500/30
"

>

ÖĞRENCİ GİRİŞİ

</Link>



</div>


)

}



</header>

  );

}