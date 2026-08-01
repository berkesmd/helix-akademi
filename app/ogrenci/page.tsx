"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function OgrenciPage() {

  const router = useRouter();

  const [egitimler, setEgitimler] = useState<any[]>([]);
  const [mesaj, setMesaj] = useState("Yükleniyor...");


  useEffect(() => {
    getir();
  }, []);



  async function getir() {

    const supabase = createClient();


    if (!supabase) {
      setMesaj("Supabase bağlantısı kurulamadı.");
      return;
    }



    const {
      data:userData,
      error:userError
    } = await supabase.auth.getUser();



    console.log("USER:", userData);
    console.log("USER ERROR:", userError);



    const user = userData.user;



    if (!user) {

      setMesaj("Kullanıcı bulunamadı");

      return;

    }





    const {
      data,
      error
    } = await supabase

      .from("enrollments")

      .select("*")

      .eq("user_id", user.id);





    console.log("ENROLLMENTS:", data);

    console.log("ENROLLMENT ERROR:", error);




    if (error) {

      setMesaj(
        "Veri hatası: " + error.message
      );

      return;

    }




    if (!data || data.length === 0) {

      setMesaj("Kayıt bulunamadı");

      return;

    }




    const ids = data.map(
      item => item.course_id
    );





    const {
      data:courses,
      error:courseError
    } = await supabase

      .from("courses")

      .select("*")

      .in("id", ids);





    console.log("COURSES:", courses);

    console.log("COURSE ERROR:", courseError);





    if(courseError){

      setMesaj(courseError.message);

      return;

    }





    setEgitimler(courses || []);

    setMesaj("");

  }





  return (

    <main style={page}>


      <h1 style={title}>
        EĞİTİMLERİM
      </h1>




      {
        mesaj && (

          <div style={card}>
            {mesaj}
          </div>

        )
      }





      {
        egitimler.map((egitim)=>(


          <div
            key={egitim.id}
            style={card}
          >


            <h2 style={gold}>
              {egitim.title}
            </h2>



            <p>
              {egitim.description}
            </p>




            <button

              style={button}

              onClick={()=>
                router.push(
                  `/ogrenci/egitim/${egitim.id}`
                )
              }

            >

              EĞİTİME GİR

            </button>



          </div>


        ))
      }





    </main>

  );

}






const page = {

  minHeight:"100vh",

  padding:"40px",

  color:"white"

};




const title = {

  color:"#d4af37",

  fontSize:"40px",

  fontWeight:900

};




const card = {

  marginTop:"20px",

  padding:"25px",

  borderRadius:"20px",

  background:"rgba(255,255,255,.06)",

  border:"1px solid #d4af37"

};




const gold = {

  color:"#d4af37"

};




const button = {

  marginTop:"20px",

  padding:"12px 25px",

  background:"#d4af37",

  border:"0",

  borderRadius:"12px",

  fontWeight:900,

  cursor:"pointer"

};