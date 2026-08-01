"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";


export default function EgitimDetayPage(){

const supabase = createClient();

const params = useParams();

const router = useRouter();


const [egitim,setEgitim] = useState<any>(null);

const [loading,setLoading] = useState(true);



useEffect(()=>{

getir();

},[]);



async function getir(){


const id = params.id;



const {

data,

error

}= await supabase

.from("courses")

.select("*")

.eq("id",id)

.single();



console.log(error);



if(data){

setEgitim(data);

}


setLoading(false);



}




if(loading){

return(

<main style={page}>

<div style={loadingBox}>

Yükleniyor...

</div>

</main>

)

}





if(!egitim){

return(

<main style={page}>

<div style={loadingBox}>

Eğitim bulunamadı.

</div>

</main>

)

}





return(


<main style={page}>


<div style={card}>


<h1 style={title}>

{egitim.title}

</h1>



<p style={desc}>

{egitim.description}

</p>





<div style={section}>


<h2>

DERSLER

</h2>



<div style={lesson}>


<h3>

1. Koçluğa Giriş

</h3>


<button style={button}>

DERSE GİR

</button>


</div>





<div style={lesson}>


<h3>

2. İletişim Teknikleri

</h3>


<button style={button}>

DERSE GİR

</button>


</div>





</div>



<button

style={back}

onClick={()=>router.back()}

>

← Geri Dön

</button>



</div>



</main>


)

}





const page = {


minHeight:"100vh",

padding:"25px 15px",

background:

"radial-gradient(circle at top,#3b2800,#050505 70%)",

color:"white"



};



const card={


maxWidth:"700px",

margin:"auto",

padding:"25px",

borderRadius:"30px",

background:

"rgba(255,255,255,.06)",

border:

"1px solid rgba(212,175,55,.4)",

backdropFilter:"blur(20px)"

};



const title={


fontSize:"clamp(28px,7vw,45px)",

lineHeight:"1.2",

color:"#d4af37",

fontWeight:900,

marginBottom:"20px"


};



const desc={


fontSize:"17px",

lineHeight:"1.7",

color:"#ddd"


};



const section={


marginTop:"35px"


};



const lesson={


marginTop:"20px",

padding:"20px",

borderRadius:"20px",

background:"#111",

border:

"1px solid rgba(212,175,55,.3)"



};



const button={


marginTop:"15px",

width:"100%",

padding:"14px",

border:"0",

borderRadius:"15px",

background:

"linear-gradient(135deg,#fff1a8,#d4af37)",

fontWeight:900,

cursor:"pointer"


};



const back={


marginTop:"30px",

width:"100%",

padding:"14px",

borderRadius:"15px",

background:"transparent",

border:

"1px solid #d4af37",

color:"#d4af37",

fontWeight:900,

cursor:"pointer"


};



const loadingBox={


padding:"50px",

textAlign:"center" as const,

color:"#d4af37",

fontSize:"22px"


};