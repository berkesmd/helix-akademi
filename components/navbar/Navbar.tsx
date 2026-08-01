"use client";

import Link from "next/link";
import { useState } from "react";


export default function Navbar(){

const [open,setOpen]=useState(false);



return(

<header className="
fixed
top-0
left-0
right-0
z-[999]
bg-black/80
backdrop-blur-xl
border-b
border-yellow-500/20
">


<div className="
max-w-7xl
mx-auto
h-20
px-6
flex
items-center
justify-between
">





{/* LOGO */}

<Link 
href="/"
onClick={()=>setOpen(false)}
className="flex items-center gap-3"
>


<div className="
w-12
h-12
rounded-xl
flex
items-center
justify-center
bg-yellow-500/10
border
border-yellow-500/40
shadow-lg
shadow-yellow-500/20
">


<span className="
text-3xl
font-black
text-yellow-400
">

H

</span>


</div>



<div>


<h1 className="
text-white
font-black
text-xl
tracking-[4px]
">

HELIX

</h1>


<p className="
text-yellow-400
text-[10px]
tracking-[5px]
">

AKADEMİ

</p>


</div>


</Link>









{/* MASAÜSTÜ MENÜ */}


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
hover:text-yellow-400
transition
"
>
İletişim
</Link>



</nav>








{/* PC BUTON */}


<div className="
hidden
md:flex
gap-3
">


<Link

href="/ogrenci-giris"

className="
px-6
py-3
rounded-xl
bg-yellow-500
text-black
font-bold
shadow-lg
shadow-yellow-500/30
hover:bg-yellow-400
transition
"

>

ÖĞRENCİ GİRİŞ

</Link>


</div>










{/* HAMBURGER */}



<button

onClick={()=>setOpen(!open)}

className="
md:hidden
w-12
h-12
rounded-xl
border
border-yellow-500/40
flex
flex-col
items-center
justify-center
gap-1.5
bg-black
"

>


<span className={`
block
w-6
h-0.5
bg-yellow-400
transition

${open ? "rotate-45 translate-y-2":""}

`}/>


<span className={`
block
w-6
h-0.5
bg-yellow-400
transition

${open ? "opacity-0":""}

`}/>


<span className={`
block
w-6
h-0.5
bg-yellow-400
transition

${open ? "-rotate-45 -translate-y-2":""}

`}/>



</button>





</div>









{/* MOBİL MENÜ */}



{

open &&

<div className="
md:hidden
bg-black
border-t
border-yellow-500/20
px-6
py-8
">


<nav className="
flex
flex-col
gap-6
">


<Link

onClick={()=>setOpen(false)}

href="/"

className="
text-white
text-lg
font-semibold
"

>

Ana Sayfa

</Link>



<Link

onClick={()=>setOpen(false)}

href="/egitimler"

className="
text-gray-300
text-lg
font-semibold
"

>

Eğitimler

</Link>



<Link

onClick={()=>setOpen(false)}

href="/hakkimizda"

className="
text-gray-300
text-lg
font-semibold
"

>

Hakkımızda

</Link>



<Link

onClick={()=>setOpen(false)}

href="/iletisim"

className="
text-gray-300
text-lg
font-semibold
"

>

İletişim

</Link>





<Link

onClick={()=>setOpen(false)}

href="/ogrenci-giris"

className="
mt-3
text-center
rounded-xl
py-4
bg-gradient-to-r
from-yellow-200
via-yellow-500
to-yellow-700
text-black
font-black
tracking-widest
"

>

ÖĞRENCİ GİRİŞİ

</Link>



</nav>


</div>


}



</header>


)

}