"use client";

export default function OgrenciHome(){


return(

<main style={page}>


<section style={welcome}>


<h1>

Hoş Geldin 👋

</h1>


<p>

Helix Akademi ailesine hoş geldin.
Eğitimlerine ulaşmak için menüyü kullanabilirsin.

</p>



</section>





<section style={videoCard}>


<video

src="/helix-tanitim.mp4"

autoPlay

muted

loop

playsInline

style={video}

>


</video>



<div style={overlay}>


<h2>

HELIX AKADEMİ

</h2>


<p>

Geleceğini eğitimle şekillendir.

</p>


</div>



</section>






<section style={info}>


<h2>

Eğitimlerine ulaşmak için

</h2>


<p>

Sol üstteki menü ☰ butonuna basarak
"Eğitimlerim" bölümüne gidebilirsin.

</p>



</section>



</main>


)

}






const page={


minHeight:"100vh",

padding:"30px",

background:

"radial-gradient(circle at top,#3b2600,#050505)",

color:"white"

};






const welcome={


padding:"30px",

borderRadius:"30px",

background:

"rgba(255,255,255,.05)",

border:

"1px solid rgba(212,175,55,.35)",

marginBottom:"30px"


};






const videoCard={


position:"relative" as const,

height:"450px",

borderRadius:"35px",

overflow:"hidden",

border:

"1px solid rgba(212,175,55,.5)",

boxShadow:

"0 0 40px rgba(212,175,55,.2)"


};






const video={


width:"100%",

height:"100%",

objectFit:"cover" as const


};






const overlay={


position:"absolute" as const,

bottom:"30px",

left:"30px",

padding:"20px 30px",

borderRadius:"20px",

background:

"rgba(0,0,0,.6)",

border:

"1px solid rgba(212,175,55,.3)"


};






const info={


marginTop:"30px",

padding:"25px",

borderRadius:"25px",

background:

"rgba(255,255,255,.04)",

border:

"1px solid rgba(212,175,55,.25)"

};