"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";


export default function EgitimAtamaPage(){


const supabase=createClient();



const [ogrenciler,setOgrenciler]=useState<any[]>([]);

const [egitimler,setEgitimler]=useState<any[]>([]);



const [ogrenci,setOgrenci]=useState("");

const [egitim,setEgitim]=useState("");

const [mesaj,setMesaj]=useState("");







useEffect(()=>{


async function yukle(){



const {data:ogrenciData}=await supabase

.from("profiles")

.select("id,full_name")

.eq("role","student");



setOgrenciler(ogrenciData || []);







const {data:egitimData}=await supabase

.from("courses")

.select("id,title")

.eq("status","active");



setEgitimler(egitimData || []);




}



yukle();



},[]);









async function ata(){



if(!ogrenci || !egitim){


setMesaj("Lütfen öğrenci ve eğitim seçiniz.");

return;


}






const {data:kontrol}=await supabase

.from("enrollments")

.select("id")

.eq("user_id",ogrenci)

.eq("course_id",egitim)

.single();





if(kontrol){


setMesaj("Bu eğitim zaten öğrenciye atanmış.");

return;


}







const {error}=await supabase

.from("enrollments")

.insert({

user_id:ogrenci,

course_id:egitim

});







if(error){


setMesaj("Eğitim atanırken hata oluştu.");

return;


}





setMesaj("✅ Eğitim başarıyla öğrenciye atandı.");



setOgrenci("");

setEgitim("");



}








return(


<main style={page}>


<h1 style={title}>

🎓 Eğitim Atama

</h1>



<p style={desc}>

Öğrencilere eğitim atamalarını buradan gerçekleştirebilirsiniz.

</p>








<div style={card}>


<h2 style={gold}>

Yeni Eğitim Ataması

</h2>






<label>

👨‍🎓 Öğrenci Seç

</label>



<select

value={ogrenci}

onChange={(e)=>setOgrenci(e.target.value)}

style={input}

>


<option value="">

Öğrenci seçiniz

</option>



{

ogrenciler.map((item)=>(


<option

key={item.id}

value={item.id}

>

{item.full_name}

</option>


))


}



</select>








<label>

📚 Eğitim Seç

</label>



<select

value={egitim}

onChange={(e)=>setEgitim(e.target.value)}

style={input}

>


<option value="">

Eğitim seçiniz

</option>



{

egitimler.map((item)=>(


<option

key={item.id}

value={item.id}

>

{item.title}

</option>


))


}



</select>









<button

onClick={ata}

style={button}

>

🎓 Eğitimi Öğrenciye Ata

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




const title={

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

background:"#111",

color:"white",

border:"1px solid #d4af37",

borderRadius:"12px",

fontSize:"16px"

};




const button={

marginTop:"20px",

padding:"16px 35px",

border:"0",

borderRadius:"15px",

background:

"linear-gradient(135deg,#d4af37,#f5d76e)",

fontWeight:900,

cursor:"pointer"

};




const gold={

color:"#d4af37"

};



const message={

marginTop:"20px",

color:"#d4af37",

fontWeight:700

};