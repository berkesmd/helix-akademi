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






useEffect(()=>{

yukle();

},[]);







async function yukle(){


const {data:courses}=await supabase

.from("courses")

.select("*")

.order("created_at",{ascending:false});


setEgitimler(courses || []);





const {data:exam}=await supabase

.from("exams")

.select("*")

.order("created_at",{ascending:false});


if(exam){

const liste=[];


for(const e of exam){


const {count}=await supabase

.from("questions")

.select("*",{count:"exact",head:true})

.eq("exam_id",e.id);



liste.push({

...e,

soruSayisi:count || 0

});


}


setSinavlar(liste);


}


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

setSoruSayisi(0);


setMesaj("✅ Sınav oluşturuldu");


setSinavAdi("");


yukle();


}









async function soruEkle(){



if(!sinavId){


setMesaj("❌ Önce sınav oluştur");

return;

}





if(soruSayisi>=10){


setMesaj("❌ Bu sınav zaten 10 soruya ulaştı.");

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




setMesaj("✅ Soru eklendi");


setSoru("");

setA("");

setB("");

setC("");

setD("");



setSoruSayisi(soruSayisi+1);



yukle();



}








async function sinavSec(id:string){


setSinavId(id);



const {count}=await supabase

.from("questions")

.select("*",{count:"exact",head:true})

.eq("exam_id",id);



setSoruSayisi(count || 0);


}










return(


<main style={page}>


<h1 style={title}>

📝 Sınav Yönetimi

</h1>






<div style={box}>


<h2 style={gold}>

🎓 Eğitim Seç

</h2>



<select

style={input}

value={seciliEgitim}

onChange={(e)=>

setSeciliEgitim(e.target.value)

}

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


</div>









<div style={box}>


<h2 style={gold}>

➕ Sınav Oluştur

</h2>




<input

style={input}

placeholder="Sınav adı"

value={sinavAdi}

onChange={(e)=>

setSinavAdi(e.target.value)

}

/>




<button

style={button}

onClick={sinavOlustur}

>

Sınav Oluştur

</button>


</div>









<div style={box}>


<h2 style={gold}>

📋 Mevcut Sınavlar

</h2>




{

sinavlar.map((s)=>(


<div

key={s.id}

style={examBox}

onClick={()=>sinavSec(s.id)}

>


<h3>

{s.title}

</h3>


<p>

Sorular:

<b>

{s.soruSayisi}/10

</b>

</p>



{

s.soruSayisi>=10

?

<p style={ready}>

✅ Sınav hazır

</p>

:

<p>

⏳ Eksik soru var

</p>

}



</div>


))


}



</div>









<div style={box}>


<h2 style={gold}>

❓ Soru Ekle

</h2>



<p>

Mevcut soru:

<b>

{soruSayisi}/10

</b>

</p>







<input

style={input}

placeholder="Soru"

value={soru}

onChange={(e)=>

setSoru(e.target.value)

}

/>





<input

style={input}

placeholder="A şıkkı"

value={a}

onChange={(e)=>

setA(e.target.value)

}

/>





<input

style={input}

placeholder="B şıkkı"

value={b}

onChange={(e)=>

setB(e.target.value)

}

/>





<input

style={input}

placeholder="C şıkkı"

value={c}

onChange={(e)=>

setC(e.target.value)

}

/>





<input

style={input}

placeholder="D şıkkı"

value={d}

onChange={(e)=>

setD(e.target.value)

}

/>






<select

style={input}

value={dogru}

onChange={(e)=>

setDogru(e.target.value)

}

>

<option value="A">

Doğru A

</option>

<option value="B">

Doğru B

</option>

<option value="C">

Doğru C

</option>

<option value="D">

Doğru D

</option>


</select>






<button

style={button}

onClick={soruEkle}

>

💾 Soruyu Kaydet

</button>





</div>








<p style={mesajStyle}>

{mesaj}

</p>





</main>


)

}









const page={

padding:"40px",

color:"white"

};



const title={

fontSize:"42px",

color:"#d4af37"

};



const gold={

color:"#d4af37"

};



const box={

marginTop:"30px",

padding:"30px",

borderRadius:"25px",

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)"

};



const examBox={

marginTop:"15px",

padding:"20px",

borderRadius:"20px",

background:"rgba(212,175,55,.08)",

cursor:"pointer"

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

marginTop:"20px",

padding:"15px 35px",

borderRadius:"15px",

background:"#d4af37",

border:"0",

fontWeight:900,

cursor:"pointer"

};



const ready={

color:"#00ff88",

fontWeight:900

};



const mesajStyle={

marginTop:"20px",

color:"#d4af37",

fontWeight:900

};