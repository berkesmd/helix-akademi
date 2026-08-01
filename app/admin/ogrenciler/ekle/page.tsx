"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function OgrenciEklePage(){


const supabase=createClient();

const router=useRouter();



const [isim,setIsim]=useState("");

const [email,setEmail]=useState("");

const [telefon,setTelefon]=useState("");

const [sifre,setSifre]=useState("");

const [rol,setRol]=useState("student");

const [mesaj,setMesaj]=useState("");

const [loading,setLoading]=useState(false);









async function kaydet(){


if(!isim || !email || !sifre){

setMesaj("Lütfen zorunlu alanları doldurun.");

return;

}



setLoading(true);





// kullanıcı oluştur

const {

data:userData,

error:userError

}=await supabase.auth.signUp({

email,

password:sifre,

});






if(userError){

setMesaj(userError.message);

setLoading(false);

return;

}





const user=userData.user;



if(!user){

setMesaj("Kullanıcı oluşturulamadı.");

setLoading(false);

return;

}








// profile oluştur

const {error:profilError}=await supabase

.from("profiles")

.insert({

id:user.id,

full_name:isim,

email,

phone:telefon,

role:rol

});







if(profilError){

console.log(profilError);

setMesaj("Profil oluşturulamadı.");

setLoading(false);

return;

}






setMesaj("✅ Öğrenci başarıyla oluşturuldu.");



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


<h2 style={gold}>

Yeni Kullanıcı

</h2>







<input

style={input}

placeholder="Ad Soyad"

value={isim}

onChange={(e)=>setIsim(e.target.value)}

/>







<input

style={input}

placeholder="Email"

type="email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>







<input

style={input}

placeholder="Telefon"

value={telefon}

onChange={(e)=>setTelefon(e.target.value)}

/>








<input

style={input}

placeholder="Şifre"

type="password"

value={sifre}

onChange={(e)=>setSifre(e.target.value)}

/>







<select

style={input}

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

onClick={kaydet}

disabled={loading}

>

{

loading

?

"Kaydediliyor..."

:

"💾 Kaydet"

}

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

maxWidth:"600px",

padding:"35px",

margin:"30px auto",

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





const message={

marginTop:"20px",

color:"#d4af37",

fontWeight:900

};