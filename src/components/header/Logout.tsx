import { useState } from "react";
import { useAppDispatch } from "@redux/hook";
import { deleteUser } from "@redux/features/auth/authSlide";
import { deleteAllDonDangKy } from "@redux/features/donDangKySlice";
import { resetQuyDinh } from "@redux/features/quyDinhSlice";
import { resetGioiThieu } from "@redux/features/gioiThieuSlice";
import { resetBieuMau } from "@redux/features/bieuMauSlice";
import { deleteAllDonDangKyChiTiet } from "@redux/features/donDangKyChiTietSlice";

export default function Logout() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      // Xóa tất cả dữ liệu từ Redux store
      dispatch(deleteUser());
      dispatch(deleteAllDonDangKy());
      dispatch(resetQuyDinh());
      dispatch(resetGioiThieu());
      dispatch(resetBieuMau());
      dispatch(deleteAllDonDangKyChiTiet());

      // Xóa tất cả dữ liệu trong localStorage và sessionStorage
      localStorage.clear();
      sessionStorage.clear();

      // Xóa refresh token và access token khỏi cookie
      document.cookie =
        "access=; max-age=0; path=/; domain=" + window.location.hostname;
      document.cookie =
        "refresh=; max-age=0; path=/; domain=" + window.location.hostname;

      // Xóa tất cả cookies liên quan đến auth
      document.cookie = "access=; max-age=0; path=/;";
      document.cookie = "refresh=; max-age=0; path=/;";

      // Thêm delay để người dùng thấy loading screen
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Chuyển hướng về trang login
      window.location.href = "/tai-khoan/dang-nhap";
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      alert("Có lỗi xảy ra khi đăng xuất. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Loading Screen toàn màn hình */}
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
          }}
        >
          <div className="flex flex-col items-center justify-center w-full h-screen p-4 text-center bg-white">
            <div className="h-16 w-16 border-4 border-[var(--color-blue)] border-t-transparent rounded-full animate-spin mb-6"></div>
            <h1 className="text-2xl font-semibold mb-2 text-[var(--color-blue)]">
              Đang đăng xuất...
            </h1>
            <p className="text-gray-600">Vui lòng chờ trong giây lát.</p>
          </div>
        </div>
      )}

      <button
        onClick={handleLogout}
        disabled={isLoading}
        style={{
          opacity: isLoading ? 0.6 : 1,
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Đang đăng xuất..." : "Đăng xuất"}
      </button>
    </>
  );
}
