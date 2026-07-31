"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";


export default function EgitimDuzenlePage(){


const supabase=createClient();

const router=useRouter();

const params=useParams();

const id=params.id as string;



const [title,setTitle]=useState("");

const [description,setDescription]=useState("");

const [image,setImage]=useState("");

const [category,setCategory]=useState("");

const [status,setStatus]=useState("active");

const [mesaj,setMesaj]=useState("");







useEffect(()=>{


async function yukle(){


const {data,error}=await supabase

.from("courses")

.select("*")

.eq("id",id)

.single();





if(error){

console.log(error);

return;

}



if(data){

setTitle(data.title || "");

setDescription(data.description || "");

setImage(data.image_url || "");

setCategory(data.category || "");

setStatus(data.status || "active");

}



}



if(id){

yukle();

}



},[id]);









async function kaydet(){



const {error}=await supabase

.from("courses")

.update({

title,

description,

image_url:image,

category,

status

})

.eq("id",id);







if(error){

setMesaj("Güncelleme başarısız oldu.");

return;

}





setMesaj("✅ Eğitim başarıyla güncellendi.");





setTimeout(()=>{

router.push("/admin/egitimler");

},1200);



}








return(


<main style={page}>


<h1 style={titleStyle}>

✏️ Eğitim Düzenleme

</h1>



<p style={desc}>

Eğitim bilgilerini güncelleyin ve içerik yönetimini sağlayın.

</p>







<div style={card}>


<label>

📘 Eğitim Başlığı

</label>


<input

value={title}

onChange={(e)=>setTitle(e.target.value)}

style={input}

/>






<label>

📝 Eğitim Açıklaması

</label>


<textarea

value={description}

onChange={(e)=>setDescription(e.target.value)}

style={textarea}

/>







<label>

🖼 Kapak Görseli

</label>


<input

value={image}

onChange={(e)=>setImage(e.target.value)}

style={input}

/>








<label>

📂 Kategori

</label>


<input

value={category}

onChange={(e)=>setCategory(e.target.value)}

style={input}

/>







<label>

⚡ Durum

</label>


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

onClick={kaydet}

style={button}

>

✓ Değişiklikleri Kaydet

</button>






<p

style={message}

>

{mesaj}

</p>





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



const card={

marginTop:"35px",

padding:"40px",

borderRadius:"25px",

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)",

display:"grid",

gap:"15px"

};



const input={

width:"100%",

padding:"15px",

borderRadius:"12px",

background:"#111",

color:"white",

border:"1px solid #d4af37",

fontSize:"16px"

};



const textarea={

width:"100%",

height:"140px",

padding:"15px",

borderRadius:"12px",

background:"#111",

color:"white",

border:"1px solid #d4af37",

fontSize:"16px"

};



const button={

marginTop:"25px",

padding:"16px",

borderRadius:"15px",

border:"0",

background:

"linear-gradient(135deg,#d4af37,#f5d76e)",

fontWeight:900,

fontSize:"16px",

cursor:"pointer"

};



const message={

color:"#d4af37",

fontWeight:700,

marginTop:"15px"

};