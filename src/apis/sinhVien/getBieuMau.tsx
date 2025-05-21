import { GetStatusCode, methods } from "../config";
import { fetchWithAuth } from "../fetchWithAuth";

export async function getBieuMau() {
  try {
    const resData = await fetchWithAuth({
      url: "/students/templates",
      method: methods.GET,
    });
    GetStatusCode(resData.statusCode);
    return resData.data;
  } catch (error) {
    throw new Error("Có lỗi xảy ra, vui lòng thử lại sau");
  }
}
