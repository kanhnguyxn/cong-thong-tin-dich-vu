import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";

// tao datamock
export async function deleteDonDangKy(maDonList: string[]) {
  console.log("maDonList", maDonList);
  try {
    const resData = await fetchWithAuth({
      // thay url
      url: "/staff/registration-forms/multiple",
      method: methods.DELETE,
      data: { maDonList: maDonList },
    });
    GetStatusCode(resData.statusCode);
    return { status: true, data: resData.data };
  } catch (error) {
    return { status: false, message: error || "Lỗi khi xóa biểu mẫu" };
  }
}
