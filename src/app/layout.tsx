"use client";
import React from "react";
import "@styles/globals.css";

import { Provider } from "react-redux";

import ReduxWrapper from "../app/reduxWrapper";
import store from "../features/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen max-w-full">
        <Provider store={store}>
          <ReduxWrapper>{children}</ReduxWrapper>
        </Provider>
      </body>
    </html>
  );
}
