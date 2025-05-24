import { GetStatusCode, methods } from "../config";
import { fetchWithAuth } from "../fetchWithAuth";

export async function getBieuMau() {
  try {
    const resData = await fetchWithAuth({
      url: "/students/templates",
      method: methods.GET,
    });
    GetStatusCode(resData.statusCode);
    return { status: true, data: resData.data };
  } catch (error) {
    return { status: false, message: error || "Lỗi khi lấy biểu mẫu" };
  }
}
