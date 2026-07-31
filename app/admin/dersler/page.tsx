"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";


export default function DerslerPage() {


const supabase=createClient();


const [egitimler,setEgitimler]=useState<any[]>([]);
const [dersler,setDersler]=useState<any[]>([]);


const [egitim,setEgitim]=useState("");
const [baslik,setBaslik]=useState("");
const [video,setVideo]=useState("");
const [pdf,setPdf]=useState("");
const [sira,setSira]=useState("1");


const [mesaj,setMesaj]=useState("");




useEffect(()=>{


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
.order("created_at");


setDersler(dersData || []);



}


getir();


},[]);






async function dersEkle(e:React.FormEvent){


e.preventDefault();



const {error}=await supabase
.from("lessons")
.insert({

course_id:egitim,

title:baslik,

video_url:video,

pdf_url:pdf,

lesson_order:Number(sira)

});




if(error){

setMesaj(error.message);

return;

}



setMesaj("✅ Ders eklendi");



setBaslik("");
setVideo("");
setPdf("");



const {data}=await supabase
.from("lessons")
.select(`
*,
courses(
title
)
`)
.order("created_at");


setDersler(data || []);



}






return(


<main

style={{
minHeight:"100vh",
background:"#050505",
color:"white",
padding:"40px"
}}

>



<h1

style={{
color:"#d4af37",
fontSize:"40px"
}}

>

🎬 Ders Yönetimi

</h1>




<form

onSubmit={dersEkle}

style={{
marginTop:"30px",
maxWidth:"600px",
background:"#111",
padding:"30px",
borderRadius:"20px"
}}

>




<select

value={egitim}

onChange={e=>setEgitim(e.target.value)}

style={input}

>

<option value="">
Eğitim seç
</option>


{

egitimler.map((e)=>(

<option

key={e.id}

value={e.id}

>

{e.title}

</option>

))

}


</select>





<input

placeholder="Ders adı"

value={baslik}

onChange={e=>setBaslik(e.target.value)}

style={input}

/>




<input

placeholder="YouTube / Vimeo video linki"

value={video}

onChange={e=>setVideo(e.target.value)}

style={input}

/>




<input

placeholder="PDF linki"

value={pdf}

onChange={e=>setPdf(e.target.value)}

style={input}

/>




<input

placeholder="Ders sırası"

value={sira}

onChange={e=>setSira(e.target.value)}

style={input}

/>





<button

style={button}

>

Dersi Kaydet

</button>



<p
style={{
color:"#d4af37"
}}
>

{mesaj}

</p>



</form>





<h2

style={{
marginTop:"50px",
color:"#d4af37"
}}

>

Mevcut Dersler

</h2>





{

dersler.map((ders)=>(


<div

key={ders.id}

style={kart}

>


<h2>
{ders.title}
</h2>


<p>
📚 Eğitim: {ders.courses?.title}
</p>


<p>
🎥 {ders.video_url}
</p>


{

ders.pdf_url &&

<p>
📄 PDF mevcut
</p>

}



</div>


))


}



</main>


)

}






const input={

width:"100%",

padding:"14px",

marginBottom:"15px",

background:"#000",

color:"white",

border:"1px solid #333",

borderRadius:"10px",

boxSizing:"border-box" as const

}




const button={

width:"100%",

padding:"15px",

background:"#d4af37",

color:"#000",

border:"0",

borderRadius:"10px",

fontWeight:900,

cursor:"pointer"

}



const kart={

background:"#111",

padding:"25px",

borderRadius:"20px",

marginTop:"20px",

border:"1px solid rgba(212,175,55,.3)"

}