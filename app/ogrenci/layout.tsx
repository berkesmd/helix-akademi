"use client";

import Image from "next/image";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";


export default function OgrenciLayout({

children

}:{

children:React.ReactNode

}){


const router=useRouter();

const supabase=createClient();


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




const {data:profil}=await supabase

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

link:"/ogrenci"

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

className="hamburger"

onClick={()=>setMenuAcik(!menuAcik)}

style={hamburger}

>

☰

</button>







<aside

style={{

...sidebar,

left: menuAcik ? "0px" : undefined

}}

>





<div style={logoAlan}>


<Image

src="/helix-logo.png"

alt="Helix Akademi"

width={130}

height={130}

/>



<h2>

HELIX

</h2>


<p>

ÖĞRENCİ PANELİ

</p>


</div>









<div style={menuAlan}>


{

menu.map((item)=>(


<button

key={item.ad}

style={menuButon}

onClick={()=>{


router.push(item.link);

setMenuAcik(false);


}}

>


{item.ad}


</button>


))


}



</div>









<button

style={cikis}

onClick={async()=>{


await supabase.auth.signOut();


router.push("/ogrenci-giris");


}}

>

GÜVENLİ ÇIKIŞ

</button>






</aside>









<main style={icerik}>


<div style={ust}>


<h2>

HOŞ GELDİN {isim}

</h2>



<button

style={bildirim}

onClick={()=>router.push("/ogrenci/bildirimler")}

>

BİLDİRİMLER

</button>



</div>





{children}




</main>





</div>


)

}









const page={

minHeight:"100vh",

background:

"radial-gradient(circle at top,#3b2800,#050505)",

color:"white"

};









const sidebar={

position:"fixed" as const,

left:0,

top:0,

width:"260px",

height:"100vh",

padding:"30px",

background:"rgba(0,0,0,.9)",

borderRight:

"1px solid rgba(212,175,55,.3)",

zIndex:1000,

transition:"0.3s"

};









const logoAlan={

textAlign:"center" as const,

color:"#d4af37"

};









const menuAlan={

marginTop:"40px",

display:"grid",

gap:"15px"

};









const menuButon={

padding:"16px",

borderRadius:"15px",

background:"rgba(255,255,255,.06)",

border:

"1px solid rgba(212,175,55,.3)",

color:"white",

fontWeight:900,

cursor:"pointer"

};









const cikis={

position:"absolute" as const,

bottom:"40px",

left:"30px",

right:"30px",

padding:"15px",

borderRadius:"15px",

background:"transparent",

border:"1px solid #d4af37",

color:"#d4af37",

fontWeight:900,

cursor:"pointer"

};









const icerik={

marginLeft:"320px",

padding:"40px"

};









const ust={

display:"flex",

justifyContent:"space-between",

alignItems:"center",

background:

"rgba(255,255,255,.05)",

border:

"1px solid rgba(212,175,55,.3)",

borderRadius:"20px",

padding:"20px",

marginBottom:"30px"

};









const bildirim={

background:"transparent",

border:"1px solid #d4af37",

color:"#d4af37",

padding:"12px 20px",

borderRadius:"15px",

fontWeight:900,

cursor:"pointer"

};









const hamburger={

position:"fixed" as const,

top:"20px",

left:"20px",

zIndex:2000,

width:"45px",

height:"45px",

borderRadius:"12px",

border:"1px solid #d4af37",

background:"#d4af37",

fontSize:"25px",

cursor:"pointer"

};