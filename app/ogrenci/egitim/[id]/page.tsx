"use client";

import { useRouter } from "next/navigation";


export default function EgitimDetayPage(){


const router = useRouter();



const dersler = [

{
id:1,
baslik:"Koçluğa Giriş"
},

{
id:2,
baslik:"İletişim Teknikleri"
}

];




return(


<main style={page}>


<div style={kart}>


<h1 style={title}>

Profesyonel Yaşam Koçluğu

</h1>



<p style={aciklama}>

Uluslararası sertifikalı eğitim programı

</p>




<h2>

DERSLER

</h2>





{

dersler.map((ders)=>(


<div

key={ders.id}

style={dersKart}

>


<h3>

{ders.id}. {ders.baslik}

</h3>




<button

style={button}

onClick={()=>{

router.push(

`/ogrenci/ders/${ders.id}`

);

}}

>

DERSE GİR

</button>



</div>


))


}





<button

style={geri}

onClick={()=>router.push("/ogrenci/egitimler")}

>

← Geri Dön

</button>





</div>


</main>


)

}





const page={

minHeight:"100vh",

padding:"30px",

background:

"radial-gradient(circle,#3b2600,#050505)",

color:"white"

};




const kart={

maxWidth:"700px",

margin:"40px auto",

padding:"35px",

borderRadius:"30px",

background:

"rgba(255,255,255,.05)",

border:

"1px solid #d4af37"

};




const title={

fontSize:"42px",

color:"#d4af37"

};




const aciklama={

color:"#ddd",

marginBottom:"30px"

};




const dersKart={

padding:"20px",

marginTop:"20px",

borderRadius:"20px",

background:"#111",

border:

"1px solid rgba(212,175,55,.4)"

};




const button={

width:"100%",

padding:"15px",

marginTop:"15px",

borderRadius:"15px",

border:"0",

background:

"linear-gradient(90deg,#fff1a8,#d4af37)",

fontWeight:900,

cursor:"pointer"

};




const geri={

width:"100%",

marginTop:"25px",

padding:"15px",

borderRadius:"15px",

background:"transparent",

border:

"1px solid #d4af37",

color:"#d4af37",

cursor:"pointer"

};