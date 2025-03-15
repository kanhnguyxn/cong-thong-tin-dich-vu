import type { Metadata } from "next";
import React from "react";

import "../styles/globals.css";
import Header from "@components/Header";
import Footer from "@components/Footer";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return(
    <html lang="vi">
      <body>
      <Header isLoggedIn={true} />
        <main className="w-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}