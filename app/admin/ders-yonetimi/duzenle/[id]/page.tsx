"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function DersYonetimi(){


const supabase=createClient();

const router=useRouter();



const [dersler,setDersler]=useState<any[]>([]);

const [egitimler,setEgitimler]=useState<any[]>([]);



const [egitimId,setEgitimId]=useState("");

const [filtreEgitim,setFiltreEgitim]=useState("");

const [baslik,setBaslik]=useState("");

const [videoUrl,setVideoUrl]=useState("");

const [pdfUrl,setPdfUrl]=useState("");

const [sure,setSure]=useState("");

const [sira,setSira]=useState("1");







useEffect(()=>{

egitimleriGetir();

getir();


},[]);







async function getir(){



let sorgu=supabase

.from("lessons")

.select("*")

.order("lesson_order",{ascending:true});




if(filtreEgitim){

sorgu=sorgu.eq(

"course_id",

filtreEgitim

);

}





const {data,error}=await sorgu;



if(error){

console.log(error);

}



setDersler(data || []);



}








async function egitimleriGetir(){



const {data,error}=await supabase

.from("courses")

.select("id,title")

.order("created_at",{ascending:false});





if(error){

console.log(error);

}



setEgitimler(data || []);



}








async function dersOlustur(){



if(!egitimId){

alert("Önce eğitim seçmelisin");

return;

}



if(!baslik || !videoUrl){

alert("Ders başlığı ve video URL gerekli");

return;

}






const {error}=await supabase

.from("lessons")

.insert({

course_id:egitimId,

title:baslik,

video_url:videoUrl,

pdf_url:pdfUrl,

lesson_order:Number(sira),

duration:sure

});





if(error){

console.log(error);

alert("Ders eklenemedi");

return;

}




alert("Ders oluşturuldu");



setBaslik("");

setVideoUrl("");

setPdfUrl("");

setSure("");

setSira("1");


getir();


}








async function sil(id:string){



const cevap=confirm(

"Ders silinsin mi?"

);



if(!cevap)return;



await supabase

.from("lessons")

.delete()

.eq("id",id);



getir();



}









return(


<main style={page}>


<h1 style={title}>

🎥 Ders Yönetimi

</h1>







<div style={form}>


<h2>

Yeni Ders Ekle

</h2>





<select

style={input}

value={egitimId}

onChange={(e)=>setEgitimId(e.target.value)}

>

<option value="">

🎓 Eğitim Seç

</option>


{

egitimler.map((egitim)=>(


<option

key={egitim.id}

value={egitim.id}

>

{egitim.title}

</option>


))


}



</select>






<input

style={input}

placeholder="Ders başlığı"

value={baslik}

onChange={(e)=>setBaslik(e.target.value)}

/>






<input

style={input}

placeholder="YouTube Video URL"

value={videoUrl}

onChange={(e)=>setVideoUrl(e.target.value)}

/>






<input

style={input}

placeholder="PDF URL"

value={pdfUrl}

onChange={(e)=>setPdfUrl(e.target.value)}

/>






<input

style={input}

placeholder="Ders süresi"

value={sure}

onChange={(e)=>setSure(e.target.value)}

/>






<input

style={input}

type="number"

value={sira}

onChange={(e)=>setSira(e.target.value)}

/>






<button

style={button}

onClick={dersOlustur}

>

DERSİ OLUŞTUR

</button>



</div>









<h2 style={title}>

📚 Dersler

</h2>






<select

style={input}

value={filtreEgitim}

onChange={(e)=>{

setFiltreEgitim(e.target.value);

setTimeout(()=>{

getir();

},100);


}}

>


<option value="">

📚 Tüm Dersler

</option>



{

egitimler.map((egitim)=>(

<option

key={egitim.id}

value={egitim.id}

>

{egitim.title}

</option>

))


}



</select>









<div style={list}>


{

dersler.map((ders,index)=>(


<div

key={ders.id}

style={card}

>


<div>


<h3>

{index+1}. {ders.title}

</h3>



<p>

{ders.video_url ? "🎥 Video Var":"Video Yok"}

</p>


<p>

{ders.course_id ? "✅ Eğitime bağlı":"❌ Bağlı değil"}

</p>


</div>







<div style={actions}>


<button

style={editBtn}

onClick={()=>router.push(

`/admin/ders-yonetimi/duzenle/${ders.id}`

)}

>

✏️ DÜZENLE

</button>





<button

style={deleteBtn}

onClick={()=>sil(ders.id)}

>

🗑 SİL

</button>



</div>





</div>


))


}



</div>





</main>


)

}









const page={

minHeight:"100vh",

padding:"40px",

color:"white"

};



const title={

color:"#d4af37",

fontSize:"40px"

};



const form={

marginTop:"30px",

padding:"35px",

borderRadius:"25px",

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)",

display:"grid",

gap:"20px"

};



const input={

padding:"15px",

borderRadius:"15px",

background:"#050505",

color:"white",

border:"1px solid #d4af37"

};



const button={

padding:"15px",

borderRadius:"15px",

border:"0",

background:"#d4af37",

fontWeight:900,

cursor:"pointer"

};



const list={

marginTop:"30px",

display:"grid",

gap:"20px"

};



const card={

padding:"25px",

borderRadius:"20px",

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(212,175,55,.3)",

display:"flex",

justifyContent:"space-between",

alignItems:"center"

};



const actions={

display:"flex",

gap:"10px",

flexWrap:"wrap" as const

};



const editBtn={

background:"#d4af37",

color:"#000",

border:"0",

padding:"10px 20px",

borderRadius:"10px",

fontWeight:900,

cursor:"pointer"

};



const deleteBtn={

background:"red",

color:"white",

border:"0",

padding:"10px 20px",

borderRadius:"10px",

cursor:"pointer"

};