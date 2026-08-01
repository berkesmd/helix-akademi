"use client";


import {useEffect,useState} from "react";
import {createClient} from "@/lib/supabase/client";



export default function AyarlarPage(){


const supabase=createClient();



const [siteAdi,setSiteAdi]=useState("");

const [telefon,setTelefon]=useState("");

const [email,setEmail]=useState("");

const [whatsapp,setWhatsapp]=useState("");

const [aciklama,setAciklama]=useState("");

const [video,setVideo]=useState("");

const [mesaj,setMesaj]=useState("");





useEffect(()=>{


getir();


},[]);







async function getir(){


const {data}=await supabase

.from("site_settings")

.select("*")

.single();





if(data){


setSiteAdi(data.site_name || "");

setTelefon(data.phone || "");

setEmail(data.email || "");

setWhatsapp(data.whatsapp || "");

setAciklama(data.description || "");

setVideo(data.intro_video || "");


}



}









async function kaydet(){



const {data}=await supabase

.from("site_settings")

.select("*")

.single();







const bilgi={


site_name:siteAdi,

phone:telefon,

email,

whatsapp,

description:aciklama,

intro_video:video


};







if(data){


await supabase

.from("site_settings")

.update(bilgi)

.eq("id",data.id);



}else{



await supabase

.from("site_settings")

.insert(bilgi);



}






setMesaj("✅ Ayarlar kaydedildi.");



}









return(


<main style={page}>


<h1 style={title}>

⚙️ Site Ayarları

</h1>






<div style={box}>


<label>

Site Adı

</label>


<input

value={siteAdi}

onChange={(e)=>setSiteAdi(e.target.value)}

style={input}

placeholder="Helix Akademi"

/>







<label>

Telefon

</label>


<input

value={telefon}

onChange={(e)=>setTelefon(e.target.value)}

style={input}

placeholder="+90"

/>








<label>

Email

</label>


<input

value={email}

onChange={(e)=>setEmail(e.target.value)}

style={input}

placeholder="mail@site.com"

/>








<label>

WhatsApp

</label>


<input

value={whatsapp}

onChange={(e)=>setWhatsapp(e.target.value)}

style={input}

placeholder="905xxxxxxxxx"

/>








<label>

Tanıtım Video Linki

</label>


<input

value={video}

onChange={(e)=>setVideo(e.target.value)}

style={input}

placeholder="Youtube linki"

/>








<label>

Site Açıklaması

</label>


<textarea

value={aciklama}

onChange={(e)=>setAciklama(e.target.value)}

style={textarea}

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

padding:"40px",

color:"white"

};





const title={

fontSize:"42px",

color:"#d4af37"

};





const box={

maxWidth:"800px",

marginTop:"30px",

padding:"35px",

borderRadius:"25px",

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)"

};





const input={

width:"100%",

padding:"15px",

marginTop:"10px",

marginBottom:"20px",

background:"#111",

color:"white",

border:"1px solid #d4af37",

borderRadius:"12px"

};





const textarea={

width:"100%",

height:"120px",

padding:"15px",

background:"#111",

color:"white",

border:"1px solid #d4af37",

borderRadius:"12px"

};





const button={

marginTop:"25px",

padding:"16px 40px",

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