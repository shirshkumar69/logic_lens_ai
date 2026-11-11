import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'LogicLens AI — Digital Circuit Lab',description:'Understand, design, diagnose and verify digital circuits. An interactive digital electronics laboratory.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
