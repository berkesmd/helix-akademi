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

const [rol,setRol]=useState("student");

const [mesaj,setMesaj]=useState("");

const [yukleniyor,setYukleniyor]=useState(true);








useEffect(()=>{


if(id){

yukle();

}


},[id]);









async function yukle(){


setYukleniyor(true);



// öğrenci

const {data:profil}=await supabase

.from("profiles")

.select("*")

.eq("id",id)

.single();



setOgrenci(profil);

setRol(profil?.role || "student");






// tüm eğitimler

const {data:courses}=await supabase

.from("courses")

.select("*")

.order("created_at",{ascending:false});



setTumEgitimler(courses || []);








// öğrenci eğitimleri

const {data:kayitlar}=await supabase

.from("enrollments")

.select(`

id,

course_id,

courses(

id,

title,

description

)

`)

.eq("user_id",id);






let liste:any[]=[];






for(const kayit of kayitlar || []){



const course=

Array.isArray(kayit.courses)

?

kayit.courses[0]

:

kayit.courses;



if(!course) continue;








const {data:dersler}=await supabase

.from("lessons")

.select("id")

.eq("course_id",course.id);





const dersIds=

(dersler || [])

.map((d:any)=>d.id);





let tamamlanan=0;





if(dersIds.length){



const {data:progress}=await supabase

.from("lesson_progress")

.select("lesson_id")

.eq("user_id",id)

.eq("completed",true)

.in(

"lesson_id",

dersIds

);



tamamlanan=progress?.length || 0;


}





const toplam=dersIds.length;



const yuzde=

toplam===0

?

0

:

Math.round(

(tamamlanan/toplam)*100

);






liste.push({

kayitId:kayit.id,

course,

toplam,

tamamlanan,

yuzde

});



}






setEgitimler(liste);


setYukleniyor(false);



}









async function rolGuncelle(){



const {error}=await supabase

.from("profiles")

.update({

role:rol

})

.eq("id",id);





if(error){

console.log(error);

setMesaj("❌ Rol değiştirilemedi.");

return;

}



setMesaj("✅ Rol güncellendi.");



yukle();



}









async function egitimAta(){



if(!seciliEgitim){

setMesaj("Eğitim seçiniz.");

return;

}





const varMi=

egitimler.find(

(x)=>x.course.id===seciliEgitim

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

console.log(error);

setMesaj("❌ Eğitim atanamadı.");

return;

}



setMesaj("✅ Eğitim atandı.");

setSeciliEgitim("");



yukle();



}









async function egitimSil(idKayit:string){



const onay=confirm(

"Eğitim kaldırılacak. Emin misiniz?"

);



if(!onay)return;





await supabase

.from("enrollments")

.delete()

.eq("id",idKayit);





setMesaj("Eğitim kaldırıldı.");

yukle();



}









if(yukleniyor){


return(

<main style={page}>

<h2>

Yükleniyor...

</h2>

</main>

)

}









return(


<main style={page}>


<h1 style={title}>

👤 Öğrenci Detayı

</h1>








<div style={box}>


<h2 style={gold}>

{ogrenci?.full_name || "Öğrenci"}

</h2>


<p>

📧 {ogrenci?.email}

</p>


<p>

📱 {ogrenci?.phone || "Telefon yok"}

</p>



<p>

🎭 Mevcut Rol:

{ogrenci?.role}

</p>



</div>









<div style={box}>


<h2 style={gold}>

🎭 Rol Yönetimi

</h2>





<select

style={select}

value={rol}

onChange={(e)=>setRol(e.target.value)}

>


<option value="student">

👨‍🎓 Öğrenci

</option>


<option value="admin">

👑 Admin

</option>


</select>





<button

style={button}

onClick={rolGuncelle}

>

💾 Rolü Kaydet

</button>




</div>









<div style={box}>


<h2 style={gold}>

➕ Eğitim Ata

</h2>





<select

style={select}

value={seciliEgitim}

onChange={(e)=>setSeciliEgitim(e.target.value)}

>


<option value="">

Eğitim seçiniz

</option>




{

tumEgitimler.map((e)=>(


<option

key={e.id}

value={e.id}

>

{e.title}

</option>


))

}



</select>





<button

style={button}

onClick={egitimAta}

>

📚 Öğrenciye Ata

</button>



</div>









<div style={box}>


<h2 style={gold}>

📚 Eğitimler

</h2>







{

egitimler.length===0 ?


<p>

Henüz eğitim yok.

</p>



:


egitimler.map((item)=>(


<div

key={item.kayitId}

style={courseBox}

>



<h2>

{item.course.title}

</h2>



<p>

{item.course.description}

</p>




<p>

🎥 Ders:

{item.tamamlanan}

/

{item.toplam}

</p>





<div style={bar}>


<div

style={{

...fill,

width:`${item.yuzde}%`

}}

/>


</div>



<h3 style={gold}>

İlerleme %{item.yuzde}

</h3>






<button

style={deleteBtn}

onClick={()=>egitimSil(item.kayitId)}

>

🗑 Eğitimi Kaldır

</button>




</div>


))


}





</div>








<p style={message}>

{mesaj}

</p>






</main>


)

}









const page={

minHeight:"100vh",

padding:"40px",

color:"white",

background:

"radial-gradient(circle at top,#302300,#050505)"

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




const select={

width:"100%",

padding:"15px",

marginTop:"15px",

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




const courseBox={

marginTop:"20px",

padding:"25px",

background:"rgba(212,175,55,.08)",

borderRadius:"20px"

};




const bar={

height:"12px",

background:"#333",

borderRadius:"20px",

overflow:"hidden"

};




const fill={

height:"100%",

background:"#d4af37"

};




const deleteBtn={

marginTop:"20px",

padding:"12px 25px",

background:"#8b0000",

color:"white",

border:"0",

borderRadius:"12px",

cursor:"pointer"

};




const message={

color:"#d4af37",

marginTop:"20px",

fontWeight:900

};