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

const [sonuc,setSonuc]=useState("");

const [bitti,setBitti]=useState(false);





useEffect(()=>{

if(id){

yukle();

}

},[id]);






async function yukle(){


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

Puan: ${eski.score}/100`
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

.order("created_at",{ascending:true});



if(error){

setSonuc(error.message);

}



setSorular(questions || []);


setLoading(false);


}









function cevapSec(cevap:string){


const soru=sorular[aktifSoru];


if(!soru)return;



setSeciliCevap(cevap);


setCevaplar((prev:any)=>({

...prev,

[soru.id]:cevap

}));


}








function sonraki(){


if(!seciliCevap){

setSonuc("Önce cevap seçiniz.");

return;

}



const yeni=aktifSoru+1;


if(yeni<sorular.length){


setAktifSoru(yeni);


setSeciliCevap(

cevaplar[sorular[yeni].id] || ""

);


}


}









async function bitir(){



try{



const yeniCevaplar={

...cevaplar,

[sorular[aktifSoru].id]:seciliCevap

};




let dogru=0;




sorular.forEach((s)=>{


const verilen=

String(yeniCevaplar[s.id] || "")

.toUpperCase()

.trim();



const dogruCevap=

String(s.correct_answer || "")

.toUpperCase()

.trim();




if(verilen===dogruCevap){

dogru++;

}


});






const puan=Math.round(

(dogru/sorular.length)*100

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
"Kaydetme hatası: "+error.message
);

return;

}




setSonuc(

puan>=70

?

`🎉 BAŞARILI

Doğru: ${dogru}/${sorular.length}

Puan: ${puan}/100`

:

`❌ BAŞARISIZ

Doğru: ${dogru}/${sorular.length}

Puan: ${puan}/100`

);



setBitti(true);



}

catch(e:any){


setSonuc(
"Hata: "+e.message
);


}



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







if(!sorular.length){

return(

<main style={page}>

Soru bulunamadı.

</main>

)

}







const soru=sorular[aktifSoru];





return(

<main style={page}>


<div style={container}>


<h1 style={title}>

📝 {sinav?.title}

</h1>



<div style={counter}>

Soru {aktifSoru+1}/{sorular.length}

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

].map((x:any)=>(


<button

key={x[0]}

style={

seciliCevap===x[0]

?

selected

:

option

}

onClick={()=>cevapSec(x[0])}

>


{x[0]}) {x[1]}


</button>


))


}


</div>







{

aktifSoru < sorular.length-1 ?


<button

style={btn}

onClick={sonraki}

>

SONRAKİ SORU ➜

</button>



:


<button

style={btn}

onClick={bitir}

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

background:"#050505",

color:"white"

};


const container={

maxWidth:"600px",

margin:"auto"

};


const title={

color:"#d4af37",

textAlign:"center" as const

};


const counter={

marginTop:"20px",

padding:"15px",

background:"#222",

borderRadius:"15px",

textAlign:"center" as const

};


const card={

marginTop:"20px",

padding:"25px",

background:"#111",

borderRadius:"25px"

};


const option={

width:"100%",

marginTop:"15px",

padding:"15px",

background:"#222",

color:"white",

border:"1px solid #d4af37",

borderRadius:"15px",

textAlign:"left" as const

};


const selected={

...option,

background:"#d4af37",

color:"#000"

};


const btn={

width:"100%",

marginTop:"25px",

padding:"18px",

background:"#d4af37",

border:"0",

borderRadius:"15px",

fontWeight:900

};


const result={

marginTop:"100px",

padding:"30px",

background:"#111",

border:"2px solid #d4af37",

borderRadius:"25px",

color:"#d4af37",

fontSize:"22px",

fontWeight:900,

whiteSpace:"pre-line" as const,

textAlign:"center" as const

};