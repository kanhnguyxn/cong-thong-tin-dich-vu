import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";

export async function getLichSuDangKy() {
  try {
    const resData = await fetchWithAuth({
      url: "",
      method: methods.GET,
    });
    GetStatusCode(resData.statusCode);
    return resData.data;
  } catch (error) {
    throw new Error(error || "Lỗi khi lấy lịch sử đăng ký");
  }
}
