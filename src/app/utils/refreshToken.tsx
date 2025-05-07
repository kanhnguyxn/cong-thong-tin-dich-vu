const API_BASE_URL = "https://ea8a-123-19-224-121.ngrok-free.app/api";

export async function refreshToken({ refreshToken }: { refreshToken: string }) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refreshToken }),
    });

    if (!res.ok) {
      return false;
    }
    const resData = await res.json();
    // luwu lai access token
    document.cookie = `access=${resData.accessToken}; path=/; max-age=7200`;
    return true;
  } catch (error) {
    console.error("Lỗi khi làm mới token:", error);
    return false;
  }
}
