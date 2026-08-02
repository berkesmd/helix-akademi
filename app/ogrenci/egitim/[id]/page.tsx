"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";


export default function EgitimDetayPage(){


const router=useRouter();

const params=useParams();

const supabase=createClient();


const id=params.id as string;



const [egitim,setEgitim]=useState<any>(null);

const [dersler,setDersler]=useState<any[]>([]);

const [sinav,setSinav]=useState<any>(null);


const [tamamlanan,setTamamlanan]=useState(0);

const [yuzde,setYuzde]=useState(0);


const [loading,setLoading]=useState(true);









useEffect(()=>{


if(id){

getir();

}


},[id]);









async function getir(){



const {data:course}=await supabase

.from("courses")

.select("*")

.eq("id",id)

.single();



setEgitim(course);







const {data:lessonData}=await supabase

.from("lessons")

.select("*")

.eq("course_id",id)

.order("lesson_order",{ascending:true});




const dersListesi=lessonData || [];


setDersler(dersListesi);







const {

data:{
user

}

}=await supabase.auth.getUser();






if(user && dersListesi.length){



const dersIdleri=dersListesi.map(

(d:any)=>d.id

);







const {data:progress}=await supabase

.from("lesson_progress")

.select("lesson_id")

.eq("user_id",user.id)

.eq("completed",true)

.in(

"lesson_id",

dersIdleri

);







const tamam=progress?.length || 0;



setTamamlanan(tamam);



setYuzde(

Math.round(

(tamam/dersListesi.length)*100

)

);



}









const {data:exam}=await supabase

.from("exams")

.select("*")

.eq("course_id",id)

.maybeSingle();




setSinav(exam);





setLoading(false);



}









if(loading){


return(

<main style={page}>

<h2>

Yükleniyor...

</h2>

</main>

)

}









const egitimTamam =

dersler.length > 0 &&

tamamlanan === dersler.length;









return(


<main style={page}>


<div style={kart}>


<h1 style={title}>

{egitim?.title}

</h1>






<p style={aciklama}>

{egitim?.description}

</p>









<div style={progressBox}>


<p>

📚 Ders İlerlemesi

</p>



<h2>

{tamamlanan} / {dersler.length}

</h2>




<div style={bar}>


<div

style={{

...fill,

width:`${yuzde}%`

}}

/>


</div>



<p>

%{yuzde} tamamlandı

</p>


</div>









<h2 style={sectionTitle}>

🎥 DERSLER

</h2>








{

dersler.length===0 ?


<div style={empty}>

Bu eğitim için henüz ders eklenmemiş.

</div>



:



dersler.map((ders,index)=>(



<div

key={ders.id}

style={dersKart}

>


<h3>

{index+1}. {ders.title}

</h3>







<button

style={button}

onClick={()=>router.push(

`/ogrenci/ders/${ders.id}`

)}

>

DERSE GİR →

</button>





</div>


))


}









{

sinav &&


<div style={sinavKart}>


<h2>

📝 Final Sınavı

</h2>





{

egitimTamam ?


<>

<p>

🎉 Tüm dersleri tamamladınız.

Sınava girebilirsiniz.

</p>



<button

style={button}

onClick={()=>router.push(

`/ogrenci/sinav/${sinav.id}`

)}

>

SINAVA GİR →

</button>


</>



:


<>


<p>

🔒 Sınav kilitli

</p>



<p>

Önce tüm dersleri tamamlayın.

</p>



</>



}





</div>


}









<button

style={geri}

onClick={()=>router.back()}

>

← Geri Dön

</button>






</div>





</main>


)

}









const page={

minHeight:"100vh",

padding:"20px",

background:

"radial-gradient(circle at top,#3b2600,#050505 70%)",

color:"white"

};





const kart={

width:"100%",

maxWidth:"850px",

margin:"20px auto",

padding:"25px",

borderRadius:"30px",

background:"rgba(255,255,255,.06)",

border:"1px solid #d4af37",

boxSizing:"border-box" as const

};





const title={

fontSize:"clamp(28px,5vw,42px)",

color:"#d4af37",

textAlign:"center" as const

};





const aciklama={

color:"#ddd",

textAlign:"center" as const

};





const progressBox={

marginTop:"25px",

padding:"20px",

borderRadius:"20px",

background:"rgba(212,175,55,.1)",

textAlign:"center" as const

};





const bar={

height:"12px",

background:"#333",

borderRadius:"20px",

overflow:"hidden"

};





const fill={

height:"100%",

background:"#d4af37"

};





const sectionTitle={

marginTop:"35px",

color:"#d4af37"

};





const dersKart={

marginTop:"15px",

padding:"20px",

borderRadius:"20px",

background:"#111",

border:"1px solid rgba(212,175,55,.4)"

};





const sinavKart={

marginTop:"35px",

padding:"25px",

borderRadius:"25px",

background:"rgba(212,175,55,.12)",

border:"2px solid #d4af37",

textAlign:"center" as const

};





const button={

width:"100%",

padding:"15px",

borderRadius:"15px",

border:"0",

background:"linear-gradient(90deg,#fff1a8,#d4af37)",

fontWeight:900,

cursor:"pointer"

};





const geri={

width:"100%",

marginTop:"25px",

padding:"15px",

borderRadius:"15px",

background:"transparent",

border:"1px solid #d4af37",

color:"#d4af37",

cursor:"pointer"

};





const empty={

padding:"20px",

background:"#111",

borderRadius:"15px",

color:"#aaa"

};