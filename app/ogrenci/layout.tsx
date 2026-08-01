"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";


export default function OgrenciLayout({
children
}:{
children:React.ReactNode
}){


const router = useRouter();

const supabase = createClient();


const [isim,setIsim] = useState("Öğrenci");

const [menuAcik,setMenuAcik] = useState(false);





useEffect(()=>{


async function kontrol(){


const {data}=await supabase.auth.getUser();


if(!data.user){

router.push("/ogrenci-giris");

return;

}



const {data:profil}=await supabase

.from("profiles")

.select("full_name")

.eq("id",data.user.id)

.single();



setIsim(
profil?.full_name || "Öğrenci"
);


}


kontrol();


},[]);







return(


<div style={page}>


<button

style={hamburger}

onClick={()=>setMenuAcik(!menuAcik)}

>

☰

</button>







<aside

style={{

...sidebar,

transform:

menuAcik

?

"translateX(0)"

:

"translateX(-100%)"

}}

>



<div style={logoArea}>


<Image

src="/helix-logo.png"

alt="Helix Akademi"

width={110}

height={110}

/>


<h2>

HELIX

</h2>


<p>

ÖĞRENCİ PANELİ

</p>


</div>







<div style={menuArea}>


<button

style={menuButton}

onClick={()=>{

router.push("/ogrenci");

setMenuAcik(false);

}}

>

🏠 Ana Sayfa

</button>







<button

style={menuButton}

onClick={()=>{

router.push("/ogrenci/egitimler");

setMenuAcik(false);

}}

>

🎓 Eğitimlerim

</button>







<button

style={menuButton}

onClick={()=>{

router.push("/ogrenci/bildirimler");

setMenuAcik(false);

}}

>

🔔 Bildirimler

</button>







<button

style={menuButton}

onClick={()=>{

router.push("/ogrenci/profil");

setMenuAcik(false);

}}

>

👤 Profilim

</button>



</div>








<button

style={logout}

onClick={async()=>{


await supabase.auth.signOut();


router.push("/ogrenci-giris");


}}

>

GÜVENLİ ÇIKIŞ

</button>





</aside>









<main style={content}>


<header style={header}>


<h2>

Hoş Geldin {isim} 👋

</h2>




<button

style={notification}

onClick={()=>router.push("/ogrenci/bildirimler")}

>

BİLDİRİMLER

</button>



</header>






{children}





</main>





</div>


)

}









const page={

minHeight:"100vh",

background:

"radial-gradient(circle at top,#3b2600,#050505 70%)",

color:"white"

};








const sidebar={

position:"fixed" as const,

top:0,

left:0,

width:"260px",

height:"100vh",

padding:"30px 20px",

background:"#050505",

borderRight:

"1px solid rgba(212,175,55,.35)",

zIndex:1000,

transition:"0.3s"

};








const logoArea={

textAlign:"center" as const,

color:"#d4af37"

};








const menuArea={

marginTop:"40px",

display:"grid",

gap:"15px"

};








const menuButton={

padding:"16px",

borderRadius:"18px",

background:

"rgba(255,255,255,.05)",

border:

"1px solid rgba(212,175,55,.3)",

color:"white",

fontWeight:900,

cursor:"pointer"

};








const logout={

position:"absolute" as const,

bottom:"30px",

left:"20px",

right:"20px",

padding:"15px",

borderRadius:"18px",

background:"transparent",

border:

"1px solid #d4af37",

color:"#d4af37",

fontWeight:900,

cursor:"pointer"

};








const content={

padding:"30px",

minHeight:"100vh"

};








const header={

display:"flex",

justifyContent:"space-between",

alignItems:"center",

padding:"20px",

borderRadius:"25px",

background:

"rgba(255,255,255,.05)",

border:

"1px solid rgba(212,175,55,.3)",

marginBottom:"30px"

};








const notification={

padding:"12px 20px",

borderRadius:"20px",

background:"transparent",

border:

"1px solid #d4af37",

color:"#d4af37",

fontWeight:900,

cursor:"pointer"

};








const hamburger={

position:"fixed" as const,

top:"20px",

left:"20px",

zIndex:2000,

width:"50px",

height:"50px",

borderRadius:"15px",

border:"none",

background:

"linear-gradient(135deg,#fff1a8,#d4af37)",

fontSize:"25px",

cursor:"pointer"

};