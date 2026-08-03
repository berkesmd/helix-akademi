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

const [index,setIndex]=useState(0);

const [cevaplar,setCevaplar]=useState<any>({});

const [secim,setSecim]=useState("");

const [loading,setLoading]=useState(true);

const [sonuc,setSonuc]=useState("");

const [bitti,setBitti]=useState(false);



useEffect(()=>{

if(id){
getir();
}

},[id]);





async function getir(){


const {data:userData}=await supabase.auth.getUser();


if(!userData.user){

router.push("/ogrenci-giris");
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

alert(error.message);

}



setSorular(questions || []);

setLoading(false);


}







function cevapVer(c:string){


setSecim(c);


setCevaplar({

...cevaplar,

[sorular[index].id]:c

});


}







function sonraki(){


if(!secim){

alert("Önce cevap seç");

return;

}



const yeni=index+1;


setIndex(yeni);


setSecim(

cevaplar[sorular[yeni]?.id] || ""

);


}








async function sinaviBitir(){


alert("Sınav hesaplanıyor");



const sonCevap={

...cevaplar,

[sorular[index].id]:secim

};



let dogru=0;



sorular.forEach((s)=>{


if(

sonCevap[s.id]===s.correct_answer

){

dogru++;

}


});





const puan=dogru*10;





const {data:userData}=await supabase.auth.getUser();



const user=userData.user;



if(!user){

alert("Kullanıcı yok");

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

alert(error.message);

return;

}




setSonuc(

`
${puan>=70?"🎉 Başarılı":"❌ Başarısız"}

Doğru: ${dogru}/${sorular.length}

Puan: ${puan}/100

`

);


setBitti(true);



}










if(loading){

return(

<div style={page}>
Yükleniyor...
</div>

)

}







if(bitti){

return(

<main style={page}>

<div style={sonucBox}>

{sonuc}

</div>

</main>

)

}







const soru=sorular[index];



if(!soru){

return(

<main style={page}>
Soru bulunamadı
</main>

)

}







return(

<main style={page}>


<div style={container}>


<h1 style={title}>

📝 {sinav?.title}

</h1>



<div style={sayac}>

Soru {index+1} / {sorular.length}

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

onClick={()=>cevapVer(x[0])}

style={

secim===x[0]

? secili

: cevap

}

>

{x[0]}) {x[1]}

</button>



))

}




</div>






{

index < sorular.length-1 ?


<button

style={button}

onClick={sonraki}

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

background:"#050505",

color:"white"

};


const container={

maxWidth:"700px",

margin:"auto"

};


const title={

textAlign:"center" as const,

color:"#d4af37",

fontSize:"40px"

};


const sayac={

marginTop:"20px",

padding:"15px",

background:"#111",

border:"1px solid #d4af37",

borderRadius:"15px",

textAlign:"center" as const

};



const card={

marginTop:"25px",

padding:"25px",

background:"#111",

borderRadius:"25px",

border:"1px solid #d4af37"

};



const cevap={

width:"100%",

marginTop:"15px",

padding:"18px",

borderRadius:"15px",

background:"#222",

color:"white",

border:"1px solid #d4af37",

textAlign:"left" as const,

cursor:"pointer"

};



const secili={

...cevap,

background:"#d4af37",

color:"#000"

};



const button={

width:"100%",

marginTop:"25px",

padding:"18px",

borderRadius:"20px",

background:"#d4af37",

fontWeight:900,

cursor:"pointer"

};



const sonucBox={

maxWidth:"600px",

margin:"100px auto",

padding:"40px",

borderRadius:"25px",

background:"rgba(212,175,55,.15)",

border:"2px solid #d4af37",

color:"#d4af37",

fontSize:"25px",

fontWeight:900,

whiteSpace:"pre-line" as const,

textAlign:"center" as const

};