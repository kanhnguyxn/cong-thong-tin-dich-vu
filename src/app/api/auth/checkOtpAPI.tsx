const API_BASE_URL = "https://ea8a-123-19-224-121.ngrok-free.app/api";

export async function checkOtpRequest(email: string, otp: string) {
  const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, token: otp }),
  });
  switch (res.status) {
    case 200:
      return true;
    case 400:
      throw new Error("Dữ liệu không hợp lệ");
    case 401:
      throw new Error("Mã OTP không hợp lệ hoặc đã hết hạn");
    case 500:
      throw new Error("Đã có lỗi hệ thống, vui lòng thử lại sau");
    default:
      throw new Error("Đã xảy ra lỗi không xác định");
  }
}
