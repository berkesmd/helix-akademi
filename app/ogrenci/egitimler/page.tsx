"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function EgitimlerPage(){


const router = useRouter();

const supabase = createClient();


const [egitimler,setEgitimler]=useState<any[]>([]);

const [loading,setLoading]=useState(true);






useEffect(()=>{


async function getir(){



const {

data,

error

}=await supabase

.from("courses")

.select("*")

.order("created_at",{ascending:false});





console.log(error);



setEgitimler(data || []);

setLoading(false);



}



getir();



},[]);








return(


<main style={page}>


<h1 style={title}>

🎓 Eğitimlerim

</h1>


<p style={desc}>

Sahip olduğun eğitimlere buradan ulaşabilirsin.

</p>






{

loading ?


<div style={message}>

Yükleniyor...

</div>



:



egitimler.length===0 ?


<div style={message}>

Henüz eğitim bulunamadı.

</div>



:


<div style={grid}>


{

egitimler.map((egitim)=>(



<div

key={egitim.id}

style={card}

>



<div style={imageBox}>

🎓

</div>





<h2 style={gold}>

{egitim.title}

</h2>





<p style={text}>

{egitim.description}

</p>





<button

style={button}

onClick={()=>{

router.push(

`/ogrenci/egitim/${egitim.id}`

);


}}

>

EĞİTİME GİR →

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

padding:"30px 20px",

background:

"radial-gradient(circle at top,#3b2600,#050505)",

color:"white"


};







const title={


fontSize:"clamp(32px,7vw,50px)",

fontWeight:900,

color:"#d4af37",

textAlign:"center" as const


};






const desc={


textAlign:"center" as const,

color:"#aaa",

marginTop:"10px",

marginBottom:"40px"


};






const grid={


display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(260px,1fr))",

gap:"25px"


};






const card={


padding:"25px",

borderRadius:"30px",

background:

"rgba(255,255,255,.06)",

border:

"1px solid rgba(212,175,55,.35)",

boxShadow:

"0 0 30px rgba(212,175,55,.1)"


};






const imageBox={


height:"160px",

borderRadius:"25px",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"70px",

background:

"linear-gradient(135deg,#fff1a8,#d4af37,#5a3b00)",

marginBottom:"25px"


};






const gold={


color:"#d4af37",

fontSize:"24px",

marginBottom:"15px"


};






const text={


color:"#ddd",

lineHeight:"1.6",

minHeight:"60px"


};






const button={


marginTop:"25px",

width:"100%",

padding:"15px",

border:"none",

borderRadius:"18px",

background:

"linear-gradient(135deg,#fff1a8,#d4af37)",

fontWeight:900,

cursor:"pointer"


};






const message={


padding:"40px",

textAlign:"center" as const,

fontSize:"20px",

color:"#d4af37"


};