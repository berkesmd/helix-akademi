"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function EgitimlerPage(){


const supabase=createClient();

const router=useRouter();



const [egitimler,setEgitimler]=useState<any[]>([]);


const [title,setTitle]=useState("");

const [description,setDescription]=useState("");

const [image,setImage]=useState("");

const [category,setCategory]=useState("");

const [status,setStatus]=useState("active");

const [mesaj,setMesaj]=useState("");







async function yukle(){


const {data,error}=await supabase

.from("courses")

.select("*")

.order("created_at",{ascending:false});



if(error){

console.log(error);

return;

}



const liste=[];



for(const egitim of data || []){



const {count}=await supabase

.from("lessons")

.select("*",{count:"exact",head:true})

.eq("course_id",egitim.id);





liste.push({

...egitim,

dersSayisi:count || 0

});



}





setEgitimler(liste);



}







useEffect(()=>{


yukle();


},[]);









async function olustur(){



if(!title || !description){


setMesaj("Lütfen eğitim bilgilerini doldurun.");

return;


}







const {error}=await supabase

.from("courses")

.insert({

title,

description,

image_url:image,

category,

status

});






if(error){

console.log(error);

setMesaj("Eğitim oluşturulamadı.");

return;

}





setMesaj("✅ Eğitim başarıyla oluşturuldu.");



setTitle("");

setDescription("");

setImage("");

setCategory("");

setStatus("active");



yukle();



}









async function sil(id:string){



const onay=confirm(

"Bu eğitimi silmek istediğinize emin misiniz?"

);



if(!onay)return;





// önce dersleri sil

await supabase

.from("lessons")

.delete()

.eq("course_id",id);





// sonra eğitimi sil

await supabase

.from("courses")

.delete()

.eq("id",id);





yukle();



}









return(


<main style={page}>


<h1 style={titleStyle}>

📚 Eğitim Yönetimi

</h1>





<p style={desc}>

Helix Akademi eğitim içeriklerini buradan yönetebilirsiniz.

</p>








<div style={box}>


<h2 style={gold}>

➕ Yeni Eğitim Oluştur

</h2>







<input

placeholder="Eğitim başlığı"

value={title}

onChange={(e)=>setTitle(e.target.value)}

style={input}

/>







<textarea

placeholder="Eğitim açıklaması"

value={description}

onChange={(e)=>setDescription(e.target.value)}

style={textarea}

/>








<input

placeholder="Kapak görsel URL"

value={image}

onChange={(e)=>setImage(e.target.value)}

style={input}

/>







<input

placeholder="Kategori"

value={category}

onChange={(e)=>setCategory(e.target.value)}

style={input}

/>







<select

value={status}

onChange={(e)=>setStatus(e.target.value)}

style={input}

>


<option value="active">

🟢 Aktif

</option>


<option value="passive">

🔴 Pasif

</option>



</select>







<button

onClick={olustur}

style={button}

>

🚀 Eğitimi Oluştur

</button>







<p style={message}>

{mesaj}

</p>






</div>









<h2 style={listTitle}>

📖 Mevcut Eğitimler

</h2>







<div style={grid}>


{

egitimler.map((egitim)=>(


<div

key={egitim.id}

style={card}

>




{

egitim.image_url &&


<img

src={egitim.image_url}

alt={egitim.title}

style={imageStyle}

/>


}







<h2 style={gold}>

📘 {egitim.title}

</h2>







<p>

{egitim.description}

</p>






<span style={tag}>

{egitim.category || "Genel"}

</span>








<p style={lessonCount}>

📚 Ders Sayısı: {egitim.dersSayisi}

</p>







<p>

Durum:

{" "}

{

egitim.status==="active"

?

"🟢 Aktif"

:

"🔴 Pasif"

}

</p>









<div style={actions}>





<button

onClick={()=>router.push(

`/admin/ders-yonetimi?course=${egitim.id}`

)}

style={smallButton}

>

🎥 Dersler

</button>








<button

onClick={()=>router.push(

`/admin/egitimler/duzenle/${egitim.id}`

)}

style={editButton}

>

✏️ Düzenle

</button>








<button

onClick={()=>sil(egitim.id)}

style={deleteButton}

>

🗑 Sil

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

color:"white",

padding:"20px"

};



const titleStyle={

fontSize:"42px",

color:"#d4af37"

};



const desc={

color:"#aaa",

fontSize:"18px"

};



const box={

marginTop:"30px",

padding:"35px",

borderRadius:"25px",

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)"

};



const input={

width:"100%",

padding:"15px",

marginTop:"15px",

background:"#111",

color:"white",

border:"1px solid #d4af37",

borderRadius:"12px"

};



const textarea={

width:"100%",

height:"120px",

padding:"15px",

marginTop:"15px",

background:"#111",

color:"white",

border:"1px solid #d4af37",

borderRadius:"12px"

};



const button={

marginTop:"20px",

padding:"15px 35px",

border:"0",

borderRadius:"15px",

background:"#d4af37",

fontWeight:900,

cursor:"pointer"

};



const grid={

display:"grid",

gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",

gap:"25px"

};



const card={

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)",

borderRadius:"25px",

padding:"25px"

};



const imageStyle={

width:"100%",

height:"180px",

objectFit:"cover" as const,

borderRadius:"20px"

};



const gold={

color:"#d4af37"

};



const tag={

display:"inline-block",

background:"rgba(212,175,55,.15)",

padding:"8px 15px",

borderRadius:"20px",

color:"#d4af37"

};



const lessonCount={

color:"#d4af37",

fontWeight:900

};



const actions={

display:"flex",

gap:"8px",

flexWrap:"wrap" as const,

marginTop:"25px"

};



const smallButton={

padding:"12px 18px",

borderRadius:"10px",

border:"1px solid #d4af37",

background:"transparent",

color:"#d4af37",

cursor:"pointer"

};



const editButton={

padding:"12px 18px",

borderRadius:"10px",

border:"0",

background:"#d4af37",

color:"#000",

cursor:"pointer",

fontWeight:900

};



const deleteButton={

padding:"12px 18px",

borderRadius:"10px",

border:"0",

background:"#8b0000",

color:"white",

cursor:"pointer"

};



const message={

color:"#d4af37",

marginTop:"15px",

fontWeight:700

};


const listTitle={

color:"#d4af37",

marginTop:"50px"

};