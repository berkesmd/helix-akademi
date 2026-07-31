"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function EgitimlerimPage(){

const supabase=createClient();

const router=useRouter();


const [egitimler,setEgitimler]=useState<any[]>([]);

const [loading,setLoading]=useState(true);



useEffect(()=>{

getir();

},[]);





async function getir(){


const {data:userData}=await supabase.auth.getUser();


const user=userData.user;


if(!user){

setLoading(false);

return;

}





const {data,error}=await supabase

.from("enrollments")

.select(`

id,

courses(

id,

title,

description,

image_url

)

`)

.eq("user_id",user.id);





console.log("EGITIMLER:",data);

console.log("HATA:",error);





if(error){

console.log(error);

setLoading(false);

return;

}



setEgitimler(data || []);


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


<h1 style={title}>

EĞİTİMLERİM

</h1>





{

egitimler.length===0 ?


<div style={card}>

Henüz kayıtlı eğitim bulunmuyor.

</div>



:


<div style={grid}>


{

egitimler.map((item)=>(


<div

key={item.id}

style={card}

onClick={()=>router.push(

`/ogrenci/egitim/${item.courses.id}`

)}

>


<h2 style={gold}>

{item.courses.title}

</h2>



<p>

{item.courses.description}

</p>




<button style={button}>

EĞİTİME GİR

</button>



</div>


))


}



</div>



}



</main>


)

}







const page={

minHeight:"100vh",

padding:"40px",

color:"white"

};



const title={

color:"#d4af37",

fontSize:"45px"

};



const grid={

display:"grid",

gridTemplateColumns:"repeat(3,1fr)",

gap:"25px"

};



const card={

padding:"30px",

borderRadius:"25px",

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(212,175,55,.3)",

cursor:"pointer"

};



const gold={

color:"#d4af37"

};



const button={

marginTop:"20px",

padding:"12px 25px",

background:"#d4af37",

border:"0",

borderRadius:"12px",

fontWeight:900,

cursor:"pointer"

};