"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";


export default function BildirimlerPage(){


const supabase=createClient();


const [bildirimler,setBildirimler]=useState<any[]>([]);

const [yukleniyor,setYukleniyor]=useState(true);

const [user,setUser]=useState<any>(null);









useEffect(()=>{


yukle();


},[]);








async function yukle(){


const {data:{user}}=

await supabase.auth.getUser();



if(!user)return;



setUser(user);







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

Duyurular ve eğitim güncellemeleri

</p>








{

yukleniyor ?


<h2>

Yükleniyor...

</h2>



:


bildirimler.length===0 ?


<div style={box}>

<h2>

📭 Bildirim yok

</h2>

</div>



:


bildirimler.map((bildirim)=>(


<div

key={bildirim.id}

style={{

...card,

opacity:

bildirim.read ? .6 : 1

}}

>



<h2 style={gold}>

{

bildirim.read

?

"🔔"

:

"🆕"

}

{" "}

{bildirim.title}

</h2>







<p>

{bildirim.message}

</p>








<small>

📅

{" "}

{

new Date(

bildirim.created_at

).toLocaleString("tr-TR")

}

</small>








{

!bildirim.read &&


<button

style={button}

onClick={()=>okunduYap(bildirim.id)}

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



const box={

marginTop:"40px",

padding:"30px",

background:"rgba(255,255,255,.05)",

borderRadius:"25px",

border:"1px solid rgba(212,175,55,.3)"

};



const card={

marginTop:"25px",

padding:"30px",

background:"rgba(212,175,55,.08)",

borderRadius:"25px",

border:"1px solid rgba(212,175,55,.3)"

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