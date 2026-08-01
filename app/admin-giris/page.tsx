"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function AdminGirisPage(){

  const router = useRouter();


  const [email,setEmail]=useState("");
  const [sifre,setSifre]=useState("");
  const [hata,setHata]=useState("");
  const [loading,setLoading]=useState(false);



  async function girisYap(e:React.FormEvent){

    e.preventDefault();

    setLoading(true);
    setHata("");



    const supabase=createClient();



    if(!supabase){

      setHata(
        "Supabase bağlantısı bulunamadı."
      );

      setLoading(false);
      return;

    }



    const {error}=await supabase.auth.signInWithPassword({

      email,

      password:sifre

    });



    if(error){

      setHata(error.message);

      setLoading(false);

      return;

    }



    router.push("/admin");

    router.refresh();


  }





  return(

    <div className="min-h-screen flex items-center justify-center bg-black">


      <div className="w-full max-w-md bg-white rounded-xl p-8">


        <h1 className="text-3xl font-bold mb-6 text-center">

          Admin Giriş

        </h1>



        <form
          onSubmit={girisYap}
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

            className="w-full bg-black text-white p-3 rounded"

          >

            {
              loading
              ? "Giriş yapılıyor..."
              : "Giriş Yap"
            }


          </button>



        </form>


      </div>


    </div>

  );

}