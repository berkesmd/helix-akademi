"use client";

import {useEffect,useState} from "react";
import {createClient} from "@/lib/supabase/client";

export default function SinavlarPage(){

const supabase=createClient();

const [egitimler,setEgitimler]=useState<any[]>([]);
const [sinavlar,setSinavlar]=useState<any[]>([]);
const [seciliEgitim,setSeciliEgitim]=useState("");
const [sinavAdi,setSinavAdi]=useState("");
const [sinavId,setSinavId]=useState("");
const [soruSayisi,setSoruSayisi]=useState(0);
const [mesaj,setMesaj]=useState("");

const [soru,setSoru]=useState("");
const [a,setA]=useState("");
const [b,setB]=useState("");
const [c,setC]=useState("");
const [d,setD]=useState("");
const [dogru,setDogru]=useState("A");

useEffect(()=>{ yukle(); },[]);

async function yukle(){

const {data:c}=await supabase.from("courses").select("*");
setEgitimler(c||[]);

const {data:e}=await supabase.from("exams").select("*").order("created_at",{ascending:false});
setSinavlar(e||[]);

}

async function sinavOlustur(){

if(!seciliEgitim||!sinavAdi){
setMesaj("Eğitim ve sınav adı gerekli");
return;
}

const {data,error}=await supabase.from("exams")
.insert({course_id:seciliEgitim,title:sinavAdi})
.select().single();

if(error){setMesaj(error.message);return;}

setSinavId(data.id);
setSinavAdi("");
setMesaj("Sınav oluşturuldu");
yukle();

}

async function sinavSec(id:string){

setSinavId(id);

const {count}=await supabase.from("questions")
.select("*",{count:"exact",head:true})
.eq("exam_id",id);

setSoruSayisi(count||0);

}

async function soruEkle(){

if(!sinavId){
setMesaj("Önce sınav seç");
return;
}

if(soruSayisi>=10){
setMesaj("10 soru sınırı doldu");
return;
}

const {error}=await supabase.from("questions").insert({
exam_id:sinavId,
question:soru,
option_a:a,
option_b:b,
option_c:c,
option_d:d,
correct_answer:dogru
});

if(error){setMesaj(error.message);return;}

setSoru("");
setA("");
setB("");
setC("");
setD("");
setSoruSayisi(soruSayisi+1);
setMesaj("Soru eklendi");

}

async function sinavSil(id:string){

await supabase.from("questions").delete().eq("exam_id",id);
await supabase.from("exams").delete().eq("id",id);

setMesaj("Sınav silindi");
yukle();

}

return <main style={{padding:30,color:"white"}}>

<h1 style={{color:"#d4af37"}}>📝 Sınav Yönetimi</h1>

<div>
<select value={seciliEgitim} onChange={e=>setSeciliEgitim(e.target.value)}>
<option value="">Eğitim seç</option>
{egitimler.map(e=><option key={e.id} value={e.id}>{e.title}</option>)}
</select>

<input placeholder="Sınav adı" value={sinavAdi} onChange={e=>setSinavAdi(e.target.value)}/>
<button onClick={sinavOlustur}>Sınav Oluştur</button>
</div>

<h2>Sınavlar</h2>

{sinavlar.map(s=><div key={s.id}>
<b>{s.title}</b>
<button onClick={()=>sinavSec(s.id)}>Seç</button>
<button onClick={()=>sinavSil(s.id)}>Sil</button>
</div>)}

<h2>Soru Ekle ({soruSayisi}/10)</h2>

<input placeholder="Soru" value={soru} onChange={e=>setSoru(e.target.value)}/>
<input placeholder="A" value={a} onChange={e=>setA(e.target.value)}/>
<input placeholder="B" value={b} onChange={e=>setB(e.target.value)}/>
<input placeholder="C" value={c} onChange={e=>setC(e.target.value)}/>
<input placeholder="D" value={d} onChange={e=>setD(e.target.value)}/>

<select value={dogru} onChange={e=>setDogru(e.target.value)}>
<option>A</option><option>B</option><option>C</option><option>D</option>
</select>

<button onClick={soruEkle}>💾 Kaydet</button>

<p>{mesaj}</p>

</main>

}