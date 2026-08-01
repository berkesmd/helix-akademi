"use client";

import {useEffect,useState} from "react";
import {createClient} from "@/lib/supabase/client";


export default function RolYonetimi(){


const supabase=createClient();


const [kullanicilar,setKullanicilar]=useState<any[]>([]);

const [mesaj,setMesaj]=useState("");





useEffect(()=>{

yukle();

},[]);







async function yukle(){


const {data}=await supabase

.from("profiles")

.select("*")

.order("created_at",{ascending:false});



setKullanicilar(data || []);


}









async function rolDegistir(

id:string,

rol:string

){



const {error}=await supabase

.from("profiles")

.update({

role:rol

})

.eq("id",id);





if(error){

setMesaj("❌ Güncellenemedi");

return;

}





setMesaj("✅ Rol değiştirildi");


yukle();


}









return(


<main style={page}>


<h1 style={title}>

⚙️ Rol Yönetimi

</h1>





<div style={box}>


{

kullanicilar.map((user)=>(


<div

key={user.id}

style={item}

>




<div>


<h3>

{user.full_name || "İsimsiz"}

</h3>


<p>

{user.email}

</p>


<p>

Mevcut Rol:

<b style={gold}>

{user.role}

</b>

</p>


</div>







<select

value={user.role}

onChange={(e)=>

rolDegistir(

user.id,

e.target.value

)

}

style={select}

>



<option value="student">

👨‍🎓 Öğrenci

</option>



<option value="admin">

👑 Admin

</option>



</select>







</div>


))


}




</div>







<p style={message}>

{mesaj}

</p>





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

marginTop:"30px",

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)",

borderRadius:"25px",

padding:"30px"

};





const item={

display:"flex",

justifyContent:"space-between",

alignItems:"center",

padding:"20px",

marginBottom:"15px",

borderRadius:"20px",

background:"rgba(212,175,55,.08)"

};





const select={

padding:"12px",

borderRadius:"12px",

background:"#111",

color:"white",

border:"1px solid #d4af37"

};





const gold={

color:"#d4af37"

};




const message={

marginTop:"20px",

color:"#d4af37",

fontWeight:900

};