"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";


export default function DerslerPage(){

const supabase=createClient();


const [egitimler,setEgitimler]=useState<any[]>([]);
const [dersler,setDersler]=useState<any[]>([]);

const [egitim,setEgitim]=useState("");
const [baslik,setBaslik]=useState("");
const [video,setVideo]=useState("");
const [pdf,setPdf]=useState("");

const [mesaj,setMesaj]=useState("");




useEffect(()=>{

getir();

},[]);




async function getir(){


const {data:egitimData}=await supabase
.from("courses")
.select("*")
.order("created_at");


setEgitimler(egitimData || []);




const {data:dersData}=await supabase
.from("lessons")
.select(`
*,
courses(
title
)
`)
.order("lesson_order",{ascending:true});


setDersler(dersData || []);


}






async function dersEkle(e:React.FormEvent){

e.preventDefault();



const {data:last}=await supabase
.from("lessons")
.select("lesson_order")
.eq("course_id",egitim)
.order("lesson_order",{ascending:false})
.limit(1)
.maybeSingle();



const yeniSira = last
? last.lesson_order + 1
: 1;





const {error}=await supabase
.from("lessons")
.insert({

course_id:egitim,

title:baslik,

video_url:video,

pdf_url:pdf,

lesson_order:yeniSira

});



if(error){

setMesaj(error.message);
return;

}



setMesaj("✅ Ders eklendi");


setBaslik("");
setVideo("");
setPdf("");

getir();

}









async function sirala(

index:number,

yon:"up"|"down"

){


const yeni=[...dersler];


const hedef =

yon==="up"

?

index-1

:

index+1;



if(hedef<0 || hedef>=yeni.length)

return;




const mevcut=yeni[index];

const degisen=yeni[hedef];





const eskiSira=mevcut.lesson_order;

const yeniSira=degisen.lesson_order;




yeni[index].lesson_order=yeniSira;

yeni[hedef].lesson_order=eskiSira;




setDersler(yeni);





await supabase
.from("lessons")
.update({

lesson_order:yeniSira

})
.eq("id",mevcut.id);




await supabase
.from("lessons")
.update({

lesson_order:eskiSira

})
.eq("id",degisen.id);



getir();



}









return(


<main style={page}>


<h1 style={title}>
🎬 Ders Yönetimi
</h1>




<form

onSubmit={dersEkle}

style={form}

>


<select

value={egitim}

onChange={e=>setEgitim(e.target.value)}

style={input}

>

<option>
Eğitim seç
</option>


{
egitimler.map(e=>

<option

key={e.id}

value={e.id}

>

{e.title}

</option>

)

}

</select>





<input

style={input}

placeholder="Ders adı"

value={baslik}

onChange={e=>setBaslik(e.target.value)}

/>





<input

style={input}

placeholder="Video linki"

value={video}

onChange={e=>setVideo(e.target.value)}

/>





<input

style={input}

placeholder="PDF linki"

value={pdf}

onChange={e=>setPdf(e.target.value)}

/>




<button style={button}>

Dersi Kaydet

</button>



<p style={msg}>
{mesaj}
</p>



</form>







<h2 style={gold}>
📚 Mevcut Dersler
</h2>





{

dersler.map((ders,index)=>(


<div

key={ders.id}

style={kart}

>


<h2>

{index+1}. {ders.title}

</h2>



<p>

📚 {ders.courses?.title}

</p>


<p>

Sıra: {ders.lesson_order}

</p>




<button

style={small}

onClick={()=>sirala(index,"up")}

>

⬆ Yukarı

</button>




<button

style={small}

onClick={()=>sirala(index,"down")}

>

⬇ Aşağı

</button>



</div>


))

}



</main>


)

}








const page={

minHeight:"100vh",

background:"#050505",

color:"white",

padding:"40px"

};


const title={

color:"#d4af37",

fontSize:"40px"

};


const gold={

color:"#d4af37",

marginTop:"40px"

};


const form={

maxWidth:"600px",

background:"#111",

padding:"30px",

borderRadius:"20px"

};


const input={

width:"100%",

padding:"14px",

marginBottom:"15px",

background:"#000",

color:"white",

border:"1px solid #d4af37",

borderRadius:"10px"

};


const button={

width:"100%",

padding:"15px",

background:"#d4af37",

border:"0",

fontWeight:900,

borderRadius:"10px"

};


const kart={

background:"#111",

border:"1px solid rgba(212,175,55,.4)",

padding:"25px",

borderRadius:"20px",

marginTop:"20px"

};


const small={

marginRight:"10px",

padding:"12px 20px",

background:"#d4af37",

border:"0",

borderRadius:"10px",

fontWeight:900

};


const msg={

color:"#d4af37"

};