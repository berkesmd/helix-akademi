import "./globals.css";

import type { Metadata } from "next";


export const metadata: Metadata = {

title:"HELIX AKADEMİ",

description:
"Geleceğin eğitim platformu",

manifest:"/manifest.json",

icons:{

icon:"/icons/icon-192.png",

apple:"/icons/icon-192.png"

},

appleWebApp:{
  capable:true,
  title:"HELIX AKADEMİ",
  statusBarStyle:"black-translucent"
}

};


export default function RootLayout({

children,

}:{

children:React.ReactNode

}){


return (

<html lang="tr">


<body>


{children}


</body>


</html>

);

}