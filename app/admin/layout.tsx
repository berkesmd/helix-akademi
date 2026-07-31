"use client";

import { useEffect,useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";


export default function AdminLayout({

children

}:{

children:React.ReactNode

}){


const router=useRouter();

const supabase=createClient();


const [kontrol,setKontrol]=useState(false);

const [isim,setIsim]=useState("");

const [menuAcik,setMenuAcik]=useState(false);






useEffect(()=>{


async function kontrolEt(){


const {

data:{
user

}

}=await supabase.auth.getUser();



if(!user){

router.push("/admin-giris");

return;

}




const {data:profil}=await supabase

.from("profiles")

.select("role,full_name")

.eq("id",user.id)

.single();





if(!profil || profil.role!=="admin"){

router.push("/ogrenci");

return;

}





setIsim(profil.full_name || "Admin");


setKontrol(true);



}



kontrolEt();


},[]);








if(!kontrol){

return(

<div style={loading}>

Kontrol ediliyor...

</div>

)

}







const menu=[


{
isim:"Dashboard",
link:"/admin"
},


{
isim:"Eğitimler",
link:"/admin/egitimler"
},


{
isim:"Ders Yönetimi",
link:"/admin/ders-yonetimi"
},


{
isim:"Öğrenci Takip",
link:"/admin/ogrenci-takip"
},


{
isim:"Eğitim Ata",
link:"/admin/egitim-atama"
},


{
isim:"Bildirimler",
link:"/admin/bildirimler"
}


];









return(


<div style={page}>



<button

className="adminHamburger"

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

undefined

}}

>





<div style={logo}>


<Image

src="/helix-logo.png"

alt="Helix Akademi"

width={140}

height={140}

/>


<h1>

HELIX

</h1>


<p>

Admin Panel

</p>


</div>







<div style={menuAlan}>


{

menu.map(item=>(


<button

key={item.isim}

style={menuBtn}

onClick={()=>{


router.push(item.link);

setMenuAcik(false);


}}

>

{item.isim}

</button>


))


}



</div>









<button

style={logout}

onClick={async()=>{


await supabase.auth.signOut();

router.push("/admin-giris");


}}

>

GÜVENLİ ÇIKIŞ

</button>







</aside>









<main style={content}>


<div style={header}>


<div>

<h2>

Hoş Geldin {isim}

</h2>


<p>

Helix Akademi Yönetim Merkezi

</p>


</div>


</div>






{children}




</main>






</div>


)

}









const page={

minHeight:"100vh",

background:

"radial-gradient(circle at top,#302300,#050505 60%)",

color:"white"

};






const sidebar={

position:"fixed" as const,

left:0,

top:0,

width:"270px",

height:"100vh",

padding:"30px",

background:"rgba(0,0,0,.85)",

borderRight:

"1px solid rgba(212,175,55,.3)",

zIndex:1000,

transition:"0.3s"

};







const logo={

textAlign:"center" as const,

color:"#d4af37"

};







const menuAlan={

marginTop:"40px",

display:"grid",

gap:"14px"

};







const menuBtn={

padding:"16px",

borderRadius:"15px",

background:

"rgba(255,255,255,.05)",

border:

"1px solid rgba(212,175,55,.25)",

color:"white",

cursor:"pointer",

fontWeight:900,

textAlign:"left" as const

};







const logout={

position:"absolute" as const,

bottom:"35px",

left:"30px",

right:"30px",

padding:"16px",

borderRadius:"15px",

background:"transparent",

border:"1px solid #d4af37",

color:"#d4af37",

fontWeight:900,

cursor:"pointer"

};







const content={

marginLeft:"310px",

padding:"40px"

};







const header={

background:

"rgba(255,255,255,.05)",

border:

"1px solid rgba(212,175,55,.25)",

borderRadius:"20px",

padding:"20px 30px",

marginBottom:"30px"

};







const loading={

minHeight:"100vh",

background:"#050505",

display:"flex",

alignItems:"center",

justifyContent:"center",

color:"#d4af37",

fontSize:"22px"

};