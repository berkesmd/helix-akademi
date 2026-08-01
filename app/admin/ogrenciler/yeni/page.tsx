"use client";

import {useState} from "react";
import {createClient} from "@/lib/supabase/client";
import {useRouter} from "next/navigation";


export default function OgrenciEkle(){


const supabase=createClient();

const router=useRouter();


const [isim,setIsim]=useState("");

const [email,setEmail]=useState("");

const [telefon,setTelefon]=useState("");

const [sifre,setSifre]=useState("");

const [mesaj,setMesaj]=useState("");





async function kaydet(){



if(!isim || !email || !sifre){

setMesaj("Bilgileri doldurun.");

return;

}





const {data,error}=await supabase.auth.signUp({

email,

password:sifre,

options:{

data:{

full_name:isim,

phone:telefon,

role:"student"

}

}

});





if(error){

setMesaj(error.message);

return;

}







if(data.user){



await supabase

.from("profiles")

.insert({

id:data.user.id,

full_name:isim,

phone:telefon,

email,

role:"student"

});


}





setMesaj("✅ Öğrenci oluşturuldu.");



setTimeout(()=>{


router.push("/admin/ogrenciler");


},1500);



}







return(


<main style={page}>


<h1 style={title}>

➕ Öğrenci Ekle

</h1>





<div style={box}>


<input

placeholder="Ad Soyad"

value={isim}

onChange={(e)=>setIsim(e.target.value)}

style={input}

/>





<input

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

style={input}

/>






<input

placeholder="Telefon"

value={telefon}

onChange={(e)=>setTelefon(e.target.value)}

style={input}

/>






<input

placeholder="Şifre"

type="password"

value={sifre}

onChange={(e)=>setSifre(e.target.value)}

style={input}

/>






<button

onClick={kaydet}

style={button}

>

ÖĞRENCİ KAYDET

</button>





<p style={mesajStyle}>

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

color:"#d4af37",

fontSize:"40px"

};



const box={

marginTop:"30px",

padding:"35px",

borderRadius:"25px",

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)"

};



const input={

width:"100%",

padding:"15px",

marginTop:"15px",

background:"#111",

color:"white",

border:"1px solid #d4af37",

borderRadius:"12px"

};



const button={

marginTop:"25px",

padding:"16px 35px",

background:"#d4af37",

border:"0",

borderRadius:"15px",

fontWeight:900,

cursor:"pointer"

};



const mesajStyle={

marginTop:"20px",

color:"#d4af37",

fontWeight:800

};