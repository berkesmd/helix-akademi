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


<div className="student-layout">





<button

className="student-hamburger"

onClick={()=>setMenuAcik(!menuAcik)}

>

☰

</button>







<aside

className={
menuAcik
?
"student-sidebar active"
:
"student-sidebar"
}

>





<div className="student-logo">


<Image

src="/helix-logo.png"

alt="Helix"

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







<div className="student-menu">


{

menu.map(item=>(


<button

key={item.ad}

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

className="logout"

onClick={async()=>{


await supabase.auth.signOut();

router.push("/ogrenci-giris");


}}

>

GÜVENLİ ÇIKIŞ

</button>





</aside>








<main className="student-content">



<div className="student-header">


<h2>

HOŞ GELDİN {isim}

</h2>



<button

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