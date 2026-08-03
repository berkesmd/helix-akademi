"use client";

import {useEffect,useState} from "react";
import {useParams,useRouter} from "next/navigation";
import {createClient} from "@/lib/supabase/client";


export default function EgitimPage(){


const supabase=createClient();

const params=useParams();

const router=useRouter();

const id=params.id as string;



const [egitim,setEgitim]=useState<any>(null);

const [dersler,setDersler]=useState<any[]>([]);

const [tamamlanan,setTamamlanan]=useState(0);

const [tamamlananDersler,setTamamlananDersler]=useState<string[]>([]);

const [sinav,setSinav]=useState<any>(null);

const [loading,setLoading]=useState(true);







useEffect(()=>{

if(id){

getir();

}

},[id]);








async function getir(){



const {data:userData}=await supabase.auth.getUser();


const user=userData.user;



if(!user){

router.push("/ogrenci-giris");

return;

}








// eğitim

const {data:course}=await supabase

.from("courses")

.select("*")

.eq("id",id)

.single();



setEgitim(course);










// dersler

const {data:lessons}=await supabase

.from("lessons")

.select("*")

.eq("course_id",id)

.order("lesson_order",{ascending:true});





setDersler(lessons || []);









// tamamlanan dersler

const dersIds=(lessons || [])

.map((d:any)=>d.id);





if(dersIds.length){



const {data:progress}=await supabase

.from("lesson_progress")

.select("lesson_id")

.eq("user_id",user.id)

.eq("completed",true)

.in("lesson_id",dersIds);





setTamamlanan(

progress?.length || 0

);





setTamamlananDersler(

progress?.map((p:any)=>p.lesson_id) || []

);



}









// sınav

const {data:exam}=await supabase

.from("exams")

.select("*")

.eq("course_id",id)

.maybeSingle();



setSinav(exam);





setLoading(false);



}









const tumDerslerBitti =

dersler.length > 0 &&

tamamlanan === dersler.length;









if(loading){


return(

<main style={page}>

Yükleniyor...

</main>

)

}








return(


<main style={page}>






<div style={header}>


<h1>

{egitim?.title}

</h1>



<p>

{egitim?.description}

</p>



<div style={progressBox}>

📚 Ders İlerlemesi:

<strong>

{tamamlanan}/{dersler.length}

</strong>

</div>



</div>








<h2 style={title}>

🎬 Dersler

</h2>









<div style={list}>


{


dersler.length===0 ?


<div style={box}>

Henüz ders bulunmuyor.

</div>




:


dersler.map((ders,index)=>(



<div

key={ders.id}

style={card}

>





<div style={{flex:1}}>


<h2>

{index+1}. {ders.title}

</h2>


<p>

{ders.description}

</p>



{

tamamlananDersler.includes(ders.id)


?


<p style={complete}>

✅ Ders Tamamlandı

</p>



:


<p style={waiting}>

▶ İzlenebilir

</p>


}



</div>






<button

style={button}

onClick={()=>router.push(

`/ogrenci/ders/${ders.id}`

)}

>

DERSİ AÇ

</button>





</div>



))


}



</div>









<div style={examBox}>


<h2 style={gold}>

📝 Sınav

</h2>





{

tumDerslerBitti && sinav ?


<>

<p>

🎉 Tüm dersleri tamamladınız.

</p>



<button

style={examButton}

onClick={()=>router.push(

`/ogrenci/sinav/${sinav.id}`

)}

>

🎓 SINAVA BAŞLA

</button>


</>

:


<>

<p>

🔒 Sınav Kilitli

</p>


<p>

Tüm dersleri tamamladıktan sonra sınava girebilirsiniz.

</p>



<button

disabled

style={locked}

>

🔒 KİLİTLİ

</button>


</>


}



</div>






</main>


)

}









const page={

minHeight:"100vh",

padding:"20px",

color:"white"

};





const header={

padding:"30px",

borderRadius:"30px",

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.4)"

};





const title={

marginTop:"40px",

fontSize:"35px",

color:"#d4af37"

};





const gold={

color:"#d4af37",

fontWeight:900

};





const progressBox={

marginTop:"20px",

padding:"15px",

borderRadius:"15px",

background:"rgba(212,175,55,.15)"

};





const list={

display:"grid",

gap:"20px",

marginTop:"30px"

};





const card={

padding:"25px",

borderRadius:"25px",

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(212,175,55,.3)",

display:"flex",

alignItems:"center",

gap:"20px",

flexWrap:"wrap" as const

};





const button={

padding:"15px 30px",

borderRadius:"15px",

border:"0",

background:"#d4af37",

fontWeight:900,

cursor:"pointer"

};





const complete={

color:"#00ff88",

fontWeight:900

};





const waiting={

color:"#d4af37",

fontWeight:900

};





const examBox={

marginTop:"40px",

padding:"35px",

borderRadius:"30px",

background:"rgba(212,175,55,.1)",

border:"1px solid #d4af37"

};





const examButton={

padding:"18px 40px",

borderRadius:"20px",

background:"#d4af37",

border:"0",

fontWeight:900,

cursor:"pointer"

};





const locked={

padding:"18px 40px",

borderRadius:"20px",

background:"#333",

color:"#888",

border:"1px solid #555",

fontWeight:900

};





const box={

padding:"30px",

borderRadius:"20px",

background:"rgba(255,255,255,.05)"

};