import { API_BASE_URL, methods } from "../config";

export const loginRequest = async (username: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: methods.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  switch (res.status) {
    case 200:
      const resData = await res.json();
      return resData;

    case 400:
      throw new Error("Dữ liệu không hợp lệ");

    case 401:
      throw new Error("Đăng nhập thất bại, hãy thử lại!");

    case 500:
      throw new Error("Đã có lỗi hệ thống, vui lòng thử lại sau");

    default:
      throw new Error("Đã xảy ra lỗi không xác định");
  }
};
