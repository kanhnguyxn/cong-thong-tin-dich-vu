import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";

// tao datamock
export async function deleteQuyDinh(maQDList: string[]) {
  console.log("maDonList", maQDList);
  try {
    const resData = await fetchWithAuth({
      // thay url
      url: "/staff/regulations/multiple",
      method: methods.DELETE,
      data: { maQDList: maQDList },
    });
    GetStatusCode(resData.statusCode);
    return { status: true, data: resData.data };
  } catch (error) {
    return { status: false, message: error || "Lỗi khi xóa biểu mẫu" };
  }
}
