import { actionQueue } from "@utils/actionQueue";
import getToken from "@utils/getToken";
import { API_BASE_URL } from "./config";

import { isResfreshToken, refreshToken } from "./auth/refreshToken";

interface fetchOptions {
  method?: string;
  url: string;
  data?: any;
  headers?: Record<string, string>;
}

export async function fetchWithAuth({
  method,
  url,
  data,
  headers,
}: fetchOptions) {
  const { access, refresh } = getToken();

  if (!refresh) {
    // alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
    window.location.href = "/tai-khoan/dang-nhap";
    return;
  }
  // header mặc định
  const hedearsDefault = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access}`,
  };
  // Nếu có header thì merge với header mặc định
  if (headers) {
    Object.assign(hedearsDefault, headers);
  }

  const run = async () => {
    let res = await fetch(`${API_BASE_URL}${url}`, {
      method: method,
      headers: hedearsDefault,
      body: data ? JSON.stringify(data) : null,
    });
    console.log("fetchWithAuth", {
      method,
      url,
      data,
    });

    if (res.status === 401) {
      await refreshToken();
      return fetchWithAuth({ url, data, method });
    }
    const response = await res.json();
    // console.log("response", response);
    return response;
  };

  // Nếu đang refresh → đưa vào hàng đợi
  if (isResfreshToken) {
    return new Promise((resolve) => {
      actionQueue.enqueue(async () => {
        const result = await run();
        resolve(result);
      });
    });
  }

  // Nếu không đang refresh → chạy ngay
  return run();
}
