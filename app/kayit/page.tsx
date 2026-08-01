"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function KayitPage(){

const router = useRouter();


const [isim,setIsim]=useState("");
const [email,setEmail]=useState("");
const [sifre,setSifre]=useState("");

const [hata,setHata]=useState("");
const [basari,setBasari]=useState("");

const [loading,setLoading]=useState(false);





async function kayitOl(e:React.FormEvent){

e.preventDefault();


setLoading(true);

setHata("");

setBasari("");



const supabase=createClient();



const {error}=await supabase.auth.signUp({

email:email,

password:sifre,


options:{


data:{


isim:isim,

rol:"ogrenci"


}


}


});





if(error){

setHata(error.message);

setLoading(false);

return;

}




setBasari(
"Kayıt başarılı. Giriş sayfasına yönlendiriliyorsunuz..."
);



setTimeout(()=>{


router.push("/ogrenci-giris");


},2000);



}







return(


<main style={page}>


<div style={card}>


<img

src="/helix-logo.png"

alt="Helix Akademi"

style={logo}

/>



<h1 style={title}>

ÖĞRENCİ KAYDI

</h1>



<p style={text}>

Helix Akademi eğitimlerine katılmak için hesap oluştur.

</p>





<form onSubmit={kayitOl}>




<input

style={input}

placeholder="Ad Soyad"

value={isim}

onChange={
e=>setIsim(e.target.value)
}

/>





<input

style={input}

type="email"

placeholder="E-posta"

value={email}

onChange={
e=>setEmail(e.target.value)
}

/>






<input

style={input}

type="password"

placeholder="Şifre"

value={sifre}

onChange={
e=>setSifre(e.target.value)
}

/>





{

hata &&

<div style={error}>

{hata}

</div>

}






{

basari &&

<div style={success}>

{basari}

</div>

}







<button

style={button}

disabled={loading}

>


{

loading

?

"KAYIT OLUŞTURULUYOR..."

:

"KAYIT OL"

}



</button>





</form>






<p

style={login}

onClick={()=>router.push("/ogrenci-giris")}

>

Zaten hesabın var mı? Giriş yap

</p>





</div>



</main>


)

}









const page={


minHeight:"100vh",


background:

"radial-gradient(circle at top,#5a3d00,#050505 60%)",


display:"flex",


alignItems:"center",


justifyContent:"center",


padding:"20px"


};







const card={


width:"100%",


maxWidth:"420px",


padding:"40px",


borderRadius:"30px",


background:

"rgba(255,255,255,.08)",


border:

"1px solid rgba(212,175,55,.5)",


boxShadow:

"0 0 50px rgba(212,175,55,.25)",


backdropFilter:"blur(20px)"


};








const logo={


width:"130px",


height:"100px",


objectFit:"contain" as const,


display:"block",


margin:"0 auto 20px",


filter:

"drop-shadow(0 0 25px #d4af37)"


};








const title={


textAlign:"center" as const,


fontSize:"32px",


fontWeight:900,


color:"#d4af37",


letterSpacing:"3px"


};








const text={


textAlign:"center" as const,


color:"#ddd",


marginBottom:"25px"


};








const input={


width:"100%",


padding:"16px",


marginBottom:"15px",


borderRadius:"15px",


border:"1px solid rgba(212,175,55,.5)",


background:"#111",


color:"#fff",


fontSize:"15px"


};








const button={


width:"100%",


padding:"17px",


borderRadius:"20px",


border:"0",


marginTop:"10px",


fontWeight:900,


letterSpacing:"2px",


background:

"linear-gradient(135deg,#fff1a8,#d4af37,#8a6500)",


cursor:"pointer",


boxShadow:

"0 0 30px rgba(212,175,55,.6)"


};








const error={


color:"#ff7070",


textAlign:"center" as const,


marginBottom:"15px"


};








const success={


color:"#d4af37",


textAlign:"center" as const,


marginBottom:"15px"


};








const login={


marginTop:"25px",


textAlign:"center" as const,


color:"#d4af37",


cursor:"pointer"


};