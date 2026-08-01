"use client";

import {useEffect,useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {createClient} from "@/lib/supabase/client";


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

router.push("/");

return;

}





setIsim(

profil.full_name || "Admin"

);


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
isim:"🏠 Dashboard",
link:"/admin"
},


{
isim:"👨‍🎓 Öğrenci Yönetimi",
link:"/admin/ogrenciler"
},


{
isim:"➕ Öğrenci Ekle",
link:"/admin/ogrenciler/yeni"
},


{
isim:"🎓 Eğitim Yönetimi",
link:"/admin/egitimler"
},


{
isim:"🎥 Ders Yönetimi",
link:"/admin/ders-yonetimi"
},


{
isim:"📚 Eğitim Ata",
link:"/admin/egitim-atama"
},


{
isim:"📊 Öğrenci Takip",
link:"/admin/ogrenci-takip"
},


{
isim:"📈 Analiz",
link:"/admin/analiz"
},


{
isim:"🔔 Bildirimler",
link:"/admin/bildirimler"
},


{
isim:"👑 Rol Yönetimi",
link:"/admin/rol-yonetimi"
},


{
isim:"⚙️ Site Ayarları",
link:"/admin/ayarlar"
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

"translateX(0)"

}}

>







<div style={logo}>


<Image

src="/helix-logo.png"

alt="Helix Akademi"

width={130}

height={130}

/>




<h1>

HELIX

</h1>


<p>

ADMIN PANEL

</p>



</div>









<div style={menuAlan}>


{

menu.map((item)=>(


<button

key={item.link}

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

🚪 GÜVENLİ ÇIKIŞ

</button>








</aside>











<main style={content}>



<div style={header}>


<h2>

Hoş Geldin {isim}

</h2>


<p>

Helix Akademi Yönetim Merkezi

</p>


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

background:"rgba(0,0,0,.90)",

borderRight:

"1px solid rgba(212,175,55,.4)",

zIndex:1000,

overflowY:"auto" as const

};







const logo={

textAlign:"center" as const,

color:"#d4af37"

};







const menuAlan={

marginTop:"35px",

display:"grid",

gap:"12px"

};








const menuBtn={

padding:"15px",

borderRadius:"15px",

background:

"rgba(212,175,55,.08)",

border:

"1px solid rgba(212,175,55,.3)",

color:"white",

cursor:"pointer",

fontWeight:900,

textAlign:"left" as const

};









const logout={

position:"absolute" as const,

bottom:"25px",

left:"30px",

right:"30px",

padding:"15px",

borderRadius:"15px",

background:"#8b0000",

color:"white",

border:"0",

fontWeight:900,

cursor:"pointer"

};








const content={

marginLeft:"310px",

padding:"40px"

};








const header={

padding:"25px",

borderRadius:"25px",

background:

"rgba(255,255,255,.05)",

border:

"1px solid rgba(212,175,55,.3)",

marginBottom:"30px"

};








const hamburger={

display:"none"

};








const loading={

height:"100vh",

background:"#050505",

display:"flex",

alignItems:"center",

justifyContent:"center",

color:"#d4af37",

fontSize:"24px"

};