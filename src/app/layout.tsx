"use client";

import "@styles/globals.css";
import React from "react";

import StoreProvider from "./StoreProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen max-w-full">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
