import { fetchWithAuth } from "@utils/requestWithAuth";

export async function getBieuMau() {
  try {
    const resData = await fetchWithAuth({
      input: "/students/templates",
      init: {
        method: "GET",
      },
    });
    const data = await resData.json();
    switch (resData.status) {
      case 200:
        return data;
      case 401:
        throw new Error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
      case 500:
        throw new Error("Có lỗi xảy ra, vui lòng thử lại sau");

      default:
        throw new Error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  } catch (error) {
    throw new Error("Có lỗi xảy ra, vui lòng thử lại sau");
  }
}
