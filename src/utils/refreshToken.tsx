// const API_BASE_URL = "https://3522-123-19-224-121.ngrok-free.app/api";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

import getToken from "./getToken";
export async function refreshToken() {
  const { access, refresh } = getToken();
  console.log("access", access);
  console.log("refresh", refresh);
  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify({ refreshToken: refresh }),
    });

    if (!res.ok) {
      return false;
    }
    const resData = await res.json();
    // luwu lai access token
    document.cookie = `access=${resData.accessToken}; path=/; max-age=10800`;
    return true;
  } catch (error) {
    console.error("Lỗi khi làm mới token:", error);
    return false;
  }
}
