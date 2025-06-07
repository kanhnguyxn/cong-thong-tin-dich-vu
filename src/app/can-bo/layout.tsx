"use client";
import Footer from "@components/Footer";
import Header from "@components/header/Header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen max-w-full">
      <div className="sticky top-0 z-10 w-full">
        <Header />
      </div>
      <main className="flex-1 flex w-full">{children}</main>
      <Footer />
    </div>
  );
}
