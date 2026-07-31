"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";


export default function EgitimPage(){


const supabase=createClient();

const params=useParams();

const router=useRouter();

const id=params.id as string;



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








const {data:lessons}=await supabase

.from("lessons")

.select("*")

.eq("course_id",id)

.order("lesson_order",{ascending:true});





setDersler(lessons || []);




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


<div style={header}>


<h1>

{egitim?.title}

</h1>



<p>

{egitim?.description}

</p>


</div>








<h2 style={title}>

DERSLER

</h2>







<div style={list}>


{

dersler.length===0 ?


<div style={box}>

Henüz ders bulunmuyor.

</div>



:


dersler.map((ders,index)=>(


<div

key={ders.id}

style={card}

>



<div>


<h2>

{index+1}. {ders.title}

</h2>


<p>

{ders.description}

</p>


</div>







<button

style={button}

onClick={()=>router.push(

`/ogrenci/ders/${ders.id}`

)}

>

DERSİ AÇ

</button>






</div>


))


}



</div>








</main>


)

}









const page={

minHeight:"100vh",

padding:"40px",

color:"white"

};






const header={

padding:"40px",

borderRadius:"30px",

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(212,175,55,.3)"

};






const title={

marginTop:"50px",

fontSize:"40px",

color:"#d4af37"

};







const list={

display:"grid",

gap:"20px",

marginTop:"30px"

};







const card={

padding:"25px",

borderRadius:"25px",

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(212,175,55,.3)",

display:"flex",

justifyContent:"space-between",

alignItems:"center"

};







const button={

padding:"15px 35px",

borderRadius:"15px",

border:"0",

background:"linear-gradient(135deg,#fff1a6,#d4af37)",

fontWeight:900,

cursor:"pointer"

};







const box={

padding:"30px",

borderRadius:"20px",

background:"rgba(255,255,255,.05)"

};