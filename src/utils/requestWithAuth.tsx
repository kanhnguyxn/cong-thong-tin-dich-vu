import getToken from "./getToken";
import { refreshToken } from "./refreshToken";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface fetchOptions {
  input: RequestInfo;
  init?: RequestInit;
}

export async function fetchWithAuth({
  input,
  init = {},
}: fetchOptions): Promise<Response | any> {
  let { access, refresh } = getToken(); // ✅ Dùng let để có thể gán lại access

  if (!refresh) {
    alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
    window.location.href = "/tai-khoan/dang-nhap";
    return;
  }

  const method = init.method?.toUpperCase() || "GET";

  const buildHeaders = (accessToken: string) => ({
    ...init.headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  });

  const fetchOptions: RequestInit = {
    ...init,
    headers: buildHeaders(access),
  };

  // Chỉ gán body nếu không phải GET hoặc HEAD
  if (method !== "GET" && method !== "HEAD" && init.body) {
    fetchOptions.body = init.body;
  }

  const loopLimit = 3;
  let loopCount = 0;
  let res: Response;

  while (loopCount < loopLimit) {
    res = await fetch(`${API_BASE_URL}${input}`, fetchOptions);
    if (res.status !== 401) {
      return res;
    }

    loopCount++;
    const success = await refreshToken();
    if (!success) {
      alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
      window.location.href = "/tai-khoan/dang-nhap";
      return;
    }

    access = getToken().access;
    fetchOptions.headers = buildHeaders(access); // Cập nhật header mới
  }

  return res;
}
