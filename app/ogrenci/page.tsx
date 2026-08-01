"use client";


import {useEffect,useState} from "react";
import {createClient} from "@/lib/supabase/client";
import {useRouter} from "next/navigation";



export default function OgrenciPage(){


const supabase=createClient();

const router=useRouter();



const [isim,setIsim]=useState("");

const [video,setVideo]=useState("");

const [egitimler,setEgitimler]=useState<any[]>([]);

const [loading,setLoading]=useState(true);









useEffect(()=>{


yukle();


},[]);









async function yukle(){



const {

data:userData

}=await supabase.auth.getUser();



const user=userData.user;




if(!user){

router.push("/ogrenci-giris");

return;

}









// öğrenci adı

const {data:profil}=await supabase

.from("profiles")

.select("*")

.eq("id",user.id)

.single();



setIsim(

profil?.full_name || "Öğrenci"

);









// tanıtım videosu

const {data:ayar}=await supabase

.from("site_settings")

.select("*")

.single();



setVideo(

ayar?.intro_video || ""

);









// eğitimler

const {data:kayitlar}=await supabase

.from("enrollments")

.select(`

courses(

id,

title,

description

)

`)

.eq("user_id",user.id);









let liste:any[]=[];







for(const item of kayitlar || []){



const course=

Array.isArray(item.courses)

?

item.courses[0]

:

item.courses;



if(!course) continue;







const {data:dersler}=await supabase

.from("lessons")

.select("id")

.eq("course_id",course.id);





const ids=

(dersler || [])

.map((d:any)=>d.id);





let tamam=0;






if(ids.length){



const {data:progress}=await supabase

.from("lesson_progress")

.select("lesson_id")

.eq("user_id",user.id)

.eq("completed",true)

.in(

"lesson_id",

ids

);



tamam=progress?.length || 0;



}







const toplam=ids.length;



const yuzde=

toplam===0

?

0

:

Math.round(

(tamam/toplam)*100

);








liste.push({

...course,

tamam,

toplam,

yuzde

});




}







setEgitimler(liste);


setLoading(false);



}









function youtube(url:string){


if(!url){

return "";

}



if(url.includes("watch?v=")){


const id=

url.split("watch?v=")[1]

.split("&")[0];



return `https://www.youtube.com/embed/${id}`;


}




if(url.includes("youtu.be")){


const id=

url.split("youtu.be/")[1]

.split("?")[0];



return `https://www.youtube.com/embed/${id}`;


}




return url;


}









if(loading){


return(

<main style={page}>

Yükleniyor...

</main>

)

}








return(


<main style={page}>






<div style={welcome}>


<h1>

Hoş Geldin 👋

</h1>



<h2 style={gold}>

{isim}

</h2>



<p>

Helix Akademi eğitim platformuna hoş geldin.

</p>



</div>









{

video &&


<div style={box}>


<h2 style={gold}>

🎬 Tanıtım Videomuz

</h2>




<iframe

src={youtube(video)}

style={iframe}

allowFullScreen

/>




</div>


}









<div style={box}>


<h2 style={gold}>

📚 Eğitimlerim

</h2>









{

egitimler.length===0 ?


<p>

Henüz atanmış eğitim yok.

</p>



:


egitimler.map((e)=>(


<div

key={e.id}

style={card}

>



<h2>

{e.title}

</h2>



<p>

{e.description}

</p>





<p>

🎥 Ders:

{e.tamam}

/

{e.toplam}

</p>






<div style={bar}>


<div

style={{

...fill,

width:`${e.yuzde}%`

}}

/>


</div>





<h3 style={gold}>

İlerleme %{e.yuzde}

</h3>






<button

style={button}

onClick={()=>router.push(

`/ogrenci/egitim/${e.id}`

)}

>

▶ Eğitime Devam Et

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





const welcome={

padding:"35px",

borderRadius:"30px",

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)"

};





const box={

marginTop:"30px",

padding:"30px",

borderRadius:"30px",

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)"

};





const gold={

color:"#d4af37"

};





const iframe={

width:"100%",

aspectRatio:"16/9",

border:"0",

borderRadius:"20px"

};





const card={

marginTop:"20px",

padding:"25px",

borderRadius:"25px",

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(212,175,55,.3)"

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





const button={

marginTop:"20px",

padding:"15px 30px",

borderRadius:"15px",

border:"0",

background:"#d4af37",

fontWeight:900,

cursor:"pointer"

};