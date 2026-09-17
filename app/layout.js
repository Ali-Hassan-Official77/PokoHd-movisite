import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bebas=Bebas_Neue({weight:"400",subsets:["latin"],variable:"--font-display"});
const inter=Inter({subsets:["latin"],variable:"--font-body"});
const mono=JetBrains_Mono({weight:["400","500"],subsets:["latin"],variable:"--font-mono"});

export const metadata={title:"Slantyfix — Discover Your Next Movie",description:"A smooth cinematic movie discovery experience powered by The Movie Database.",icons:{icon:"/logo.svg",shortcut:"/logo.svg",apple:"/logo.svg"}};

export default function RootLayout({children}){return <html lang="en"><body className={`${bebas.variable} ${inter.variable} ${mono.variable}`}><div className="site-shell"><Navbar/><main className="site-main">{children}</main><Footer/></div></body></html>}
