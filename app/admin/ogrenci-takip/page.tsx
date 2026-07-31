"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";


export default function OgrenciDetayPage(){


const supabase=createClient();

const params=useParams();

const id=params.id as string;



const [ogrenci,setOgrenci]=useState<any>(null);

const [egitimler,setEgitimler]=useState<any[]>([]);

const [yukleniyor,setYukleniyor]=useState(true);






useEffect(()=>{


async function yukle(){



const {data:profil}=await supabase

.from("profiles")

.select("*")

.eq("id",id)

.single();




setOgrenci(profil);









const {data:kayitlar}=await supabase

.from("enrollments")

.select(`

course_id,

courses(

title,

description

)

`)

.eq("user_id",id);






setEgitimler(kayitlar || []);

setYukleniyor(false);



}



if(id){

yukle();

}



},[id]);










if(yukleniyor){


return(

<main style={page}>

<h2>

Yükleniyor...

</h2>

</main>

)

}







if(!ogrenci){


return(

<main style={page}>

<h2>

Öğrenci bulunamadı.

</h2>

</main>

)

}





return(


<main style={page}>


<h1 style={title}>

👤 Öğrenci Detayı

</h1>







<div style={box}>


<h2 style={gold}>

{ogrenci.full_name || "İsimsiz"}

</h2>



<p>

📧 {ogrenci.email || "Email yok"}

</p>


<p>

📱 {ogrenci.phone || "Telefon yok"}

</p>


<p>

📅 Kayıt:

{" "}

{

new Date(

ogrenci.created_at

).toLocaleDateString("tr-TR")

}

</p>



</div>









<div style={box}>


<h2 style={gold}>

📚 Aldığı Eğitimler

</h2>




{

egitimler.length===0 ?


<p>

Henüz eğitim almamış.

</p>



:


egitimler.map((item:any)=>(


<div

key={item.course_id}

style={courseBox}

>


<h3>

{item.courses?.title}

</h3>



<p>

{item.courses?.description}

</p>


</div>


))


}



</div>









</main>


)

}









const page={

minHeight:"100vh",

background:

"radial-gradient(circle at top,#302300,#050505 60%)",

color:"white",

padding:"40px"

};



const title={

fontSize:"42px",

color:"#d4af37"

};



const gold={

color:"#d4af37"

};



const box={

marginTop:"30px",

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)",

borderRadius:"25px",

padding:"30px"

};



const courseBox={

marginTop:"15px",

padding:"20px",

background:"rgba(212,175,55,.08)",

borderRadius:"15px"

};