"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";


export default function BildirimlerPage(){


const supabase=createClient();


const [bildirimler,setBildirimler]=useState<any[]>([]);

const [yukleniyor,setYukleniyor]=useState(true);






useEffect(()=>{

yukle();

},[]);







async function yukle(){



const {data:{user}}=

await supabase.auth.getUser();



if(!user)return;







const {data,error}=await supabase

.from("notifications")

.select("*")

.eq("user_id",user.id)

.order("created_at",{ascending:false});





console.log(error);



setBildirimler(data || []);

setYukleniyor(false);



}









async function okunduYap(id:string){



await supabase

.from("notifications")

.update({

read:true

})

.eq("id",id);





yukle();



}









return(


<main style={page}>


<h1 style={title}>

🔔 Bildirimlerim

</h1>



<p style={desc}>

Helix Akademi duyuruları ve eğitim bildirimleri

</p>







{

yukleniyor ?


<h2>

Yükleniyor...

</h2>



:


bildirimler.length===0 ?



<div style={empty}>

<h2>

📭 Bildirim bulunamadı

</h2>

<p>

Yeni duyurular burada görünecek.

</p>

</div>





:



bildirimler.map((item)=>(


<div

key={item.id}

style={{

...card,

opacity:item.read ? .6 : 1

}}

>


<h2 style={gold}>

{

item.read

?

"🔔"

:

"🆕"

}

{" "}

{item.title}

</h2>





<p>

{item.message}

</p>





<small>

📅

{" "}

{

new Date(

item.created_at

).toLocaleString("tr-TR")

}

</small>







{

!item.read &&


<button

style={button}

onClick={()=>okunduYap(item.id)}

>

✓ Okundu

</button>


}




</div>



))


}





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

color:"#aaa",

fontSize:"18px"

};



const card={

marginTop:"25px",

padding:"30px",

background:"rgba(212,175,55,.08)",

border:"1px solid rgba(212,175,55,.3)",

borderRadius:"25px"

};



const empty={

marginTop:"40px",

padding:"40px",

background:"rgba(255,255,255,.05)",

borderRadius:"25px",

textAlign:"center" as const

};



const gold={

color:"#d4af37"

};



const button={

marginTop:"20px",

padding:"12px 25px",

background:"#d4af37",

border:"0",

borderRadius:"12px",

fontWeight:900,

cursor:"pointer"

};