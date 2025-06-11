"use client";
import { redirect } from "next/navigation";
import StoreProvider from "./StoreProvider";
import { makeStore } from "../redux/store";
import { useState } from "react";
import { Provider } from "react-redux";

export default function HomePage() {
  // Create store once using useState to maintain across renders
  const [store] = useState(() => makeStore());
  return <Provider store={store}>{redirect("/tai-khoan/dang-nhap")}</Provider>;
}
