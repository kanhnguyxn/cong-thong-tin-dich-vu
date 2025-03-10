import type { Metadata } from "next";
import { Inter, Fira_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const firaSans = Fira_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-sans",
});

export const metadata: Metadata = {
  title: "Cổng thông tin dịch vụ",
  description: "Cổng thông tin dịch vụ công",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${inter.className} ${firaSans.variable}`}>
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Cổng thông tin dịch vụ</h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a href="/" className="hover:underline">
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a href="/dich-vu" className="hover:underline">
                    Dịch vụ
                  </a>
                </li>
                <li>
                  <a href="/lien-he" className="hover:underline">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="container mx-auto py-8 px-4">{children}</main>

        <footer className="bg-gray-100 p-4 mt-8">
          <div className="container mx-auto">
            <p className="text-center text-gray-600">
              © {new Date().getFullYear()} Cổng thông tin dịch vụ. Tất cả các quyền được bảo lưu.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
