import "@styles/animations.css";
import "@styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen max-w-full">{children}</body>
    </html>
  );
}
