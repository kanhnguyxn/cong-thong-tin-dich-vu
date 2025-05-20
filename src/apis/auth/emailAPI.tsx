// const API_BASE_URL = "https://3522-123-19-224-121.ngrok-free.app/api";
import { API_BASE_URL, methods } from "../config";

export async function emailRequest(email: string) {
  const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: methods.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });

  // console.log("res", res);

  switch (res.status) {
    case 200:
      return true;
    case 400:
      throw new Error("Dữ liệu không hợp lệ");
    case 401:
      throw new Error("Email không tồn tại trong hệ thống");

    case 500:
      throw new Error("Đã có lỗi hệ thống, vui lòng thử lại sau");
    default:
      throw new Error("Đã xảy ra lỗi không xác định");
  }
}
