"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";


export default function AnalizPage(){

const supabase=createClient();


const [veriler,setVeriler]=useState({
 ogrenci:0,
 egitim:0,
 ders:0
});


const [grafik,setGrafik]=useState<any[]>([]);



useEffect(()=>{


async function yukle(){


const {count:ogrenci}=await supabase
.from("profiles")
.select("*",{count:"exact",head:true})
.eq("role","student");



const {count:egitim}=await supabase
.from("courses")
.select("*",{count:"exact",head:true});



const {count:ders}=await supabase
.from("lessons")
.select("*",{count:"exact",head:true});




const {data:courses}=await supabase
.from("courses")
.select("id,title");



const liste:any[]=[];


for(const course of courses || []){


const {count}=await supabase
.from("enrollments")
.select("*",{count:"exact",head:true})
.eq("course_id",course.id);



liste.push({

isim:course.title,

ogrenci:count || 0

});


}



setVeriler({

ogrenci:ogrenci || 0,

egitim:egitim || 0,

ders:ders || 0

});


setGrafik(liste);


}


yukle();


},[]);






return(

<main style={page}>


<h1 style={title}>
📊 Sistem Analizi
</h1>


<p style={desc}>
Helix Akademi performans ve eğitim analiz merkezi.
</p>





<div style={cards}>


<Card
ikon="👨‍🎓"
sayi={veriler.ogrenci}
text="Toplam Öğrenci"
/>


<Card
ikon="📚"
sayi={veriler.egitim}
text="Toplam Eğitim"
/>


<Card
ikon="🎥"
sayi={veriler.ders}
text="Toplam Ders"
/>


</div>








<div style={section}>


<h2 style={gold}>
🔥 Eğitim Popülerliği
</h2>





<div style={chartBox}>


<ResponsiveContainer
width="100%"
height="100%"
>


<BarChart

data={grafik}

margin={{
top:30,
right:30,
left:10,
bottom:50
}}

barCategoryGap="35%"

>



<defs>

<linearGradient

id="goldGradient"

x1="0"

y1="0"

x2="0"

y2="1"

>

<stop
offset="0%"
stopColor="#ffe58a"
/>

<stop
offset="100%"
stopColor="#d4af37"
/>


</linearGradient>


</defs>





<CartesianGrid

strokeDasharray="5 5"

stroke="rgba(212,175,55,.12)"

vertical={false}

/>






<XAxis

dataKey="isim"

axisLine={false}

tickLine={false}

tick={{

fill:"#d4af37",

fontSize:12

}}

/>






<YAxis

axisLine={false}

tickLine={false}

tick={{

fill:"#aaa"

}}

/>






<Tooltip

contentStyle={{

background:"#050505",

border:"1px solid #d4af37",

borderRadius:"15px",

color:"#fff"

}}


labelStyle={{

color:"#d4af37",

fontWeight:900

}}


/>






<Bar

dataKey="ogrenci"

fill="url(#goldGradient)"

barSize={45}

radius={[15,15,0,0]}

/>






</BarChart>


</ResponsiveContainer>



</div>





</div>







<div style={section}>


<h2 style={gold}>
📚 Eğitim Performansları
</h2>



{

grafik.map((item)=>(


<div

key={item.isim}

style={itemBox}

>


<h3>
{item.isim}
</h3>


<p>

👨‍🎓 Kayıtlı Öğrenci:

<b>

{" "}

{item.ogrenci}

</b>

</p>


</div>


))


}



</div>





</main>


)

}





function Card({ikon,sayi,text}:any){


return(

<div style={card}>


<h1>
{ikon}
</h1>


<h2 style={{
color:"#d4af37",
fontSize:"42px"
}}>

{sayi}

</h2>


<p>
{text}
</p>


</div>

)

}







const page={

color:"white",

padding:"20px"

};



const title={

fontSize:"42px",

color:"#d4af37",

letterSpacing:"3px"

};



const desc={

color:"#aaa",

fontSize:"18px"

};



const cards={

display:"grid",

gridTemplateColumns:"repeat(3,1fr)",

gap:"25px",

marginTop:"40px"

};



const card={

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(212,175,55,.3)",

borderRadius:"25px",

padding:"30px",

textAlign:"center" as const

};



const section={

marginTop:"45px",

background:"rgba(255,255,255,.04)",

border:"1px solid rgba(212,175,55,.3)",

borderRadius:"25px",

padding:"35px"

};



const chartBox={

height:"380px",

marginTop:"30px",

background:"#080808",

borderRadius:"25px",

padding:"25px",

border:"1px solid rgba(212,175,55,.25)",

boxShadow:"0 0 40px rgba(212,175,55,.15)"

};



const gold={

color:"#d4af37"

};



const itemBox={

background:"rgba(212,175,55,.08)",

borderRadius:"15px",

padding:"20px",

marginTop:"15px"

};