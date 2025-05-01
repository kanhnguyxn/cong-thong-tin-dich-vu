"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import Footer from "@components/Footer";
import Header from "@components/header/Header";

const background = "/assets/images/background.svg";

export default function ReduxWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <div
      className={`flex flex-col min-h-screen max-w-full ${
        !isLoggedIn ? "bg-auto bg-center" : ""
      }`}
      style={!isLoggedIn ? { backgroundImage: `url(${background})` } : {}}
    >
      <div className="sticky top-0 z-50 w-full">
        <Header isLoggedIn={isLoggedIn} />
      </div>
      <main className="flex-1 flex w-full">{children}</main>
      <Footer />
    </div>
  );
}
