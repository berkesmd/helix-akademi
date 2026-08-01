"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {

const [menu,setMenu]=useState(false);


return (

<header style={header}>


<div style={wrapper}>


<Link href="/" style={brand}>


<div style={logoBox}>
H
</div>


<div>

<div style={logoText}>
HELIX
</div>


<div style={academy}>
AKADEMİ
</div>


</div>


</Link>






<nav style={desktopMenu}>


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



<Link href="/ogrenci-giris" style={button}>
ÖĞRENCİ GİRİŞ
</Link>



</nav>







<button

style={hamburger}

onClick={()=>setMenu(!menu)}

>

☰

</button>





</div>





{

menu &&

<div style={mobileMenu}>


<Link href="/" style={mobileLink}>
Ana Sayfa
</Link>


<Link href="/egitimler" style={mobileLink}>
Eğitimler
</Link>


<Link href="/hakkimizda" style={mobileLink}>
Hakkımızda
</Link>


<Link href="/iletisim" style={mobileLink}>
İletişim
</Link>


<Link href="/ogrenci-giris" style={button}>
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

background:"rgba(0,0,0,0.85)",

backdropFilter:"blur(20px)",

borderBottom:"1px solid rgba(212,175,55,.3)"

};




const wrapper={

height:"100%",

display:"flex",

alignItems:"center",

justifyContent:"space-between",

padding:"0 40px"

};




const brand={

display:"flex",

alignItems:"center",

gap:"15px",

textDecoration:"none"

};




const logoBox={

width:"45px",

height:"45px",

borderRadius:"15px",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"25px",

fontWeight:900,

color:"#d4af37",

border:"1px solid #d4af37",

background:"rgba(212,175,55,.15)",

boxShadow:"0 0 25px rgba(212,175,55,.5)"

};




const logoText={

color:"#fff",

fontSize:"20px",

fontWeight:900,

letterSpacing:"5px"

};




const academy={

fontSize:"10px",

letterSpacing:"6px",

color:"#d4af37",

marginTop:"-5px"

};




const desktopMenu={

display:"flex",

alignItems:"center",

gap:"35px"

};




const navLink={

color:"#ddd",

textDecoration:"none",

fontWeight:700,

fontSize:"15px"

};




const button={

padding:"13px 25px",

borderRadius:"18px",

background:

"linear-gradient(135deg,#fff2a8,#d4af37,#8a6500)",

color:"#000",

fontWeight:900,

textDecoration:"none",

boxShadow:

"0 0 25px rgba(212,175,55,.6)"

};




const hamburger={

display:"none",

background:"transparent",

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

borderBottom:"1px solid rgba(212,175,55,.3)"

};




const mobileLink={

color:"white",

fontSize:"18px",

textDecoration:"none",

fontWeight:700

};