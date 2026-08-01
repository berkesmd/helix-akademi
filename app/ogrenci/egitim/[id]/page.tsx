"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";


export default function EgitimDetayPage(){


const router = useRouter();

const params = useParams();

const supabase = createClient();


const id = params.id as string;



const [egitim,setEgitim]=useState<any>(null);

const [dersler,setDersler]=useState<any[]>([]);

const [loading,setLoading]=useState(true);





useEffect(()=>{

getir();

},[]);






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

.order("created_at",{ascending:true});





setDersler(lessonData || []);




setLoading(false);



}







if(loading){

return(

<div style={page}>

Yükleniyor...

</div>

)

}








return(


<main style={page}>


<div style={kart}>


<h1 style={title}>

{egitim?.title}

</h1>



<p style={aciklama}>

{egitim?.description}

</p>





<h2>

DERSLER

</h2>





{


dersler.length===0 ?


<p>

Bu eğitim için henüz ders eklenmemiş.

</p>


:


dersler.map((ders)=>(



<div

key={ders.id}

style={dersKart}

>


<h3>

{ders.title}

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

padding:"30px",

background:

"radial-gradient(circle,#3b2600,#050505)",

color:"white"

};



const kart={

maxWidth:"800px",

margin:"30px auto",

padding:"35px",

borderRadius:"30px",

background:

"rgba(255,255,255,.06)",

border:

"1px solid #d4af37"

};



const title={

fontSize:"42px",

color:"#d4af37"

};



const aciklama={

color:"#ddd",

marginBottom:"30px"

};



const dersKart={

padding:"20px",

marginTop:"20px",

borderRadius:"20px",

background:"#111",

border:

"1px solid rgba(212,175,55,.4)"

};



const button={

width:"100%",

padding:"15px",

marginTop:"15px",

borderRadius:"15px",

border:"0",

background:

"linear-gradient(90deg,#fff1a8,#d4af37)",

fontWeight:900,

cursor:"pointer"

};



const geri={

width:"100%",

marginTop:"25px",

padding:"15px",

borderRadius:"15px",

background:"transparent",

border:

"1px solid #d4af37",

color:"#d4af37",

cursor:"pointer"

};