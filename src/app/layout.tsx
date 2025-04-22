"use client";

import React, { useEffect, useState } from "react";
import "@styles/globals.css";
import Footer from "@components/Footer";
import Header from "@components/header/Header";
import { AuthContext } from "@context/AuthContext";

const background = "/assets/images/background.svg";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    setIsLoggedIn(true);
    setAccessToken(token);
  }, [setIsLoggedIn, setAccessToken]);

  return (
    <html lang="vi">
      <body
        className={`flex flex-col min-h-screen max-w-full ${
          !isLoggedIn ? "bg-auto bg-center" : ""
        }`}
        style={!isLoggedIn ? { backgroundImage: `url(${background})` } : {}}
      >
        <AuthContext.Provider
          value={{ isLoggedIn, setIsLoggedIn, accessToken, setAccessToken }}
        >
          <div className="sticky top-0 z-50 w-full">
            <Header isLoggedIn={isLoggedIn} />
          </div>
          <main className="flex-1 flex w-full">{children}</main>
          <Footer />
        </AuthContext.Provider>
      </body>
    </html>
  );
}
