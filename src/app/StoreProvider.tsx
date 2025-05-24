"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@redux/store";

// Redux trong môi trường client-side mà không bị mất trạng thái khi re-render.
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useRef được dùng để giữ store qua các lần render.
  const storeRef = useRef<AppStore | null>(null);
  // chỉ được khởi tạo một lần duy nhất khi component được mount, đảm bảo không tạo lại store mỗi lần component được render lại.
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
