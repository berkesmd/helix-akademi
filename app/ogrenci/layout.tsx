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

const [menu,setMenu] = useState(false);




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

onClick={()=>setMenu(!menu)}

>

☰

</button>







<aside

style={{

...sidebar,

transform:

menu

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

width={120}

height={120}

/>



<h2>

HELIX

</h2>


<p>

ÖĞRENCİ PANELİ

</p>


</div>








<div style={links}>


<button

style={linkButton}

onClick={()=>{

router.push("/ogrenci");

setMenu(false);

}}

>

Ana Sayfa

</button>







<button

style={linkButton}

onClick={()=>{

router.push("/ogrenci/egitimler");

setMenu(false);

}}

>

Eğitimlerim

</button>








<button

style={linkButton}

onClick={()=>{

router.push("/ogrenci/bildirimler");

setMenu(false);

}}

>

Bildirimler

</button>







<button

style={linkButton}

onClick={()=>{

router.push("/ogrenci/profil");

setMenu(false);

}}

>

Profilim

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

background:"#050505",

padding:"30px 20px",

borderRight:

"1px solid rgba(212,175,55,.35)",

zIndex:1000,

transition:"0.3s",

display:"flex",

flexDirection:"column" as const

};







const logoArea={

textAlign:"center" as const,

color:"#d4af37"

};







const links={

marginTop:"40px",

display:"grid",

gap:"15px"

};







const linkButton={

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

marginTop:"auto",

padding:"16px",

borderRadius:"18px",

background:"transparent",

border:

"1px solid #d4af37",

color:"#d4af37",

fontWeight:900,

cursor:"pointer"

};







const content={

marginLeft:"0px",

padding:"30px",

minHeight:"100vh"

};







const header={

display:"flex",

justifyContent:"space-between",

alignItems:"center",

padding:"20px 25px",

borderRadius:"25px",

background:

"rgba(255,255,255,.05)",

border:

"1px solid rgba(212,175,55,.3)",

marginBottom:"30px"

};







const notification={

padding:"12px 22px",

borderRadius:"30px",

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

border:"0",

background:

"linear-gradient(135deg,#fff1a8,#d4af37)",

fontSize:"25px",

cursor:"pointer"

};