import getToken from "./getToken";
import { refreshToken } from "./refreshToken";

const API_BASE_URL = "https://ea8a-123-19-224-121.ngrok-free.app/";

interface fetchOptions {
  input: RequestInfo;
  init?: RequestInit;
}

export async function fetchWithAuth({
  input,
  init,
}: fetchOptions): Promise<Response> {
  const { access, refresh } = getToken();
  if (!refresh) {
    window.location.href = "/tai-khoan/dang-nhap";
    // hien alert thong bao het phien dang nhap
    alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
    return;
  }
  const infor = {
    ...init,
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify({
      ...(init?.body && typeof init.body === "object" ? init.body : {}),
      accessToken: access,
    }),
  };

  let res = await fetch(`${API_BASE_URL}${input}`, infor);
  if (res.status === 401) {
    // goi refresh token
    const success = await refreshToken({ refreshToken: refresh });
    if (!success) {
      window.location.href = "/tai-khoan/dang-nhap";
      alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
      return res;
    }
  }
  return res;
}
