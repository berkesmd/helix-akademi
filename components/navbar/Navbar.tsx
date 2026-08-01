"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar(){

const [menu,setMenu]=useState(false);


return(

<header
className="
fixed
top-0
left-0
right-0
z-50
bg-black/80
backdrop-blur-xl
border-b
border-yellow-500/20
"
>


<div
className="
max-w-7xl
mx-auto
flex
items-center
justify-between
px-5
py-4
"
>


{/* LOGO */}

<Link
href="/"
className="flex items-center gap-3"
>


<img

src="/helix-logo.png"

alt="Helix"

className="
w-12
h-12
object-contain
"

/>


<div>


<h1
className="
text-white
font-black
tracking-[4px]
text-xl
"
>
HELIX
</h1>


<p
className="
text-yellow-400
text-[10px]
tracking-[5px]
"
>
AKADEMİ
</p>


</div>


</Link>







{/* DESKTOP MENU */}

<nav
className="
hidden
md:flex
items-center
gap-8
"
>


<Link
href="/"
className="
text-white
font-semibold
hover:text-yellow-400
"
>
Ana Sayfa
</Link>


<Link
href="/egitimler"
className="
text-white
font-semibold
hover:text-yellow-400
"
>
Eğitimler
</Link>


<Link
href="/hakkimizda"
className="
text-white
font-semibold
hover:text-yellow-400
"
>
Hakkımızda
</Link>


<Link
href="/iletisim"
className="
text-white
font-semibold
hover:text-yellow-400
"
>
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
px-7
py-3
rounded-2xl
shadow-lg
shadow-yellow-500/40
"

>

ÖĞRENCİ GİRİŞ

</Link>


</nav>







{/* MOBİL HAMBURGER */}

<button

onClick={()=>setMenu(!menu)}

className="
md:hidden
text-yellow-400
text-4xl
"

>

{menu ? "×":"☰"}

</button>




</div>







{/* MOBİL MENU */}


{

menu &&

<div

className="
md:hidden
bg-black
border-t
border-yellow-500/20
px-6
py-8
"

>


<div

className="
flex
flex-col
gap-6
"

>


<Link
href="/"
onClick={()=>setMenu(false)}
className="text-white text-lg"
>
Ana Sayfa
</Link>



<Link
href="/egitimler"
onClick={()=>setMenu(false)}
className="text-white text-lg"
>
Eğitimler
</Link>




<Link
href="/hakkimizda"
onClick={()=>setMenu(false)}
className="text-white text-lg"
>
Hakkımızda
</Link>




<Link
href="/iletisim"
onClick={()=>setMenu(false)}
className="text-white text-lg"
>
İletişim
</Link>




<Link

href="/ogrenci-giris"

className="
bg-yellow-500
text-black
text-center
font-bold
py-3
rounded-xl
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