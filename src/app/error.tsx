"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 p-4 text-center">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold">Đã xảy ra lỗi</h1>
        <p className="text-lg text-gray-600">Rất tiếc, đã xảy ra lỗi. Vui lòng thử lại sau.</p>
        {process.env.NODE_ENV === "development" && (
          <div className="max-w-md overflow-auto rounded-md bg-gray-100 p-4 text-left">
            <p className="font-mono text-sm text-red-600">{error.message}</p>
          </div>
        )}
        <button onClick={reset} className="mt-4">
          Thử lại
        </button>
      </div>
    </div>
  );
}
