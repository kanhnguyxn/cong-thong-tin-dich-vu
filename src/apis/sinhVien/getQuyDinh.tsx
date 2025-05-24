import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "../fetchWithAuth";

export async function getQuyDinh() {
  try {
    const resData = await fetchWithAuth({
      url: "/students/regulations",
      method: methods.GET,
    });
    GetStatusCode(resData.statusCode);
    // console.log("resData", resData);
    return resData.data;
  } catch (error) {
    throw new Error(error || "Lỗi khi lấy quy định");
  }
}
