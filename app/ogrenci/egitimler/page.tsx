"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function OgrenciEgitimler(){


const supabase=createClient();

const router=useRouter();


const [egitimler,setEgitimler]=useState<any[]>([]);

const [loading,setLoading]=useState(true);





useEffect(()=>{

yukle();

},[]);






async function yukle(){



const {data:userData}=await supabase.auth.getUser();


const user=userData.user;



if(!user){

router.push("/ogrenci-giris");

return;

}







// SADECE ATANAN EĞİTİMLER

const {data:kayitlar,error}=await supabase

.from("enrollments")

.select("course_id")

.eq("user_id",user.id);





if(error){

console.log(error);

setLoading(false);

return;

}





let liste:any[]=[];







for(const item of kayitlar || []){



const {data:course}=await supabase

.from("courses")

.select(
"id,title,description"
)

.eq("id",item.course_id)

.single();





if(course){

liste.push(course);

}


}






setEgitimler(liste);

setLoading(false);



}









if(loading){

return(

<main style={page}>

Yükleniyor...

</main>

)

}








return(


<main style={page}>


<h1 style={title}>

📚 Eğitimlerim

</h1>






{

egitimler.length===0 ?


<div style={card}>

Henüz atanmış eğitim yok.

</div>



:


<div style={grid}>


{

egitimler.map((e)=>(


<div

key={e.id}

style={card}

>



<div style={image}>

🎓

</div>




<h2 style={gold}>

{e.title}

</h2>




<p>

{e.description}

</p>





<button

style={button}

onClick={()=>router.push(

`/ogrenci/egitim/${e.id}`

)}

>

▶ EĞİTİME GİR

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

padding:"30px",

color:"white"

};




const title={

fontSize:"40px",

color:"#d4af37"

};





const grid={

display:"grid",

gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",

gap:"25px"

};






const card={

padding:"25px",

borderRadius:"25px",

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(212,175,55,.3)"

};





const image={

height:"140px",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"80px",

background:"linear-gradient(135deg,#ffe88a,#d4af37)",

borderRadius:"20px",

marginBottom:"20px"

};





const gold={

color:"#d4af37"

};





const button={

marginTop:"20px",

padding:"15px 30px",

borderRadius:"15px",

border:"0",

background:"#d4af37",

fontWeight:900,

cursor:"pointer"

};