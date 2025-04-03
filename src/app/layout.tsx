"use client";

import React, { createContext, useEffect, useState } from "react";
import "../styles/globals.css";
import Footer from "@components/Footer";
import Header from "@components/header/Header";


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
        className={`flex flex-col min-h-screen max-w-full ${!isLoggedIn ? 'bg-auto bg-center' : ''}`}
        style={!isLoggedIn ? { backgroundImage: `url(${background})` } : {}}
      >
          <AuthContext.Provider value={{ isLoggedIn }}>
            <div className="sticky top-0 z-50 w-full">
              <Header isLoggedIn={isLoggedIn} />
            </div>
            <main className="flex-1 flex w-full">
              {children}
            </main>
            <Footer />
          </AuthContext.Provider>
      </body>
    </html>
  );
}