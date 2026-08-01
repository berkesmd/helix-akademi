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


const [isim,setIsim]=useState("Öğrenci");

const [menuAcik,setMenuAcik]=useState(false);





useEffect(()=>{


async function kontrol(){


const {

data

}=await supabase.auth.getUser();



const user=data.user;



if(!user){

router.push("/ogrenci-giris");

return;

}




const {

data:profil

}=await supabase

.from("profiles")

.select("full_name")

.eq("id",user.id)

.single();




setIsim(

profil?.full_name || "Öğrenci"

);



}



kontrol();



},[]);







const menu=[


{

ad:"Ana Sayfa",

link:"/ogrenci"

},


{

ad:"Eğitimlerim",

link:"/ogrenci/egitimler"

},


{

ad:"Bildirimler",

link:"/ogrenci/bildirimler"

},


{

ad:"Profilim",

link:"/ogrenci/profil"

}


];







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

className="student-sidebar"

>



<div style={logoArea}>


<Image

src="/helix-logo.png"

alt="Helix"

width={100}

height={100}

/>


<h2>

HELIX

</h2>


<p>

ÖĞRENCİ PANELİ

</p>


</div>







<nav style={menuArea}>


{

menu.map(item=>(


<button

key={item.ad}

style={menuButton}

onClick={()=>{

router.push(item.link);

setMenuAcik(false);

}}

>


{item.ad}


</button>



))

}


</nav>







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

HOŞ GELDİN {isim}

</h2>



<button

style={notify}

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

"radial-gradient(circle at top,#3b2500,#050505 70%)",

color:"#fff"


};







const sidebar={


position:"fixed" as const,

top:0,

left:0,

width:"240px",

height:"100vh",

padding:"30px 20px",

background:

"linear-gradient(180deg,#050505,#000)",

borderRight:

"1px solid rgba(212,175,55,.35)",

zIndex:1000,

transition:"0.35s",

display:"flex",

flexDirection:"column" as const



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

"rgba(255,255,255,.04)",

border:

"1px solid rgba(212,175,55,.25)",

color:"#fff",

fontWeight:900,

cursor:"pointer",

fontSize:"15px"


};







const logout={


marginTop:"auto",

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


marginLeft:"240px",

padding:"35px",

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







const notify={


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

width:"48px",

height:"48px",

borderRadius:"15px",

border:"0",

background:

"linear-gradient(135deg,#fff1a8,#d4af37)",

fontSize:"25px",

cursor:"pointer"



};