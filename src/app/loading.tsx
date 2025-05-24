import React from "react";
import "@styles/globals.css";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-4 text-center bg-white">
      <div className="h-16 w-16 border-4 border-[var(--color-blue)] border-t-transparent rounded-full animate-spin mb-6"></div>
      <h1 className="text-2xl font-semibold mb-2 text-[var(--color-blue)]">
        Đang tải dữ liệu...
      </h1>
      <p className="text-gray-600">Vui lòng chờ trong giây lát.</p>
    </div>
  );
}
