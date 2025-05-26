import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";

export async function getDonDangKyChiTiet() {
  try {
    const resData = await fetchWithAuth({
      url: `/students/forms/details`,
      method: methods.GET,
    });
    GetStatusCode(resData.statusCode);
    return { status: true, data: resData.data };
  } catch (error) {
    return {
      status: false,
      message: error.message || "Lỗi khi lấy chi tiết đơn đăng ký",
    };
  }
}
