import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";

export async function updateStatus({ maDonCT, trangThai }) {
  try {
    const response = await fetchWithAuth({
      // doi url cho dung
      url: `/staff/forms/${maDonCT}/status`,
      method: methods.PUT,
      data: { trangThaiXuLy: trangThai },
    });

    GetStatusCode(response.status);
    return {
      status: true,
      message: "Cập nhật trạng thái thành công",
    };
  } catch (error) {
    return {
      status: false,
      message: error.message || "Lỗi không xác định khi cập nhật trạng thái",
    };
  }
}
