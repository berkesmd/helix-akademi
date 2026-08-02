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

if(!kontrol)
return <div className="loading">Kontrol ediliyor...</div>;

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
<>
<button className="mobile-menu" onClick={()=>setMenuAcik(!menuAcik)}>☰</button>

<aside className={menuAcik ? "admin-sidebar open":"admin-sidebar"}>

<div className="logo">
<Image src="/helix-logo.png" width={110} height={110} alt="Helix"/>
<h1>HELIX</h1>
<p>YÖNETİM MERKEZİ</p>
</div>

<div className="menu">
{menu.map((x)=>(
<button key={x[1]} onClick={()=>{router.push(x[1]);setMenuAcik(false)}}>{x[0]}</button>
))}
</div>

<button className="logout" onClick={async()=>{
await supabase.auth.signOut();
router.push("/admin-giris");
}}>
🚪 GÜVENLİ ÇIKIŞ
</button>

</aside>

<main className="admin-content">
<div className="header">
<h2>Hoş Geldin {isim}</h2>
<p>Helix Akademi Yönetim Merkezi</p>
</div>
{children}
</main>

<style jsx global>{`
body{margin:0;background:#050505;color:white}

.admin-sidebar{
position:fixed;
left:0;
top:0;
width:270px;
height:100vh;
padding:25px;
background:#050505;
border-right:1px solid rgba(212,175,55,.4);
z-index:1000;
overflow-y:auto;
}

.logo{text-align:center;color:#d4af37}

.menu{
display:grid;
gap:12px;
margin-top:30px;
}

.menu button{
padding:15px;
border-radius:15px;
background:rgba(212,175,55,.08);
border:1px solid rgba(212,175,55,.3);
color:white;
font-weight:800;
text-align:left;
cursor:pointer;
}

.logout{
margin-top:25px;
width:100%;
padding:15px;
border:0;
border-radius:15px;
background:#900;
color:white;
font-weight:900;
}

.admin-content{
margin-left:320px;
padding:40px;
}

.header{
padding:25px;
border-radius:25px;
background:rgba(255,255,255,.05);
border:1px solid rgba(212,175,55,.3);
}

.mobile-menu{
display:none;
}

.loading{
height:100vh;
display:flex;
align-items:center;
justify-content:center;
color:#d4af37;
font-size:24px;
}

@media(max-width:900px){

.mobile-menu{
display:block;
position:fixed;
top:20px;
left:20px;
z-index:2000;
background:#d4af37;
border:0;
border-radius:12px;
padding:12px 18px;
font-size:25px;
}

.admin-sidebar{
transform:translateX(-100%);
transition:.3s;
}

.admin-sidebar.open{
transform:translateX(0);
}

.admin-content{
margin-left:0;
padding:80px 15px 20px;
}

}

`}</style>

</>
)
}