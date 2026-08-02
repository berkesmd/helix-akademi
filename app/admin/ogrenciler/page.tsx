"use client";

import {useEffect,useState} from "react";
import {createClient} from "@/lib/supabase/client";
import {useRouter} from "next/navigation";

export default function OgrencilerPage(){

const supabase=createClient();
const router=useRouter();

const [ogrenciler,setOgrenciler]=useState<any[]>([]);
const [arama,setArama]=useState("");
const [siliniyor,setSiliniyor]=useState("");

useEffect(()=>{listele()},[]);

async function listele(){

const {data}=await supabase
.from("profiles")
.select("*")
.eq("role","student")
.order("created_at",{ascending:false});

setOgrenciler(data||[]);

}

async function ogrenciSil(id:string){

if(!confirm("Öğrenci silinsin mi?")) return;

setSiliniyor(id);

await supabase.from("lesson_progress").delete().eq("user_id",id);
await supabase.from("exam_results").delete().eq("user_id",id);

const {error}=await supabase
.from("profiles")
.delete()
.eq("id",id);

if(error){
alert(error.message);
}

setSiliniyor("");
listele();

}

const liste=ogrenciler.filter(o=>
(o.full_name||"").toLowerCase().includes(arama.toLowerCase()) ||
(o.email||"").toLowerCase().includes(arama.toLowerCase())
);

return <main style={page}>

<h1 style={title}>👨‍🎓 Öğrenci Yönetimi</h1>

<input
style={input}
placeholder="Öğrenci ara"
value={arama}
onChange={e=>setArama(e.target.value)}
/>

{liste.map(o=>

<div key={o.id} style={card}>

<h2 style={gold}>{o.full_name}</h2>

<p>{o.email}</p>

<button
style={detail}
onClick={()=>router.push(`/admin/ogrenciler/${o.id}`)}
>
👁 Detay
</button>

<button
style={deleteBtn}
onClick={()=>ogrenciSil(o.id)}
>
{siliniyor===o.id ? "Siliniyor..." : "🗑 Sil"}
</button>

</div>

)}

</main>

}

const page={padding:"30px",color:"white"};
const title={color:"#d4af37"};
const input={width:"100%",padding:"15px",background:"#111",color:"white",border:"1px solid #d4af37",borderRadius:"15px"};
const card={marginTop:"20px",padding:"25px",borderRadius:"20px",background:"rgba(255,255,255,.05)"};
const gold={color:"#d4af37"};
const detail={width:"100%",padding:"14px",marginTop:"15px",background:"transparent",color:"#d4af37",border:"1px solid #d4af37",borderRadius:"15px"};
const deleteBtn={width:"100%",padding:"14px",marginTop:"15px",background:"#8b0000",color:"white",border:"0",borderRadius:"15px"};