"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";


export default function ProfilPage(){


const supabase=createClient();


const [user,setUser]=useState<any>(null);


const [form,setForm]=useState({

full_name:"",

email:"",

phone:"",

avatar_url:""

});


const [mesaj,setMesaj]=useState("");





useEffect(()=>{


async function yukle(){


const {data:{user}}=

await supabase.auth.getUser();



if(!user)return;


setUser(user);





const {data}=await supabase

.from("profiles")

.select("*")

.eq("id",user.id)

.single();





if(data){


setForm({

full_name:data.full_name || "",

email:data.email || user.email || "",

phone:data.phone || "",

avatar_url:data.avatar_url || ""

});


}



}



yukle();


},[]);









function degistir(e:any){


setForm({

...form,

[e.target.name]:e.target.value

});


}









async function kaydet(){



if(!user)return;




const {error}=await supabase

.from("profiles")

.update({

full_name:form.full_name,

email:form.email,

phone:form.phone,

avatar_url:form.avatar_url

})

.eq("id",user.id);







if(error){

setMesaj("❌ Güncelleme başarısız.");

return;

}



setMesaj("✅ Profil başarıyla güncellendi.");



}










async function sifreDegistir(){


if(!form.email)return;



const {error}=await supabase.auth

.resetPasswordForEmail(form.email);



if(error){

setMesaj("❌ Şifre işlemi başarısız.");

return;

}



setMesaj(

"📩 Şifre değiştirme bağlantısı gönderildi."

);


}










return(


<main style={page}>


<h1 style={title}>

👤 Profilim

</h1>


<p style={desc}>

Kişisel bilgilerinizi buradan güncelleyebilirsiniz.

</p>









<div style={card}>



{

form.avatar_url &&


<img

src={form.avatar_url}

style={avatar}

/>



}




<input

name="avatar_url"

placeholder="Profil fotoğraf URL"

value={form.avatar_url}

onChange={degistir}

style={input}

/>






<label>

Ad Soyad

</label>


<input

name="full_name"

value={form.full_name}

onChange={degistir}

style={input}

/>







<label>

E-posta

</label>



<input

name="email"

value={form.email}

onChange={degistir}

style={input}

/>







<label>

Telefon

</label>


<input

name="phone"

value={form.phone}

onChange={degistir}

style={input}

/>







<button

onClick={kaydet}

style={button}

>

💾 Bilgileri Kaydet

</button>







<button

onClick={sifreDegistir}

style={passwordButton}

>

🔐 Şifre Değiştir

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

background:

"radial-gradient(circle at top,#302300,#050505 60%)",

color:"white",

padding:"40px"

};



const title={

fontSize:"45px",

color:"#d4af37"

};



const desc={

color:"#aaa",

fontSize:"18px"

};



const card={

maxWidth:"600px",

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)",

borderRadius:"25px",

padding:"35px"

};



const avatar={

width:"130px",

height:"130px",

borderRadius:"50%",

objectFit:"cover" as const,

border:"3px solid #d4af37",

marginBottom:"20px"

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



const button={

width:"100%",

padding:"15px",

background:"#d4af37",

border:"0",

borderRadius:"15px",

fontWeight:900,

cursor:"pointer"

};



const passwordButton={

width:"100%",

padding:"15px",

marginTop:"15px",

background:"transparent",

color:"#d4af37",

border:"1px solid #d4af37",

borderRadius:"15px",

fontWeight:900,

cursor:"pointer"

};



const message={

marginTop:"20px",

color:"#d4af37",

fontWeight:700

};