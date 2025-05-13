import { useDispatch } from "react-redux";
import { logout } from "src/lib/features/auth/authSlide";

export default function Logout() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    // xoa user khoi redux
    dispatch(logout());
    // xoa refresh token va accsess token khoi cookie
    document.cookie = "access=; max-age=0; path=/;";
    document.cookie = "refresh=; max-age=0; path=/;";
    // chuyen huong ve trang login
    window.location.href = "/tai-khoan/dang-nhap";
  };
  return <button onClick={handleLogout}>Đăng xuất</button>;
}
