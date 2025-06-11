import "@styles/animations.css";
import "@styles/globals.css";
import ReduxProvider from "./reduxProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen max-w-full">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
