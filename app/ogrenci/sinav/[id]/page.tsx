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

const [cevaplar,setCevaplar]=useState<any>({});

const [loading,setLoading]=useState(true);

const [sonuc,setSonuc]=useState("");

const [bitti,setBitti]=useState(false);








useEffect(()=>{


if(id){

getir();

}


},[id]);









async function getir(){



const {data:exam}=await supabase

.from("exams")

.select("*")

.eq("id",id)

.single();




setSinav(exam);






const {data:questions}=await supabase

.from("questions")

.select("*")

.eq("exam_id",id)

.order("created_at",{ascending:true})

.limit(10);





setSorular(questions || []);


setLoading(false);


}









function cevapSec(

soruId:string,

cevap:string

){


setCevaplar({

...cevaplar,

[soruId]:cevap

});


}









async function sinaviBitir(){



if(Object.keys(cevaplar).length < sorular.length){


setSonuc(

"❌ Lütfen tüm soruları cevaplayın."

);


return;


}






let dogru=0;





sorular.forEach((soru)=>{


if(

cevaplar[soru.id]===soru.correct_answer

){

dogru++;

}


});







const puan=dogru*10;







const {

data:{
user

}

}=await supabase.auth.getUser();





if(!user){


router.push("/ogrenci-giris");

return;


}








await supabase

.from("exam_results")

.insert({

user_id:user.id,

exam_id:id,

score:puan,

success:puan>=70

});








if(puan>=70){



setSonuc(

`
🎉 Başarılı oldunuz!

Doğru:
${dogru}/10

Puan:
${puan}/100

`

);



}else{



setSonuc(

`
❌ Başarısız

Doğru:
${dogru}/10

Puan:
${puan}/100

`

);



}




setBitti(true);



}









if(loading){


return(

<main style={page}>

Yükleniyor...

</main>

)


}









return(


<main style={page}>


<div style={container}>


<h1 style={title}>

📝 {sinav?.title}

</h1>


<p style={puanText}>

Toplam: 100 Puan | 10 Soru

</p>








{

sorular.map((soru,index)=>(


<div

key={soru.id}

style={questionBox}

>


<h3>

{index+1}. {soru.question}

</h3>








{

[

["A",soru.option_a],

["B",soru.option_b],

["C",soru.option_c],

["D",soru.option_d]

].map((item:any)=>(


<label

key={item[0]}

style={option}

>


<input

type="radio"

disabled={bitti}

name={soru.id}

checked={

cevaplar[soru.id]===item[0]

}

onChange={()=>


cevapSec(

soru.id,

item[0]

)


}

/>



{" "}

<b>{item[0]})</b> {item[1]}



</label>


))


}



</div>



))


}








<button

style={button}

disabled={bitti}

onClick={sinaviBitir}

>

✅ Sınavı Bitir

</button>







{

sonuc &&

<div style={result}>

{sonuc}

</div>

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

maxWidth:"850px",

margin:"auto"

};






const title={

fontSize:"clamp(28px,5vw,42px)",

color:"#d4af37",

textAlign:"center" as const

};






const puanText={

textAlign:"center" as const,

color:"#ddd"

};







const questionBox={

marginTop:"20px",

padding:"20px",

borderRadius:"20px",

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(212,175,55,.3)"

};







const option={

display:"block",

marginTop:"12px",

padding:"14px",

borderRadius:"12px",

background:"rgba(212,175,55,.1)",

cursor:"pointer"

};







const button={

width:"100%",

marginTop:"30px",

padding:"16px",

borderRadius:"15px",

border:"0",

background:"#d4af37",

fontWeight:900,

fontSize:"17px",

cursor:"pointer"

};







const result={

marginTop:"30px",

padding:"25px",

borderRadius:"20px",

background:"rgba(212,175,55,.15)",

border:"1px solid #d4af37",

color:"#d4af37",

fontSize:"22px",

fontWeight:900,

whiteSpace:"pre-line" as const

};