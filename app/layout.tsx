import "./globals.css";

import type { Metadata } from "next";


export const metadata: Metadata = {

title:"HELIX AKADEMİ",

description:
"Geleceğin eğitim platformu",

manifest:"/manifest.json",

icons:{

icon:"/helix-logo.png",

apple:"/helix-logo.png"

},

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