// const API_BASE_URL = "https://3522-123-19-224-121.ngrok-free.app/api";
import { methods, API_BASE_URL } from "../config";
import getToken from "@utils/getToken";

// Cờ kiểm tra xem việc refresh token đã đang chạy chưa
export let isResfreshToken = false;
// Nếu refresh đang chạy, các yêu cầu khác có thể await cái Promise này để đợi.
let refreshPromise: Promise<void> | null = null;

export async function refreshToken() {
  // Nếu refresh token đã đang chạy, thì trả về cái Promise đó
  if (isResfreshToken && refreshPromise) {
    return refreshPromise;
  }

  // lay token hien tai
  const { access, refresh } = getToken();

  isResfreshToken = true;
  refreshPromise = new Promise<void>(async (resolve, rejects) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: methods.POST,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({ refreshToken: refresh }),
      });
      const resData = await res.json();
      document.cookie = `access=${resData.accessToken}; path=/; max-age=10800`;
      // goi recolve de thong bao cho cac promise khac la da hoan thanh
      resolve();
    } catch (err) {
      window.location.href = "/tai-khoan/dang-nhap";
      // goi reject de thong bao cho cac promise khac la da hoan thanh
      rejects();
    } finally {
      // reset lai bien kiem soat
      isResfreshToken = false;
      refreshPromise = null;
    }
  });
  // Neu refresh token da chay, thi tra ve promise nay
  return refreshPromise;
}
