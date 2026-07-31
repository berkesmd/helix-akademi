"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function EgitimlerPage(){


const supabase=createClient();

const router=useRouter();


const [egitimler,setEgitimler]=useState<any[]>([]);

const [loading,setLoading]=useState(true);






useEffect(()=>{


async function yukle(){



const {data,error}=await supabase

.from("courses")

.select("*")

.order("created_at",{ascending:false});




console.log(error);



setEgitimler(data || []);

setLoading(false);



}



yukle();



},[]);









return(


<main style={page}>


<h1 style={title}>

🎓 Eğitimlerimiz

</h1>


<p style={desc}>

Kendini geliştir, geleceğini şekillendir.

</p>








{

loading ?


<h2>

Yükleniyor...

</h2>



:


egitimler.length===0 ?


<h2>

Henüz eğitim eklenmemiş.

</h2>



:


<div style={grid}>


{

egitimler.map((item)=>(


<div

key={item.id}

style={card}

>


<div style={imageBox}>

🎓

</div>





<h2 style={gold}>

{item.title}

</h2>



<p>

{item.description}

</p>






<button

style={button}

onClick={()=>router.push(

`/egitimler/${item.id}`

)}

>

Detayları Gör →

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

background:

"radial-gradient(circle at top,#302300,#050505 65%)",

color:"white",

padding:"60px"

};



const title={

fontSize:"50px",

color:"#d4af37",

textAlign:"center" as const

};



const desc={

textAlign:"center" as const,

color:"#aaa",

fontSize:"20px"

};



const grid={

display:"grid",

gridTemplateColumns:"repeat(3,1fr)",

gap:"30px",

marginTop:"50px"

};



const card={

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(212,175,55,.3)",

borderRadius:"30px",

padding:"35px",

backdropFilter:"blur(20px)"

};



const imageBox={

height:"180px",

borderRadius:"25px",

background:

"linear-gradient(135deg,#d4af37,#3b2a00)",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"80px"

};



const gold={

color:"#d4af37"

};



const button={

marginTop:"20px",

padding:"15px 30px",

background:"#d4af37",

border:"0",

borderRadius:"15px",

fontWeight:900,

cursor:"pointer"

};