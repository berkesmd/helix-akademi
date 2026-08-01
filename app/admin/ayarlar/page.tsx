"use client";


import {useEffect,useState} from "react";
import {createClient} from "@/lib/supabase/client";



export default function AyarlarPage(){


const supabase=createClient();



const [video,setVideo]=useState("");

const [mesaj,setMesaj]=useState("");

const [loading,setLoading]=useState(true);






useEffect(()=>{


getir();


},[]);







async function getir(){



const {data}=await supabase

.from("site_settings")

.select("*")

.single();



setVideo(

data?.intro_video || ""

);



setLoading(false);


}









async function kaydet(){



const {data}=await supabase

.from("site_settings")

.select("*")

.single();





if(data){



const {error}=await supabase

.from("site_settings")

.update({

intro_video:video

})

.eq("id",data.id);





if(error){

setMesaj("❌ Güncellenemedi.");

return;

}





}else{



const {error}=await supabase

.from("site_settings")

.insert({

intro_video:video

});




if(error){

setMesaj("❌ Kaydedilemedi.");

return;

}


}






setMesaj(

"✅ Tanıtım videosu güncellendi."

);



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


<h1 style={title}>

⚙️ Site Ayarları

</h1>



<div style={box}>


<h2 style={gold}>

🎬 Tanıtım Videosu

</h2>




<p>

YouTube linkini giriniz.

</p>





<input

style={input}

placeholder="https://youtube.com/watch?v="

value={video}

onChange={(e)=>setVideo(e.target.value)}

/>





<button

style={button}

onClick={kaydet}

>

💾 Kaydet

</button>





<p style={message}>

{mesaj}

</p>





</div>





</main>


)

}









const page={

minHeight:"100vh",

padding:"40px",

color:"white"

};




const title={

fontSize:"42px",

color:"#d4af37"

};




const box={

maxWidth:"700px",

marginTop:"30px",

padding:"35px",

borderRadius:"25px",

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)"

};




const gold={

color:"#d4af37"

};




const input={

width:"100%",

padding:"15px",

marginTop:"20px",

background:"#111",

color:"white",

border:"1px solid #d4af37",

borderRadius:"12px"

};




const button={

marginTop:"20px",

padding:"15px 35px",

background:"#d4af37",

border:"0",

borderRadius:"15px",

fontWeight:900,

cursor:"pointer"

};




const message={

marginTop:"20px",

color:"#d4af37",

fontWeight:900

};