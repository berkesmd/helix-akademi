"use client";


import {useEffect,useState} from "react";
import {createClient} from "@/lib/supabase/client";



export default function DersYonetimi(){


const supabase=createClient();



const [egitimler,setEgitimler]=useState<any[]>([]);

const [dersler,setDersler]=useState<any[]>([]);


const [seciliEgitim,setSeciliEgitim]=useState("");



const [title,setTitle]=useState("");

const [description,setDescription]=useState("");

const [videoUrl,setVideoUrl]=useState("");

const [pdfUrl,setPdfUrl]=useState("");

const [sira,setSira]=useState(1);



const [mesaj,setMesaj]=useState("");

const [loading,setLoading]=useState(true);







useEffect(()=>{


egitimleriGetir();


},[]);







async function egitimleriGetir(){


const {data,error}=await supabase

.from("courses")

.select("*")

.order("created_at",{ascending:false});



if(error){

console.log(error);

return;

}



setEgitimler(data || []);

setLoading(false);



}







async function dersleriGetir(id:string){


if(!id){

setDersler([]);

return;

}



const {data,error}=await supabase

.from("lessons")

.select("*")

.eq("course_id",id)

.order("lesson_order",{ascending:true});




if(error){

console.log(error);

return;

}



setDersler(data || []);



}







function egitimSec(e:string){


setSeciliEgitim(e);


dersleriGetir(e);



}








async function dersEkle(){



if(!seciliEgitim){

setMesaj("Önce eğitim seçiniz.");

return;

}



if(!title){

setMesaj("Ders adı boş olamaz.");

return;

}







const {error}=await supabase

.from("lessons")

.insert({


course_id:seciliEgitim,

title:title,

description:description,

video_url:videoUrl,

pdf_url:pdfUrl,

lesson_order:sira



});







if(error){

console.log(error);

setMesaj("❌ Ders eklenemedi.");

return;

}






setMesaj("✅ Ders başarıyla eklendi.");



setTitle("");

setDescription("");

setVideoUrl("");

setPdfUrl("");

setSira(sira+1);



dersleriGetir(seciliEgitim);



}









async function dersSil(id:string){



const onay=confirm(

"Bu ders silinsin mi?"

);



if(!onay)return;




const {error}=await supabase

.from("lessons")

.delete()

.eq("id",id);





if(error){

console.log(error);

return;

}



setMesaj("🗑 Ders silindi.");



dersleriGetir(seciliEgitim);



}









if(loading){


return(

<div style={page}>

Yükleniyor...

</div>

)

}





return(



<main style={page}>



<h1 style={titleStyle}>

🎥 Ders Yönetimi

</h1>



<p style={desc}>

Eğitimlere ders ekleyin ve yönetin.

</p>









<div style={box}>


<h2 style={gold}>

📚 Eğitim Seç

</h2>



<select

style={input}

value={seciliEgitim}

onChange={(e)=>
egitimSec(e.target.value)
}

>


<option value="">

Eğitim seçiniz

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


</div>









<div style={box}>


<h2 style={gold}>

➕ Yeni Ders Ekle

</h2>





<input

style={input}

placeholder="Ders başlığı"

value={title}

onChange={(e)=>setTitle(e.target.value)}

/>





<textarea

style={textarea}

placeholder="Ders açıklaması"

value={description}

onChange={(e)=>setDescription(e.target.value)}

/>







<input

style={input}

placeholder="Youtube Video URL"

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

type="number"

placeholder="Ders sırası"

value={sira}

onChange={(e)=>setSira(Number(e.target.value))}

/>







<button

style={button}

onClick={dersEkle}

>

💾 Dersi Kaydet

</button>





<p style={message}>

{mesaj}

</p>



</div>









<div style={box}>


<h2 style={gold}>

📖 Ders Listesi

</h2>





{

!seciliEgitim ?


<p>

Ders görmek için eğitim seçiniz.

</p>



:


dersler.length===0 ?


<p>

Bu eğitimde ders yok.

</p>



:


dersler.map((ders,index)=>(



<div

key={ders.id}

style={dersBox}

>



<div>


<h3>

{index+1}. {ders.title}

</h3>



<p>

{ders.description}

</p>



{

ders.video_url &&

<p>

🎥 Video mevcut

</p>

}



{

ders.pdf_url &&

<p>

📄 PDF mevcut

</p>

}



</div>







<button

style={deleteBtn}

onClick={()=>
dersSil(ders.id)
}

>

🗑 Sil

</button>






</div>



))


}




</div>






</main>


)

}









const page={

minHeight:"100vh",

padding:"30px",

color:"white"

};




const titleStyle={

fontSize:"42px",

color:"#d4af37"

};




const desc={

color:"#aaa"

};




const box={

marginTop:"30px",

padding:"30px",

borderRadius:"25px",

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)"

};




const gold={

color:"#d4af37"

};




const input={

width:"100%",

marginTop:"15px",

padding:"15px",

borderRadius:"12px",

background:"#111",

color:"white",

border:"1px solid #d4af37"

};




const textarea={

width:"100%",

height:"120px",

marginTop:"15px",

padding:"15px",

borderRadius:"12px",

background:"#111",

color:"white",

border:"1px solid #d4af37"

};




const button={

marginTop:"20px",

padding:"15px 35px",

borderRadius:"15px",

border:"0",

background:"#d4af37",

fontWeight:900,

cursor:"pointer"

};




const dersBox={

marginTop:"15px",

padding:"20px",

borderRadius:"20px",

background:"rgba(212,175,55,.08)",

border:"1px solid rgba(212,175,55,.3)",

display:"flex",

justifyContent:"space-between",

alignItems:"center"

};




const deleteBtn={

padding:"12px 20px",

borderRadius:"12px",

background:"#8b0000",

color:"white",

border:"0",

cursor:"pointer"

};




const message={

marginTop:"15px",

color:"#d4af37",

fontWeight:900

};