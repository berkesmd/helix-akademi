"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {createClient} from "@/lib/supabase/client";

export default function AdminLayout({children}:{children:React.ReactNode}){

const router=useRouter();
const supabase=createClient();

const [kontrol,setKontrol]=useState(false);
const [isim,setIsim]=useState("");
const [menuAcik,setMenuAcik]=useState(false);

useEffect(()=>{

async function kontrolEt(){

const {data:{user}}=await supabase.auth.getUser();

if(!user){
router.push("/admin-giris");
return;
}

const {data:profil}=await supabase
.from("profiles")
.select("role,full_name")
.eq("id",user.id)
.single();

if(!profil || profil.role!=="admin"){
router.push("/");
return;
}

setIsim(profil.full_name || "Admin");
setKontrol(true);

}

kontrolEt();

},[]);

if(!kontrol){
return <div style={loading}>Kontrol ediliyor...</div>;
}

const menu=[
["🏠 Dashboard","/admin"],
["👨‍🎓 Öğrenci Yönetimi","/admin/ogrenciler"],
["➕ Öğrenci Ekle","/admin/ogrenciler/yeni"],
["🎓 Eğitim Yönetimi","/admin/egitimler"],
["🎥 Ders Yönetimi","/admin/ders-yonetimi"],
["📝 Sınav Yönetimi","/admin/sinavlar"],
["📚 Eğitim Ata","/admin/egitim-atama"],
["📊 Öğrenci Takip","/admin/ogrenci-takip"],
["📈 Analiz","/admin/analiz"],
["🔔 Bildirimler","/admin/bildirimler"],
["👑 Rol Yönetimi","/admin/rol-yonetimi"],
["⚙️ Site Ayarları","/admin/ayarlar"]
];

return(
<div style={page}>

<button style={hamburger} onClick={()=>setMenuAcik(!menuAcik)}>
☰
</button>

{menuAcik && <div style={overlay} onClick={()=>setMenuAcik(false)}/>}

<aside style={{...sidebar, left: menuAcik ? 0 : undefined}}>

<div style={logo}>
<Image src="/helix-logo.png" alt="Helix" width={110} height={110}/>
<h1>HELIX</h1>
<p>YÖNETİM MERKEZİ</p>
</div>

<div style={menuAlan}>
{menu.map(item=>(
<button key={item[1]} style={menuBtn} onClick={()=>{
router.push(item[1]);
setMenuAcik(false);
}}>
{item[0]}
</button>
))}
</div>

<button style={logout} onClick={async()=>{
await supabase.auth.signOut();
router.push("/admin-giris");
}}>
🚪 GÜVENLİ ÇIKIŞ
</button>

</aside>

<main style={content}>

<div style={header}>
<h2>Hoş Geldin {isim}</h2>
<p>Helix Akademi Yönetim Merkezi</p>
</div>

{children}

</main>

<style jsx global>{`
@media(max-width:900px){
main{
margin-left:0!important;
width:100%!important;
padding:80px 15px 20px!important;
}
}
`}</style>

</div>
)

}

const page={
minHeight:"100vh",
background:"radial-gradient(circle at top,#302300,#050505 60%)",
color:"white"
};

const sidebar={
position:"fixed" as const,
left:"0",
top:0,
width:"270px",
height:"100vh",
padding:"25px",
background:"rgba(0,0,0,.95)",
borderRight:"1px solid rgba(212,175,55,.3)",
zIndex:1000,
overflowY:"auto" as const,
display:"flex",
flexDirection:"column" as const,
transition:".3s"
};

const logo={textAlign:"center" as const,color:"#d4af37"};

const menuAlan={marginTop:"30px",display:"grid",gap:"12px",flex:1};

const menuBtn={
padding:"15px",
borderRadius:"15px",
background:"rgba(212,175,55,.08)",
border:"1px solid rgba(212,175,55,.3)",
color:"white",
cursor:"pointer",
fontWeight:900,
textAlign:"left" as const
};

const logout={
marginTop:"25px",
width:"100%",
padding:"16px",
borderRadius:"15px",
background:"#8b0000",
color:"white",
border:"0",
fontWeight:900,
cursor:"pointer"
};

const content={
marginLeft:"320px",
padding:"40px",
width:"calc(100% - 320px)"
};

const header={
padding:"25px",
borderRadius:"25px",
background:"rgba(255,255,255,.05)",
border:"1px solid rgba(212,175,55,.3)",
marginBottom:"30px"
};

const hamburger={
display:"block",
position:"fixed" as const,
top:"20px",
left:"20px",
zIndex:2000,
fontSize:"28px",
background:"#d4af37",
borderRadius:"12px",
padding:"10px 15px",
cursor:"pointer"
};

const overlay={
position:"fixed" as const,
inset:0,
background:"rgba(0,0,0,.7)",
zIndex:900
};

const loading={
height:"100vh",
background:"#050505",
display:"flex",
alignItems:"center",
justifyContent:"center",
color:"#d4af37",
fontSize:"24px"
};