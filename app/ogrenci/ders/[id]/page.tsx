"use client";

import {useEffect,useState} from "react";
import {useParams,useRouter} from "next/navigation";
import {createClient} from "@/lib/supabase/client";

export default function DersPage(){

const supabase=createClient();
const params=useParams();
const router=useRouter();

const id=params.id as string;

const [ders,setDers]=useState<any>(null);
const [tamam,setTamam]=useState(false);
const [loading,setLoading]=useState(true);
const [mesaj,setMesaj]=useState("");


useEffect(()=>{
if(id) yukle();
},[id]);


async function yukle(){

const {data}=await supabase
.from("lessons")
.select("*")
.eq("id",id)
.single();

setDers(data);


const {data:userData}=await supabase.auth.getUser();

if(userData.user){

const {data:kontrol}=await supabase
.from("lesson_progress")
.select("*")
.eq("user_id",userData.user.id)
.eq("lesson_id",id)
.maybeSingle();

if(kontrol?.completed){
setTamam(true);
}

}

setLoading(false);

}



async function tamamla(){

const {data:userData}=await supabase.auth.getUser();

if(!userData.user){
setMesaj("Giriş yapmanız gerekiyor.");
return;
}


const {data:mevcut}=await supabase
.from("lesson_progress")
.select("*")
.eq("user_id",userData.user.id)
.eq("lesson_id",id)
.maybeSingle();


if(mevcut){
setTamam(true);
setMesaj("✅ Ders zaten tamamlandı.");
return;
}


const {error}=await supabase
.from("lesson_progress")
.insert({
user_id:userData.user.id,
lesson_id:id,
completed:true
});


if(error){
setMesaj("❌ Ders tamamlanamadı.");
return;
}


setTamam(true);
setMesaj("🎉 Ders başarıyla tamamlandı.");

}



function youtube(url:string){

if(!url)return "";

if(url.includes("watch?v="))
return url.split("watch?v=")[1];

if(url.includes("youtu.be"))
return url.split("youtu.be/")[1];

return "";

}



if(loading)
return <main style={page}>Yükleniyor...</main>;


if(!ders)
return <main style={page}>Ders bulunamadı.</main>;


const video=youtube(ders.video_url);



return(

<main style={page}>

<div style={card}>


<div style={topMenu}>
☰
</div>


<h1 style={title}>
{ders.title}
</h1>


<p style={desc}>
▶ Ders içeriği
</p>


{video &&

<iframe

src={`https://www.youtube.com/embed/${video}`}

style={videoBox}

allowFullScreen

allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

frameBorder="0"

/>

}



{ders.pdf_url &&

<a
href={ders.pdf_url}
target="_blank"
style={pdf}
>
📄 DERS NOTLARI
</a>

}



<button

style={tamamBtn}

disabled={tamam}

onClick={tamamla}

>

{tamam ? "✅ DERS TAMAMLANDI":"✓ DERSİ TAMAMLA"}

</button>



{mesaj &&

<p style={message}>
{mesaj}
</p>

}



<button

style={geri}

onClick={()=>router.back()}

>

← Derslere Dön

</button>


</div>

</main>

)

}



const page={

minHeight:"100vh",

padding:"15px",

background:"radial-gradient(circle at top,#3b2600,#050505 70%)",

color:"white"

};


const card={

width:"100%",

maxWidth:"430px",

margin:"auto",

padding:"20px",

borderRadius:"30px",

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(212,175,55,.4)"

};


const topMenu={

width:"55px",

height:"55px",

borderRadius:"18px",

background:"#d4af37",

color:"#000",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"28px",

marginBottom:"20px"

};


const title={

fontSize:"24px",

color:"#d4af37",

lineHeight:"1.35",

marginBottom:"10px"

};


const desc={

fontSize:"16px",

color:"#ddd"

};


const videoBox={

width:"100%",

aspectRatio:"16 / 9",

height:"auto",

minHeight:"220px",

borderRadius:"25px",

border:"2px solid #d4af37",

marginTop:"20px",

display:"block"

};


const pdf={

display:"block",

marginTop:"20px",

padding:"15px",

textAlign:"center" as const,

background:"#d4af37",

color:"#000",

borderRadius:"15px",

fontWeight:900,

textDecoration:"none"

};


const tamamBtn={

marginTop:"25px",

width:"100%",

padding:"18px",

borderRadius:"20px",

border:"0",

background:"#d4af37",

fontSize:"18px",

fontWeight:900

};


const geri={

marginTop:"20px",

width:"100%",

padding:"15px",

borderRadius:"15px",

background:"transparent",

border:"1px solid #d4af37",

color:"#d4af37"

};


const message={

color:"#d4af37",

textAlign:"center" as const,

marginTop:"20px",

fontWeight:900
};