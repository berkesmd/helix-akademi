"use client";

import Link from "next/link";
import { useState } from "react";


export default function Navbar(){

const [open,setOpen]=useState(false);


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







<nav

className="desktop-menu"

style={desktop}

>


<Link href="/" style={navLink}>
Ana Sayfa
</Link>



<Link href="/egitimler" style={navLink}>
Eğitimler
</Link>




<Link href="/hakkimizda" style={navLink}>
Hakkımızda
</Link>




<Link href="/iletisim" style={navLink}>
İletişim
</Link>






<Link

href="/ogrenci-giris"

style={login}

>

ÖĞRENCİ GİRİŞ

</Link>







<Link

href="/kayit"

style={register}

>

KAYIT OL

</Link>




</nav>







<button


className="mobile-menu-btn"


style={hamburger}


onClick={()=>setOpen(!open)}


>

☰

</button>







</div>










{

open &&

<div style={mobileMenu}>


<Link

href="/"

style={mobileLink}

onClick={()=>setOpen(false)}

>

Ana Sayfa

</Link>





<Link

href="/egitimler"

style={mobileLink}

onClick={()=>setOpen(false)}

>

Eğitimler

</Link>





<Link

href="/hakkimizda"

style={mobileLink}

onClick={()=>setOpen(false)}

>

Hakkımızda

</Link>





<Link

href="/iletisim"

style={mobileLink}

onClick={()=>setOpen(false)}

>

İletişim

</Link>





<Link

href="/ogrenci-giris"

style={login}

onClick={()=>setOpen(false)}

>

ÖĞRENCİ GİRİŞ

</Link>





<Link

href="/kayit"

style={register}

onClick={()=>setOpen(false)}

>

KAYIT OL

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

backdropFilter:"blur(20px)",

borderBottom:

"1px solid rgba(212,175,55,.3)"

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

width:"170px",

height:"70px",

objectFit:"contain" as const,

filter:

"drop-shadow(0 0 25px rgba(212,175,55,.8))"

};






const desktop={

display:"flex",

alignItems:"center",

gap:"28px"

};






const navLink={

color:"#eee",

textDecoration:"none",

fontSize:"15px",

fontWeight:700

};






const login={

padding:"14px 25px",

borderRadius:"20px",

background:

"linear-gradient(135deg,#fff1a8,#d4af37,#8a6500)",

color:"#000",

fontWeight:900,

textDecoration:"none",

fontSize:"14px",

boxShadow:

"0 0 25px rgba(212,175,55,.6)"

};






const register={

padding:"14px 25px",

borderRadius:"20px",

border:"1px solid #d4af37",

color:"#d4af37",

fontWeight:900,

textDecoration:"none",

fontSize:"14px"

};






const hamburger={

display:"none",

background:"#050505",

border:"1px solid #d4af37",

color:"#d4af37",

fontSize:"28px",

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

"1px solid rgba(212,175,55,.4)"

};






const mobileLink={

color:"#fff",

fontSize:"18px",

fontWeight:700,

textDecoration:"none"

};