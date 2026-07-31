"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";


export default function OgrenciDetayPage(){


const supabase=createClient();

const params=useParams();

const id=params.id as string;



const [ogrenci,setOgrenci]=useState<any>(null);

const [egitimler,setEgitimler]=useState<any[]>([]);

const [tumEgitimler,setTumEgitimler]=useState<any[]>([]);

const [seciliEgitim,setSeciliEgitim]=useState("");

const [mesaj,setMesaj]=useState("");

const [yukleniyor,setYukleniyor]=useState(true);









useEffect(()=>{


if(id){

yukle();

}


},[id]);









async function yukle(){



setYukleniyor(true);






const {data:profile}=await supabase

.from("profiles")

.select("*")

.eq("id",id)

.maybeSingle();




setOgrenci(profile);








const {data:courses}=await supabase

.from("courses")

.select("*")

.order("created_at",{ascending:false});



setTumEgitimler(courses || []);








const {data:kayitlar}=await supabase

.from("enrollments")

.select("id,course_id")

.eq("user_id",id);







const liste:any[]=[];







for(const kayit of kayitlar || []){


const course=courses?.find(

(x:any)=>x.id===kayit.course_id

);





if(!course)continue;







const {data:dersler}=await supabase

.from("lessons")

.select("id")

.eq("course_id",course.id);







const ids=(dersler || [])

.map((d:any)=>d.id);







let tamamlanan=0;






if(ids.length){


const {data:progress}=await supabase

.from("lesson_progress")

.select("lesson_id")

.eq("user_id",id)

.in("lesson_id",ids);



tamamlanan=progress?.length || 0;



}








liste.push({

...course,

kayit_id:kayit.id,

toplam:ids.length,

tamamlanan

});





}







setEgitimler(liste);


setYukleniyor(false);



}









async function egitimAta(){



if(!seciliEgitim){

setMesaj("Eğitim seçiniz.");

return;

}





const varMi=egitimler.find(

(x)=>x.id===seciliEgitim

);



if(varMi){

setMesaj("Bu eğitim zaten atanmış.");

return;

}







const {error}=await supabase

.from("enrollments")

.insert({

user_id:id,

student_id:id,

course_id:seciliEgitim

});








if(error){

setMesaj("❌ Eğitim atanamadı.");

console.log(error);

return;

}






setMesaj("✅ Eğitim başarıyla atandı.");



setSeciliEgitim("");



yukle();



}









async function egitimSil(kayitId:string){



const onay=confirm(

"Eğitim kaldırılacak. Emin misiniz?"

);



if(!onay)return;







await supabase

.from("enrollments")

.delete()

.eq("id",kayitId);







setMesaj("Eğitim kaldırıldı.");



yukle();



}









return(


<main style={page}>


{

yukleniyor ?


<h2>

Yükleniyor...

</h2>



:


<>


<h1 style={title}>

👤 Öğrenci Detayı

</h1>








<div style={profileBox}>


<h2 style={gold}>

{ogrenci?.full_name || "Öğrenci"}

</h2>



<p>

📧 {ogrenci?.email || "Email yok"}

</p>



<p>

📱 {ogrenci?.phone || "Telefon yok"}

</p>



</div>









<div style={section}>


<h2 style={gold}>

➕ Eğitim Ata

</h2>






<select

value={seciliEgitim}

onChange={(e)=>setSeciliEgitim(e.target.value)}

style={input}

>


<option value="">

Eğitim seçiniz

</option>





{

tumEgitimler

.filter(

(e)=>

!egitimler.some(

(x)=>x.id===e.id

)

)

.map((egitim)=>(


<option

key={egitim.id}

value={egitim.id}

>

{egitim.title}

</option>


))


}



</select>






<button

onClick={egitimAta}

style={button}

>

📚 Öğrenciye Ata

</button>






<p style={message}>

{mesaj}

</p>




</div>









<div style={section}>


<h2 style={gold}>

📚 Aldığı Eğitimler

</h2>






{

egitimler.length===0 ?


<p>

Eğitim bulunamadı.

</p>



:


egitimler.map((egitim)=>(


<div

key={egitim.id}

style={course}

>



<h3>

📘 {egitim.title}

</h3>



<p>

🎥 Ders:

{egitim.tamamlanan}

/

{egitim.toplam}

</p>







<button

onClick={()=>egitimSil(egitim.kayit_id)}

style={deleteButton}

>

🗑 Eğitimi Kaldır

</button>





</div>


))


}



</div>





</>

}



</main>


)

}









const page={

minHeight:"100vh",

background:

"radial-gradient(circle at top,#302300,#050505 60%)",

color:"white",

padding:"40px"

};



const title={

fontSize:"42px",

color:"#d4af37"

};



const gold={

color:"#d4af37"

};



const profileBox={

marginTop:"30px",

padding:"30px",

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)",

borderRadius:"25px"

};



const section={

marginTop:"35px",

padding:"30px",

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)",

borderRadius:"25px"

};



const input={

width:"100%",

padding:"15px",

background:"#111",

color:"white",

border:"1px solid #d4af37",

borderRadius:"12px"

};



const button={

marginTop:"20px",

padding:"15px 30px",

background:"#d4af37",

border:"0",

borderRadius:"15px",

fontWeight:900,

cursor:"pointer"

};



const course={

marginTop:"20px",

padding:"25px",

background:"rgba(212,175,55,.08)",

borderRadius:"20px"

};



const deleteButton={

marginTop:"15px",

padding:"12px 25px",

background:"#8b0000",

color:"white",

border:"0",

borderRadius:"12px",

cursor:"pointer"

};



const message={

color:"#d4af37",

marginTop:"15px",

fontWeight:700

};