"use client";

import {useEffect,useState} from "react";
import {useParams} from "next/navigation";
import {createClient} from "@/lib/supabase/client";


export default function EgitimPage(){

const supabase=createClient();

const params=useParams();

const id=params.id as string;


const [kurs,setKurs]=useState<any>(null);
const [dersler,setDersler]=useState<any[]>([]);
const [loading,setLoading]=useState(true);



useEffect(()=>{

if(id){

yukle();

}

},[id]);





async function yukle(){


console.log("GELEN ID:",id);



// EĞİTİM

const {data:course,error:courseError}=await supabase

.from("courses")

.select("*")

.eq("id",id)

.single();



console.log("COURSE:",course);
console.log("COURSE ERROR:",courseError);



setKurs(course);





// DERSLER


const {data:lessons,error:lessonError}=await supabase

.from("lessons")

.select("*")

.eq("course_id",id)

.order("lesson_order",{ascending:true});




console.log("LESSONS:",lessons);
console.log("LESSON ERROR:",lessonError);



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


<div style={card}>


<h1 style={title}>

{kurs?.title}

</h1>



<p>

{kurs?.description}

</p>






<h2 style={gold}>

DERSLER

</h2>





{

dersler.length===0 ?


<div>

Ders bulunamadı.

</div>


:

dersler.map((ders,index)=>(


<div

key={ders.id}

style={dersBox}

>


<h3>

{index+1}. {ders.title}

</h3>



<button

style={button}

onClick={()=>{

window.location.href=

`/ogrenci/ders/${ders.id}`


}}

>

DERSE GİR

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



const card={

maxWidth:"1000px",

margin:"auto",

background:"rgba(255,255,255,.06)",

padding:"40px",

borderRadius:"30px",

border:"1px solid rgba(212,175,55,.3)"

};



const title={

fontSize:"45px",

color:"#d4af37"

};



const gold={

color:"#d4af37",

marginTop:"40px"

};



const dersBox={

padding:"25px",

marginTop:"20px",

background:"rgba(0,0,0,.3)",

borderRadius:"20px",

border:"1px solid rgba(212,175,55,.2)"

};



const button={

marginTop:"15px",

padding:"14px 30px",

background:"#d4af37",

border:"0",

borderRadius:"15px",

fontWeight:900,

cursor:"pointer"

};