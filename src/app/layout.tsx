"use client";
import React, { useState } from "react";
import "@styles/globals.css";

import { Provider } from "react-redux";
import { makeStore } from "../lib/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create store once using useState to maintain across renders
  const [store] = useState(() => makeStore());

  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen max-w-full">
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
