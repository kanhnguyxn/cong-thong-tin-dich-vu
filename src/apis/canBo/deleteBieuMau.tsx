import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";

// tao datamock
export async function deleteBieuMau(maBMList: string[]) {
  console.log("maBMList", maBMList);
  try {
    const resData = await fetchWithAuth({
      // thay url
      url: "/staff/templates/multiple",
      method: methods.DELETE,
      data: { maBMList: maBMList },
    });
    GetStatusCode(resData.statusCode);
    return { status: true, data: resData.data };
  } catch (error) {
    return { status: false, message: error || "Lỗi khi xóa biểu mẫu" };
  }
}
