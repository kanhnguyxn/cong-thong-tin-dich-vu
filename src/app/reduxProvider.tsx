"use client";
import { makeStore } from "../redux/store";
import { useState } from "react";
import { Provider } from "react-redux";
import { ReactNode } from "react";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  // Create store once using useState to maintain across renders
  const [store] = useState(() => makeStore());
  return <Provider store={store}>{children}</Provider>;
}
