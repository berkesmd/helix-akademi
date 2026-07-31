"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";


export default function BildirimlerPage(){


const supabase=createClient();



const [ogrenciler,setOgrenciler]=useState<any[]>([]);

const [bildirimler,setBildirimler]=useState<any[]>([]);


const [userId,setUserId]=useState("");

const [baslik,setBaslik]=useState("");

const [mesaj,setMesaj]=useState("");

const [durum,setDurum]=useState("");







useEffect(()=>{

yukle();

},[]);








async function yukle(){


const {data:users,error:userError}=await supabase

.from("profiles")

.select("*")

.eq("role","student")

.order("created_at",{ascending:false});




console.log("Öğrenciler:",users);

console.log("Öğrenci hata:",userError);




setOgrenciler(users || []);








const {data,error}=await supabase

.from("notifications")

.select("*")

.order("created_at",{ascending:false});





console.log("Bildirimler:",data);

console.log("Bildirim okuma hata:",error);



setBildirimler(data || []);



}









async function gonder(){



if(!userId || !baslik || !mesaj){


setDurum(
"❌ Tüm alanları doldurun."
);


return;


}







const veri={

user_id:userId,

title:baslik,

message:mesaj,

read:false

};






console.log(
"Gönderilecek veri:",
veri
);






const {data,error}=await supabase

.from("notifications")

.insert(veri)

.select();







console.log(
"Kayıt sonucu:",
data
);


console.log(
"Hata:",
error
);








if(error){


setDurum(

"❌ "+error.message

);


return;


}







setDurum(

"✅ Bildirim gönderildi."

);





setUserId("");

setBaslik("");

setMesaj("");



yukle();



}









return(


<main style={page}>


<h1 style={title}>

📢 Bildirim Yönetimi

</h1>



<p style={desc}>

Öğrencilere bildirim gönder.

</p>










<div style={box}>


<h2 style={gold}>

📤 Yeni Bildirim

</h2>







<select

style={input}

value={userId}

onChange={(e)=>setUserId(e.target.value)}

>


<option value="">

Öğrenci seçiniz

</option>



{

ogrenciler.map((ogrenci)=>(


<option

key={ogrenci.id}

value={ogrenci.id}

>

{ogrenci.full_name || "İsimsiz"}

</option>



))


}



</select>









<input

style={input}

placeholder="Başlık"

value={baslik}

onChange={(e)=>setBaslik(e.target.value)}

/>









<textarea

style={textarea}

placeholder="Mesaj"

value={mesaj}

onChange={(e)=>setMesaj(e.target.value)}

/>









<button

style={button}

onClick={gonder}

>

📤 Gönder

</button>






<p style={message}>

{durum}

</p>





</div>









<div style={box}>


<h2 style={gold}>

🔔 Bildirimler

</h2>







{

bildirimler.length===0 ?


<p>

Henüz bildirim yok.

</p>



:


bildirimler.map((item)=>(


<div

key={item.id}

style={notification}

>


<h3>

{item.title}

</h3>



<p>

{item.message}

</p>



<small>

Kullanıcı:

{" "}

{item.user_id}

</small>



</div>


))


}



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

fontSize:"42px",

color:"#d4af37"

};



const desc={

color:"#aaa"

};



const box={

marginTop:"30px",

padding:"35px",

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)",

borderRadius:"25px"

};



const gold={

color:"#d4af37"

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



const textarea={

width:"100%",

height:"120px",

padding:"15px",

marginTop:"15px",

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

marginTop:"15px",

color:"#d4af37",

fontWeight:900

};



const notification={

marginTop:"15px",

padding:"20px",

background:"rgba(212,175,55,.08)",

borderRadius:"15px"

};