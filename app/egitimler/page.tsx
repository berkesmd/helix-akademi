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


<section style={header}>


<h1 style={title}>
🎓 Eğitimlerimiz
</h1>


<p style={desc}>
Kendini geliştir, geleceğini şekillendir.
</p>


</section>





{
loading ?


<div style={loadingStyle}>
Yükleniyor...
</div>


:


egitimler.length===0 ?


<div style={loadingStyle}>
Henüz eğitim eklenmemiş.
</div>


:


<div style={grid}>


{

egitimler.map((item)=>(


<div
key={item.id}
style={card}
>



<div style={imageBox}>


{
item.image ?


<img
src={item.image}
alt={item.title}
style={image}
/>


:

<span>
🎓
</span>


}


</div>





<h2 style={gold}>
{item.title}
</h2>




<p style={text}>
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
"radial-gradient(circle at top,#5b3b00,#050505 70%)",

color:"#fff",

padding:"40px 20px",

};




const header={

textAlign:"center" as const,

marginBottom:"50px"

};



const title={

fontSize:"clamp(32px,8vw,55px)",

fontWeight:900,

color:"#d4af37",

};



const desc={

fontSize:"18px",

color:"#aaa",

marginTop:"15px"

};



const grid={

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(280px,1fr))",

gap:"25px",

maxWidth:"1200px",

margin:"auto"

};




const card={

background:
"rgba(255,255,255,0.07)",

border:
"1px solid rgba(212,175,55,.4)",

borderRadius:"30px",

padding:"25px",

backdropFilter:"blur(15px)",

boxShadow:
"0 0 35px rgba(212,175,55,.12)",

};



const imageBox={

height:"180px",

borderRadius:"25px",

overflow:"hidden",

background:
"linear-gradient(135deg,#d4af37,#2b1c00)",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"70px",

marginBottom:"25px"

};



const image={

width:"100%",

height:"100%",

objectFit:"cover" as const

};



const gold={

color:"#d4af37",

fontSize:"24px",

marginBottom:"15px"

};



const text={

color:"#ddd",

lineHeight:1.7,

minHeight:"70px"

};



const button={

marginTop:"25px",

width:"100%",

padding:"15px",

background:

"linear-gradient(135deg,#fff0a0,#d4af37)",

border:"none",

borderRadius:"15px",

fontWeight:900,

cursor:"pointer"

};



const loadingStyle={

textAlign:"center" as const,

fontSize:"25px",

padding:"50px"

};