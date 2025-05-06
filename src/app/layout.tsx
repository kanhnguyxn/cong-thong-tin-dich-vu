"use client";
import React from "react";
import "@styles/globals.css";

import { Provider } from "react-redux";
import store from "../features/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen max-w-full">
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
