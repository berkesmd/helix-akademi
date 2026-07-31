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



// öğrenci bilgisi

const {data:profil}=await supabase

.from("profiles")

.select("*")

.eq("id",id)

.single();



setOgrenci(profil);








// kayıtlı eğitimler

const {data:kayitlar}=await supabase

.from("enrollments")

.select(`

course_id,

courses(

id,

title,

description

)

`)

.eq("user_id",id);








let sonuc:any[]=[];






for(const item of kayitlar || []){



const course=item.courses?.[0];



if(!course) continue;




const courseId=course.id;







// dersler

const {data:dersler}=await supabase

.from("lessons")

.select("id,title")

.eq("course_id",courseId);








// tamamlanan dersler

const dersIdleri=

(dersler || []).map(

(d:any)=>d.id

);





let tamamlanan:any[]=[];



if(dersIdleri.length){


const {data:progress}=await supabase

.from("lesson_progress")

.select("lesson_id")

.eq("user_id",id)

.eq("completed",true)

.in(

"lesson_id",

dersIdleri

);



tamamlanan=progress || [];


}







const toplam=

dersler?.length || 0;



const tamam=

tamamlanan.length;




const yuzde=

toplam===0

?

0

:

Math.round(

(tamam/toplam)*100

);








sonuc.push({

course,

toplam,

tamam,

yuzde

});




}







setEgitimler(sonuc);

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









return(


<main style={page}>


<h1 style={title}>

👤 Öğrenci Detayı

</h1>








<div style={box}>


<h2 style={gold}>

{ogrenci?.full_name || "Öğrenci"}

</h2>


<p>

📧 {ogrenci?.email || "Email yok"}

</p>


<p>

📱 {ogrenci?.phone || "Telefon yok"}

</p>


<p>

📅 Kayıt:

{" "}

{

new Date(

ogrenci?.created_at

).toLocaleDateString("tr-TR")

}

</p>


</div>









<div style={box}>


<h2 style={gold}>

📚 Eğitim İlerlemesi

</h2>







{

egitimler.length===0 ?


<p>

Henüz eğitim almamış.

</p>



:


egitimler.map((item:any)=>(


<div

key={item.course.id}

style={courseBox}

>


<h2>

{item.course.title}

</h2>



<p>

{item.course.description}

</p>






<p>

🎬 Tamamlanan Ders:

{" "}

<b>

{item.tamam}

</b>

/ 

{item.toplam}

</p>







<div style={bar}>


<div

style={{

...fill,

width:`${item.yuzde}%`

}}

/>


</div>







<h3 style={gold}>

İlerleme %{item.yuzde}

</h3>





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

padding:"30px",

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)",

borderRadius:"25px"

};



const courseBox={

marginTop:"20px",

padding:"25px",

background:"rgba(212,175,55,.08)",

borderRadius:"20px"

};



const bar={

height:"12px",

background:"#333",

borderRadius:"20px",

overflow:"hidden"

};



const fill={

height:"100%",

background:"linear-gradient(90deg,#d4af37,#ffe58a)"

};