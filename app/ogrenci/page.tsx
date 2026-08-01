"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function OgrenciPage() {


const router = useRouter();


const [egitimler,setEgitimler]=useState<any[]>([]);

const [mesaj,setMesaj]=useState("Yükleniyor...");





useEffect(()=>{

getir();

},[]);






async function getir(){


const supabase=createClient();



const {
data:userData
}=await supabase.auth.getUser();



const user=userData.user;



if(!user){

setMesaj("Kullanıcı bulunamadı");

return;

}





const {
data,
error
}=await supabase

.from("enrollments")

.select("*")

.eq("user_id",user.id);




if(error){

setMesaj(error.message);

return;

}




if(!data || data.length===0){

setMesaj("Kayıt bulunamadı");

return;

}





const ids=data.map(
(item)=>item.course_id
);




const {
data:courses,
error:courseError

}=await supabase

.from("courses")

.select("*")

.in("id",ids);





if(courseError){

setMesaj(courseError.message);

return;

}





setEgitimler(courses || []);

setMesaj("");

}





return(


<main className="student-page">



<h1>
EĞİTİMLERİM
</h1>





{
mesaj &&

<div className="student-message">

{mesaj}

</div>

}






<div className="student-grid">



{

egitimler.map((egitim)=>(



<div 
key={egitim.id}
className="student-card"
>



<h2>

{egitim.title}

</h2>



<p>

{egitim.description}

</p>





<button

onClick={()=>router.push(
`/ogrenci/egitim/${egitim.id}`
)}

>

EĞİTİME GİR

</button>




</div>



))

}



</div>



</main>


)

}