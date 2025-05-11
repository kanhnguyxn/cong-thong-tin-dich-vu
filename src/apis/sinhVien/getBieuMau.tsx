import { fetchWithAuth } from "@utils/requestWithAuth";

export async function getBieuMau() {
  try {
    const resData = await fetchWithAuth({
      input: "/students/templates",
      init: {
        method: "GET",
      },
    });
    switch (resData.status) {
      case 200:
        const data = await resData.json();
        return data;
      case 401:
        console.log("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
        return null;
      case 500:
        console.log("Có lỗi xảy ra, vui lòng thử lại sau");
        return null;
      default:
        console.log("Có lỗi xảy ra, vui lòng thử lại sau");
        return null;
    }
  } catch (error) {
    console.error("Lỗi:", error);
    return null;
  }
}
