"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function OgrencilerPage(){


const supabase=createClient();

const router=useRouter();


const [ogrenciler,setOgrenciler]=useState<any[]>([]);

const [arama,setArama]=useState("");

const [loading,setLoading]=useState(true);





useEffect(()=>{

listele();

},[]);







async function listele(){


setLoading(true);



const {data,error}=await supabase

.from("profiles")

.select("*")

.eq("role","student")

.order("created_at",{ascending:false});




if(error){

console.log(error);

setLoading(false);

return;

}




setOgrenciler(data || []);

setLoading(false);



}









const filtre=ogrenciler.filter((item)=>{


const isim=item.full_name || "";

const email=item.email || "";


return (

isim

.toLowerCase()

.includes(arama.toLowerCase())


||

email

.toLowerCase()

.includes(arama.toLowerCase())

);


});








if(loading){


return(

<main style={page}>

<h2>

Yükleniyor...

</h2>

</main>

)

}







return(


<main style={page}>


<h1 style={title}>

👨‍🎓 Öğrenci Yönetimi

</h1>



<p style={desc}>

Helix Akademi öğrenci kayıtları

</p>








<div style={toolbar}>


<input

style={input}

placeholder="🔍 Öğrenci ara..."

value={arama}

onChange={(e)=>setArama(e.target.value)}

/>







<button

style={addButton}

onClick={()=>router.push("/admin/ogrenciler/ekle")}

>

➕ Öğrenci Ekle

</button>



</div>









<div style={grid}>


{


filtre.length===0 ?


<div style={empty}>

Öğrenci bulunamadı.

</div>



:


filtre.map((ogrenci)=>(



<div

key={ogrenci.id}

style={card}

>





<h2 style={gold}>

👤 {ogrenci.full_name || "İsimsiz"}

</h2>





<p>

📧 {ogrenci.email || "Email yok"}

</p>





<p>

📱 {ogrenci.phone || "Telefon yok"}

</p>






<div style={info}>


🎭 Rol:

<b>

{" "}

{ogrenci.role}

</b>


<br/>


📅 Kayıt:

{" "}

{

new Date(

ogrenci.created_at

)

.toLocaleDateString("tr-TR")

}



</div>









<button

style={detailButton}

onClick={()=>router.push(

`/admin/ogrenciler/${ogrenci.id}`

)}

>

👁 Detay Gör

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





const title={

fontSize:"42px",

color:"#d4af37",

fontWeight:900

};





const desc={

color:"#aaa",

fontSize:"18px"

};





const toolbar={

display:"flex",

gap:"15px",

marginTop:"30px",

flexWrap:"wrap" as const

};





const input={

flex:1,

minWidth:"250px",

padding:"15px",

background:"#111",

color:"white",

border:"1px solid #d4af37",

borderRadius:"15px"

};





const addButton={

padding:"15px 25px",

background:"#d4af37",

border:"0",

borderRadius:"15px",

fontWeight:900,

cursor:"pointer"

};





const grid={

display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(300px,1fr))",

gap:"25px",

marginTop:"40px"

};





const card={

padding:"30px",

background:

"rgba(255,255,255,.05)",

border:

"1px solid rgba(212,175,55,.3)",

borderRadius:"25px"

};





const gold={

color:"#d4af37"

};





const info={

marginTop:"15px",

lineHeight:"2",

color:"#ddd"

};





const detailButton={

width:"100%",

marginTop:"25px",

padding:"14px",

borderRadius:"15px",

background:"transparent",

border:"1px solid #d4af37",

color:"#d4af37",

fontWeight:900,

cursor:"pointer"

};





const empty={

padding:"30px",

borderRadius:"20px",

background:"rgba(255,255,255,.05)"

};