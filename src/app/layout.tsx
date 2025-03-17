// layout.tsx
import type { Metadata } from "next";
import React from "react";

import "../styles/globals.css";
import Header from "@components/Header";
import Footer from "@components/Footer";
import AuthHeader from "@components/AuthHeader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen">
        <AuthHeader />
        <main className="flex-1 flex justify-center items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}