import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";

// Lấy tất cả đơn chi tiết của sinh viên
export async function getDonDangKyChiTiet() {
  try {
    const resData = await fetchWithAuth({
      url: `/students/forms/details`,
      method: methods.GET,
    });
    GetStatusCode(resData.statusCode);

    // Nếu không có dữ liệu hoặc dữ liệu rỗng, trả về mảng trống
    const data = resData.data || [];
    return { status: true, data: Array.isArray(data) ? data : [] };
  } catch (error) {
    // Nếu lỗi do không có dữ liệu, trả về mảng trống với status true
    if (
      error.message?.includes("404") ||
      error.message?.includes("không tìm thấy")
    ) {
      return { status: true, data: [] };
    }
    return {
      status: false,
      message: error.message || "Lỗi khi lấy chi tiết đơn đăng ký",
    };
  }
}
