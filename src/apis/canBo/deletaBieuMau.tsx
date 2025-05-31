import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";

// tao datamock
export async function deleteBieuMau(maBM: string[]) {
  try {
    const resData = await fetchWithAuth({
      // thay url
      url: "/can-bo/bieu-mau",
      method: methods.DELETE,
    });
    GetStatusCode(resData.statusCode);
    return { status: true, data: resData.data };
  } catch (error) {
    return { status: false, message: error || "Lỗi khi xóa biểu mẫu" };
  }
}
