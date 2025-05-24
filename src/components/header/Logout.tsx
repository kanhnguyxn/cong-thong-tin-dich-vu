import { useAppDispatch } from "@lib/hook";
import { deleteUser } from "@lib/features/auth/authSlide";
import { deleteAllDonDangKy } from "@lib/features/donDangKySlice";

export default function Logout() {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    // xoa user khoi redux
    dispatch(deleteUser());
    // xoa don dang ky
    dispatch(deleteAllDonDangKy());
    // xoa refresh token va accsess token khoi cookie
    document.cookie = "access=; max-age=0; path=/;";
    document.cookie = "refresh=; max-age=0; path=/;";
    // chuyen huong ve trang login
    window.location.href = "/tai-khoan/dang-nhap";
  };
  return <button onClick={handleLogout}>Đăng xuất</button>;
}
