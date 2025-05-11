const API_BASE_URL = "https://3522-123-19-224-121.ngrok-free.app/api";
import getToken from "./getToken";
export async function refreshToken() {
  const { access, refresh } = getToken();
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
