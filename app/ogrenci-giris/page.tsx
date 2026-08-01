"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function OgrenciGirisPage(){

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [sifre,setSifre] = useState("");

  const [hata,setHata] = useState("");
  const [loading,setLoading] = useState(false);



  async function giris(e:React.FormEvent){

    e.preventDefault();

    setLoading(true);
    setHata("");



    try{


      const supabase = createClient();



      if(!supabase){

        setHata(
          "Supabase bağlantısı yok"
        );

        setLoading(false);

        return;

      }




      const {
        data,
        error
      } = await supabase.auth.signInWithPassword({

        email,

        password:sifre

      });





      console.log(
        "LOGIN DATA",
        data
      );


      console.log(
        "LOGIN ERROR",
        error
      );





      if(error){

        setHata(error.message);

        setLoading(false);

        return;

      }




      if(!data.user){

        setHata(
          "Kullanıcı bulunamadı"
        );

        setLoading(false);

        return;

      }




      // direkt yönlendir

      window.location.href="/ogrenci";



    }

    catch(err:any){


      console.log(err);


      setHata(
        err.message
      );


      setLoading(false);


    }



  }





return(

<div className="min-h-screen bg-black flex items-center justify-center">


<div className="bg-white p-8 rounded-2xl w-full max-w-md">


<h1 className="text-3xl font-bold mb-6 text-center">

Öğrenci Giriş

</h1>




<form
onSubmit={giris}
className="space-y-4"
>



<input

type="email"

placeholder="E-posta"

value={email}

onChange={
e=>setEmail(e.target.value)
}

className="w-full border p-3 rounded"

/>




<input

type="password"

placeholder="Şifre"

value={sifre}

onChange={
e=>setSifre(e.target.value)
}

className="w-full border p-3 rounded"

/>





{
hata &&

<p className="text-red-600">

{hata}

</p>

}





<button

disabled={loading}

className="w-full bg-black text-white p-3 rounded font-bold"

>


{
loading
?
"Giriş yapılıyor..."
:
"Giriş Yap"
}


</button>




</form>



</div>



</div>


)


}