"use client";

import {useEffect,useState} from "react";
import {useParams,useRouter} from "next/navigation";
import {createClient} from "@/lib/supabase/client";


export default function SinavPage(){


const supabase=createClient();

const params=useParams();

const router=useRouter();

const id=params.id as string;



const [sinav,setSinav]=useState<any>(null);

const [sorular,setSorular]=useState<any[]>([]);

const [aktifSoru,setAktifSoru]=useState(0);

const [cevaplar,setCevaplar]=useState<any>({});

const [seciliCevap,setSeciliCevap]=useState("");

const [loading,setLoading]=useState(true);

const [bitti,setBitti]=useState(false);

const [sonuc,setSonuc]=useState("");





useEffect(()=>{

if(id){

verileriGetir();

}

},[id]);





async function verileriGetir(){



const {data:userData}=await supabase.auth.getUser();

const user=userData.user;


if(!user){

router.push("/ogrenci-giris");

return;

}




const {data:eski}=await supabase

.from("exam_results")

.select("*")

.eq("user_id",user.id)

.eq("exam_id",id)

.maybeSingle();



if(eski){

setSonuc(

`Bu sınav daha önce çözüldü.

Puanınız: ${eski.score}/100`

);

setBitti(true);

setLoading(false);

return;

}





const {data:exam}=await supabase

.from("exams")

.select("*")

.eq("id",id)

.single();



setSinav(exam);






const {data:questions,error}=await supabase

.from("questions")

.select("*")

.eq("exam_id",id)

.order("created_at",{ascending:true})

.limit(10);



if(error){

console.log(error);

}





setSorular(questions || []);




setLoading(false);


}







function cevapSec(cevap:string){



const soruId=sorular[aktifSoru]?.id;



if(!soruId)return;



setSeciliCevap(cevap);



setCevaplar((onceki:any)=>({

...onceki,

[soruId]:cevap

}));


}








function sonrakiSoru(){


if(!seciliCevap){

return;

}




if(aktifSoru < sorular.length-1){



const yeni=aktifSoru+1;


setAktifSoru(yeni);



setSeciliCevap(

cevaplar[sorular[yeni]?.id] || ""

);



}


}









async function sinaviBitir(){



const sonCevaplar={

...cevaplar,

[sorular[aktifSoru].id]:seciliCevap

};





let dogru=0;




sorular.forEach((soru)=>{


const verilen=

String(sonCevaplar[soru.id] || "")

.trim()

.toUpperCase();



const dogruCevap=

String(soru.correct_answer || "")

.trim()

.toUpperCase();





if(verilen===dogruCevap){

dogru++;

}



});





const puan=Math.round(

(dogru / sorular.length) * 100

);






const {data:userData}=await supabase.auth.getUser();

const user=userData.user;



if(!user){

router.push("/ogrenci-giris");

return;

}







const {error}=await supabase

.from("exam_results")

.insert({

user_id:user.id,

exam_id:id,

score:puan,

success:puan>=70

});






if(error){


setSonuc(

"❌ Kayıt hatası: "+error.message

);


return;


}







setSonuc(

puan>=70

?

`🎉 SINAVI GEÇTİNİZ

Doğru: ${dogru}/${sorular.length}

Puan: ${puan}/100`

:

`❌ SINAV BAŞARISIZ

Doğru: ${dogru}/${sorular.length}

Puan: ${puan}/100`

);




setBitti(true);


}









if(loading){

return(

<main style={page}>

Yükleniyor...

</main>

)

}









if(bitti){

return(

<main style={page}>

<div style={container}>

<div style={result}>

{sonuc}

</div>

</div>

</main>

)

}








const soru=sorular[aktifSoru];



if(!soru){

return(

<main style={page}>

Soru bulunamadı.

</main>

)

}









return(


<main style={page}>


<div style={container}>


<h1 style={title}>

📝 {sinav?.title}

</h1>



<div style={progress}>

Soru {aktifSoru+1} / {sorular.length}

</div>





<div style={card}>


<h2>

{soru.question}

</h2>






{

[

["A",soru.option_a],

["B",soru.option_b],

["C",soru.option_c],

["D",soru.option_d]

].map((item:any)=>(


<button

key={item[0]}

style={

seciliCevap===item[0]

?

selected

:

option

}

onClick={()=>cevapSec(item[0])}

>


{item[0]}) {item[1]}


</button>


))


}



</div>







{

aktifSoru < sorular.length-1


?


<button

style={button}

onClick={sonrakiSoru}

>

SONRAKİ SORU ➜

</button>


:


<button

style={button}

onClick={sinaviBitir}

>

✅ SINAVI BİTİR

</button>


}




</div>


</main>

)

}







const page={

minHeight:"100vh",

padding:"20px",

background:

"radial-gradient(circle,#3b2600,#050505)",

color:"white"

};



const container={

width:"100%",

maxWidth:"600px",

margin:"auto"

};



const title={

textAlign:"center" as const,

color:"#d4af37",

fontSize:"clamp(26px,6vw,42px)"

};



const progress={

marginTop:"25px",

padding:"15px",

borderRadius:"20px",

background:"rgba(212,175,55,.15)",

textAlign:"center" as const,

fontWeight:900

};



const card={

marginTop:"25px",

padding:"25px",

borderRadius:"30px",

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(212,175,55,.4)"

};



const option={

width:"100%",

marginTop:"15px",

padding:"18px",

borderRadius:"18px",

background:"rgba(212,175,55,.12)",

border:"1px solid #d4af37",

color:"white",

textAlign:"left" as const

};



const selected={

...option,

background:"#d4af37",

color:"#000"

};



const button={

width:"100%",

marginTop:"30px",

padding:"18px",

borderRadius:"20px",

background:"#d4af37",

border:"0",

fontWeight:900

};



const result={

marginTop:"100px",

padding:"30px",

borderRadius:"25px",

background:"rgba(212,175,55,.15)",

border:"1px solid #d4af37",

color:"#d4af37",

fontSize:"22px",

fontWeight:900,

textAlign:"center" as const,

whiteSpace:"pre-line" as const

};