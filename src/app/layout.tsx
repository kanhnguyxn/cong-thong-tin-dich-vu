"use client";

import type { Metadata } from "next";
import React, { createContext, useEffect, useState } from "react";
import "../styles/globals.css";
import Footer from "@components/Footer";
import Header from "@components/Header";


const background = "/assets/images/background.svg";

const AuthContext = createContext({ isLoggedIn: false });


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check for authentication token in localStorage
    const authToken = localStorage.getItem('authToken');
    setIsLoggedIn(!!authToken);
    setIsLoaded(true);
  }, []);

  return (
    <html lang="vi">
      <body 
        className={`flex flex-col min-h-screen ${!isLoggedIn ? 'bg-auto bg-center' : ''}`}
        style={!isLoggedIn ? { backgroundImage: `url(${background})` } : {}}
      >
        <AuthContext.Provider value={{ isLoggedIn }}>
          <Header isLoggedIn={isLoggedIn} />
          <main className="flex-1 flex justify-center items-center">
            {isLoaded && children}
          </main>
          <Footer />
        </AuthContext.Provider>
      </body>
    </html>
  );
}