import Link from "next/link";
import "@styles/globals.css";
import "@styles/colors.css";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h2 className="text-4xl font-bold text-red-500 mb-4">404</h2>
      <h1 className="text-2xl font-semibold mb-2">Không tìm thấy trang</h1>
      <p className="text-gray-600 mb-8">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link
        href="/"
        className="px-6 py-2 border-2 border-[var(--color-blue)]  bg-[var(--color-blue)] text-white font-medium rounded-md hover:text-[var(--color-blue)] hover:bg-white  transition-colors"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}
