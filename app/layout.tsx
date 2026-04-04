import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { AuthProvider } from "../lib/contexts/AuthContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StackMastery | Tech Interview & CS Concepts Tracker",
  description: "Master your technical interviews by tracking your progress across Data Structures (DSA), Object-Oriented Programming (OOPs), Databases (DBMS), Operating Systems (OS), and System Design.",
  keywords: "technical interview prep, DSA tracker, OOPs patterns, System Design, DBMS, OS concepts, StackMastery",
  openGraph: {
    title: "StackMastery | Tech Interview & CS Concepts Tracker",
    description: "The ultimate dashboard to track your software engineering interview preparation across 5 core subjects.",
    url: "https://stackmastery.app",
    siteName: "StackMastery",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Toaster 
            position="top-right" 
            toastOptions={{
              className: "font-mono text-sm",
              style: {
                background: "#16161f",
                color: "#f8fafc",
                border: "1px solid #1e293b"
              }
            }} 
          />
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
