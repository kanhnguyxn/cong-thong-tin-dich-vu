const API_BASE_URL = "https://ea8a-123-19-224-121.ngrok-free.app/api";

export async function refreshToken() {
  // Lấy refresh token từ cookie
  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  const refresh = cookies["refresh"];

  if (!refresh) {
    // Chuyển đến trang đăng nhập nếu không có refresh token
    window.location.href = "/tai-khoan/dang-nhap";
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refresh }),
    });

    const resData = await res.json();

    switch (res.status) {
      case 200:
        console.log("Token mới:", resData);
        document.cookie = `access=${resData.accessToken}; path=/; max-age=7200`;

      case 400:
        throw new Error("Dữ liệu không hợp lệ");

      case 401:
        window.location.href = "/tai-khoan/dang-nhap";
        throw new Error("Token không hợp lệ hoặc đã hết hạn");

      case 500:
        throw new Error("Đã có lỗi hệ thống, vui lòng thử lại sau");

      default:
        throw new Error("Đã xảy ra lỗi không xác định");
    }
  } catch (error) {
    console.error("Lỗi khi làm mới token:", error);
    throw error;
  }
}
