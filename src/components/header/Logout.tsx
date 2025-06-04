import { useState } from "react";
import { useAppDispatch } from "@redux/hook";
import { deleteUser } from "@redux/features/auth/authSlide";
import { deleteAllDonDangKy } from "@redux/features/donDangKySlice";

export default function Logout() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      // Xóa user khỏi redux
      dispatch(deleteUser());

      // Xóa đơn đăng ký
      dispatch(deleteAllDonDangKy());

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
  );
}
