"use client";

import Link from "next/link";
import { useState } from "react";


export default function Navbar(){

const [menuOpen,setMenuOpen]=useState(false);



return(

<header style={header}>


<div style={container}>



<Link href="/" style={brand}>


<img

src="/helix-logo.png"

alt="Helix Akademi"

style={logo}

/>


</Link>





<nav style={desktopNav}>


<Link href="/" style={link}>
Ana Sayfa
</Link>


<Link href="/egitimler" style={link}>
Eğitimler
</Link>


<Link href="/hakkimizda" style={link}>
Hakkımızda
</Link>


<Link href="/iletisim" style={link}>
İletişim
</Link>



<Link href="/ogrenci-giris" style={loginButton}>
ÖĞRENCİ GİRİŞ
</Link>


</nav>







<button

style={menuButton}

onClick={()=>setMenuOpen(!menuOpen)}

>

☰

</button>





</div>









{

menuOpen &&

<div style={mobileMenu}>


<Link

href="/"

style={mobileLink}

onClick={()=>setMenuOpen(false)}

>

Ana Sayfa

</Link>




<Link

href="/egitimler"

style={mobileLink}

onClick={()=>setMenuOpen(false)}

>

Eğitimler

</Link>





<Link

href="/hakkimizda"

style={mobileLink}

onClick={()=>setMenuOpen(false)}

>

Hakkımızda

</Link>





<Link

href="/iletisim"

style={mobileLink}

onClick={()=>setMenuOpen(false)}

>

İletişim

</Link>





<Link

href="/ogrenci-giris"

style={loginButton}

onClick={()=>setMenuOpen(false)}

>

ÖĞRENCİ GİRİŞ

</Link>




</div>


}





</header>


)

}








const header={

position:"fixed" as const,

top:0,

left:0,

right:0,

height:"85px",

zIndex:999,

background:

"rgba(0,0,0,.88)",

backdropFilter:

"blur(20px)",

borderBottom:

"1px solid rgba(212,175,55,.25)"

};







const container={

height:"100%",

display:"flex",

alignItems:"center",

justifyContent:"space-between",

padding:"0 40px"

};







const brand={

display:"flex",

alignItems:"center",

textDecoration:"none"

};







const logo={

width:"160px",

height:"65px",

objectFit:"contain" as const,

filter:

"drop-shadow(0 0 20px rgba(212,175,55,.8))"

};







const desktopNav={

display:"flex",

alignItems:"center",

gap:"35px"

};







const link={

color:"#eee",

textDecoration:"none",

fontSize:"15px",

fontWeight:700,

transition:"0.3s"

};







const loginButton={

padding:"14px 30px",

borderRadius:"20px",

background:

"linear-gradient(135deg,#fff1a8,#d4af37,#8a6500)",

color:"#000",

fontWeight:900,

textDecoration:"none",

letterSpacing:"1px",

boxShadow:

"0 0 30px rgba(212,175,55,.7)"

};







const menuButton={

display:"none",

fontSize:"30px",

color:"#d4af37",

background:"transparent",

border:"1px solid #d4af37",

borderRadius:"12px",

padding:"5px 12px",

cursor:"pointer"

};







const mobileMenu={

position:"absolute" as const,

top:"85px",

left:0,

right:0,

background:"#050505",

padding:"30px",

display:"flex",

flexDirection:"column" as const,

gap:"25px",

borderBottom:

"1px solid rgba(212,175,55,.3)"

};







const mobileLink={

color:"#fff",

fontSize:"18px",

fontWeight:700,

textDecoration:"none"

};