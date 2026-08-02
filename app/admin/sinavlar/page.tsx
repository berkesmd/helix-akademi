"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SinavlarPage(){

const supabase=createClient();

const [egitimler,setEgitimler]=useState<any[]>([]);
const [sinavlar,setSinavlar]=useState<any[]>([]);
const [seciliEgitim,setSeciliEgitim]=useState("");
const [sinavAdi,setSinavAdi]=useState("");
const [sinavId,setSinavId]=useState("");

const [soru,setSoru]=useState("");
const [a,setA]=useState("");
const [b,setB]=useState("");
const [c,setC]=useState("");
const [d,setD]=useState("");
const [dogru,setDogru]=useState("A");

const [soruSayisi,setSoruSayisi]=useState(0);
const [mesaj,setMesaj]=useState("");

useEffect(()=>{ yukle(); },[]);

async function yukle(){

const {data:courses}=await supabase
.from("courses")
.select("*");

setEgitimler(courses||[]);

const {data:exam}=await supabase
.from("exams")
.select("*")
.order("created_at",{ascending:false});

const liste:any[]=[];

for(const e of exam||[]){

const {count}=await supabase
.from("questions")
.select("*",{count:"exact",head:true})
.eq("exam_id",e.id);

liste.push({...e,soruSayisi:count||0});

}

setSinavlar(liste);

}


async function sinavOlustur(){

if(!seciliEgitim || !sinavAdi){
setMesaj("❌ Eğitim ve sınav adı gerekli");
return;
}

const {data,error}=await supabase
.from("exams")
.insert({
course_id:seciliEgitim,
title:sinavAdi
})
.select()
.single();

if(error){
setMesaj(error.message);
return;
}

setSinavId(data.id);
setSinavAdi("");
setMesaj("✅ Sınav oluşturuldu");
yukle();

}


async function sinavSec(id:string){

setSinavId(id);

const {count}=await supabase
.from("questions")
.select("*",{count:"exact",head:true})
.eq("exam_id",id);

setSoruSayisi(count||0);

}


async function soruEkle(){

if(!sinavId){
setMesaj("❌ Önce sınav seç");
return;
}

if(!soru||!a||!b||!c||!d){
setMesaj("❌ Tüm alanları doldur");
return;
}

if(soruSayisi>=10){
setMesaj("❌ 10 soru sınırı doldu");
return;
}

const {error}=await supabase
.from("questions")
.insert({
exam_id:sinavId,
question:soru,
option_a:a,
option_b:b,
option_c:c,
option_d:d,
correct_answer:dogru
});

if(error){
setMesaj(error.message);
return;
}

setSoru("");
setA("");
setB("");
setC("");
setD("");
setSoruSayisi(soruSayisi+1);
setMesaj("✅ Soru eklendi");

}


async function sinavSil(id:string){

await supabase.from("questions").delete().eq("exam_id",id);
await supabase.from("exams").delete().eq("id",id);

setMesaj("🗑 Sınav silindi");
yukle();

}


return(

<main style={page}>

<h1 style={title}>📝 Sınav Yönetimi</h1>

<div style={box}>

<h2 style={gold}>🎓 Eğitim Seç</h2>

<select style={input}
value={seciliEgitim}
onChange={e=>setSeciliEgitim(e.target.value)}
>
<option value="">Eğitim seç</option>
{egitimler.map(e=>
<option key={e.id} value={e.id}>{e.title}</option>
)}
</select>

<input style={input}
placeholder="Sınav adı"
value={sinavAdi}
onChange={e=>setSinavAdi(e.target.value)}
/>

<button style={button} onClick={sinavOlustur}>
➕ Sınav Oluştur
</button>

</div>


<div style={box}>

<h2 style={gold}>📋 Sınavlar</h2>

{sinavlar.map(s=>

<div key={s.id} style={card}>

<h3>{s.title}</h3>

<p>Soru: {s.soruSayisi}/10</p>

<button style={button} onClick={()=>sinavSec(s.id)}>
Seç
</button>

<button style={deleteBtn} onClick={()=>sinavSil(s.id)}>
Sil
</button>

</div>

)}

</div>


<div style={box}>

<h2 style={gold}>❓ Soru Ekle ({soruSayisi}/10)</h2>

<input style={input} placeholder="Soru" value={soru} onChange={e=>setSoru(e.target.value)}/>
<input style={input} placeholder="A şıkkı" value={a} onChange={e=>setA(e.target.value)}/>
<input style={input} placeholder="B şıkkı" value={b} onChange={e=>setB(e.target.value)}/>
<input style={input} placeholder="C şıkkı" value={c} onChange={e=>setC(e.target.value)}/>
<input style={input} placeholder="D şıkkı" value={d} onChange={e=>setD(e.target.value)}/>

<select style={input} value={dogru} onChange={e=>setDogru(e.target.value)}>
<option>A</option>
<option>B</option>
<option>C</option>
<option>D</option>
</select>

<button style={button} onClick={soruEkle}>
💾 Kaydet
</button>

</div>

<p style={msg}>{mesaj}</p>

</main>

)

}


const page={
minHeight:"100vh",
padding:"30px",
background:"radial-gradient(circle,#3b2600,#050505)",
color:"white"
};

const title={color:"#d4af37",fontSize:"40px"};

const gold={color:"#d4af37"};

const box={
marginTop:"25px",
padding:"25px",
borderRadius:"25px",
background:"rgba(255,255,255,.05)",
border:"1px solid #d4af37"
};

const card={
marginTop:"15px",
padding:"20px",
borderRadius:"20px",
background:"#111"
};

const input={
width:"100%",
padding:"15px",
marginTop:"15px",
borderRadius:"12px",
background:"#111",
color:"white",
border:"1px solid #d4af37"
};

const button={
marginTop:"15px",
padding:"14px 25px",
borderRadius:"15px",
background:"#d4af37",
border:"0",
fontWeight:900
};

const deleteBtn={
marginLeft:"10px",
padding:"14px 25px",
borderRadius:"15px",
background:"#900",
color:"white",
border:"0"
};

const msg={
color:"#d4af37",
marginTop:"20px"
};