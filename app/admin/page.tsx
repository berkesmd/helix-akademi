"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";


export default function AdminPage(){


const supabase=createClient();


const [istatistik,setIstatistik]=useState({

ogrenci:0,
egitim:0,
ders:0

});


const [ogrenciler,setOgrenciler]=useState<any[]>([]);

const [aktiviteler,setAktiviteler]=useState<any[]>([]);






async function yukle(){



const {count:ogrenci}=await supabase

.from("profiles")

.select("*",{count:"exact",head:true})

.eq("role","student");






const {count:egitim}=await supabase

.from("courses")

.select("*",{count:"exact",head:true});






const {count:ders}=await supabase

.from("lessons")

.select("*",{count:"exact",head:true});








const {data:sonOgrenciler}=await supabase

.from("profiles")

.select("full_name,created_at")

.eq("role","student")

.order("created_at",{ascending:false})

.limit(5);








const {data:aktivite}=await supabase

.from("activities")

.select("*")

.order("created_at",{ascending:false})

.limit(5);








setIstatistik({

ogrenci:ogrenci || 0,

egitim:egitim || 0,

ders:ders || 0

});



setOgrenciler(

sonOgrenciler || []

);



setAktiviteler(

aktivite || []

);



}








useEffect(()=>{


yukle();



},[]);










return(


<main style={page}>


<h1 style={title}>

HELIX AKADEMİ

</h1>



<p style={subtitle}>

Yönetim Merkezi

</p>








<div style={grid}>


<Card

ikon="👨‍🎓"

sayi={istatistik.ogrenci}

text="Toplam Öğrenci"

/>





<Card

ikon="📚"

sayi={istatistik.egitim}

text="Aktif Eğitim"

/>






<Card

ikon="🎥"

sayi={istatistik.ders}

text="Toplam Ders"

/>





</div>









<div style={section}>


<h2 style={gold}>

👥 Son Kayıt Olan Öğrenciler

</h2>





{

ogrenciler.length===0 ?


<p>

Henüz öğrenci yok.

</p>



:


ogrenciler.map((item)=>(


<div

key={item.created_at}

style={itemBox}

>


👤 {item.full_name || "Yeni Öğrenci"}



<p>

Kayıt:

{" "}

{

new Date(

item.created_at

).toLocaleDateString("tr-TR")

}

</p>



</div>


))


}





</div>









<div style={section}>


<h2 style={gold}>

📌 Son Aktiviteler

</h2>





{

aktiviteler.length===0 ?


<p>

Henüz aktivite yok.

</p>



:


aktiviteler.map((item)=>(


<div

key={item.id}

style={itemBox}

>


✅ {item.text}



<p>

{

new Date(

item.created_at

).toLocaleDateString("tr-TR")

}

</p>


</div>


))


}





</div>








</main>


)

}











function Card({

ikon,

sayi,

text

}:any){


return(


<div style={card}>


<h1>

{ikon}

</h1>


<h2>

{sayi}

</h2>


<p>

{text}

</p>



</div>


)

}









const page={

color:"white",

padding:"20px"

};



const title={

fontSize:"55px",

color:"#d4af37",

letterSpacing:"5px"

};



const subtitle={

fontSize:"22px",

color:"#aaa"

};



const grid={

display:"grid",

gridTemplateColumns:"repeat(3,1fr)",

gap:"25px",

marginTop:"40px"

};



const card={

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)",

borderRadius:"25px",

padding:"35px",

textAlign:"center" as const

};



const section={

marginTop:"40px",

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)",

borderRadius:"25px",

padding:"30px"

};



const gold={

color:"#d4af37"

};



const itemBox={

marginTop:"15px",

padding:"18px",

borderRadius:"15px",

background:"rgba(212,175,55,.08)"

};