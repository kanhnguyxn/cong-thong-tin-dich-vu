"use client";
import "@styles/animations.css";
import "@styles/globals.css";

import React, { useState } from "react";

import { Provider } from "react-redux";
import { makeStore } from "../redux/store";

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
