import Navbar from "@/components/navbar/Navbar";


export default function EgitimlerLayout({

children,

}:{

children: React.ReactNode;

}){


return (

<>

<Navbar />

<main className="pt-20">

{children}

</main>

</>

);


}