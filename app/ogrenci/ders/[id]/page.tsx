"use client";

import {useEffect,useState} from "react";
import {useParams,useRouter} from "next/navigation";
import {createClient} from "@/lib/supabase/client";


export default function DersPage(){

const supabase=createClient();

const params=useParams();

const router=useRouter();

const id=params.id as string;



const [ders,setDers]=useState<any>(null);
const [tamam,setTamam]=useState(false);
const [loading,setLoading]=useState(true);



useEffect(()=>{

yukle();

},[]);





async function yukle(){


const {data}=await supabase

.from("lessons")

.select("*")

.eq("id",id)

.single();



setDers(data);





const {data:userData}=await supabase.auth.getUser();


const user=userData.user;



if(user){


const {data:kontrol}=await supabase

.from("lesson_progress")

.select("*")

.eq("user_id",user.id)

.eq("lesson_id",id)

.maybeSingle();



if(kontrol){

setTamam(true);

}


}





setLoading(false);



}








async function tamamla(){


const {data:userData}=await supabase.auth.getUser();


const user=userData.user;



if(!user){

return;

}



await supabase

.from("lesson_progress")

.insert({

user_id:user.id,

lesson_id:id,

completed:true

});



setTamam(true);



}







function youtube(url:string){


if(!url)return "";



if(url.includes("watch?v=")){

return url.split("watch?v=")[1];

}


if(url.includes("youtu.be")){

return url.split("youtu.be/")[1];

}


return "";

}




if(loading){

return(

<div style={page}>

Yükleniyor...

</div>

)

}





if(!ders){

return(

<div style={page}>

Ders bulunamadı

</div>

)

}




const video= youtube(ders.video_url);





return(


<main style={page}>


<div style={card}>


<h1 style={title}>

{ders.title}

</h1>



<p style={desc}>

{ders.description || "Bu ders için açıklama bulunmuyor."}

</p>





{
video &&

<iframe

src={`https://www.youtube.com/embed/${video}`}

style={videoBox}

allowFullScreen

/>

}





{

ders.pdf_url &&


<a

href={ders.pdf_url}

target="_blank"

style={pdf}

>

📄 PDF DÖKÜMANI

</a>


}







<button

style={tamamBtn}

disabled={tamam}

onClick={tamamla}

>

{

tamam

?

"✅ DERS TAMAMLANDI"

:

"✓ DERSİ TAMAMLA"

}


</button>






<div style={alt}>


<button

style={geri}

onClick={()=>router.back()}

>

← Derslere Dön

</button>


</div>





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



const desc={

color:"#ccc",

fontSize:"18px",

lineHeight:"1.6"

};



const videoBox={

width:"100%",

aspectRatio:"16/9",

border:"0",

borderRadius:"25px",

marginTop:"30px"

};



const pdf={

display:"inline-block",

marginTop:"25px",

padding:"15px 25px",

background:"#d4af37",

color:"#000",

borderRadius:"15px",

fontWeight:900,

textDecoration:"none"

};



const tamamBtn={

marginTop:"30px",

width:"100%",

padding:"18px",

border:"0",

borderRadius:"20px",

background:"#d4af37",

fontWeight:900,

fontSize:"18px",

cursor:"pointer"

};



const alt={

marginTop:"30px"

};



const geri={

padding:"12px 20px",

background:"transparent",

border:"1px solid #d4af37",

color:"#d4af37",

borderRadius:"15px"

};