import getToken from "./getToken";
import { refreshToken } from "./refreshToken";

const API_BASE_URL = "https://3522-123-19-224-121.ngrok-free.app/";

interface fetchOptions {
  input: RequestInfo;
  init?: RequestInit;
}

export async function fetchWithAuth({
  input,
  init = {},
}: fetchOptions): Promise<Response | any> {
  const { access, refresh } = getToken();

  if (!refresh) {
    alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
    window.location.href = "/tai-khoan/dang-nhap";
    return;
  }

  const method = init.method?.toUpperCase() || "GET";

  const headers = {
    ...init.headers,
    // "Content-Type": "application/json",
    Authorization: `Bearer ${access}`,
  };

  const fetchOptions: RequestInit = {
    ...init,
    headers,
  };

  // Chỉ gán body nếu không phải GET hoặc HEAD
  if (method !== "GET" && method !== "HEAD" && init.body) {
    fetchOptions.body = init.body;
  }

  console.log("fetchOptions", fetchOptions);
  console.log("input", input);
  let res = await fetch(`${API_BASE_URL}${input}`, fetchOptions);

  if (res.status === 401) {
    const success = await refreshToken();
    if (!success) {
      alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
      window.location.href = "/tai-khoan/dang-nhap";
      return;
    }

    // Gọi lại fetch lần nữa sau khi đã refresh token
    const newAccess = getToken().access;
    console.log("newAccess", newAccess);
    fetchOptions.headers = {
      ...headers,
      Authorization: `Bearer ${newAccess}`,
    };
    res = await fetch(`${API_BASE_URL}${input}`, fetchOptions);
  }

  return res;
}
