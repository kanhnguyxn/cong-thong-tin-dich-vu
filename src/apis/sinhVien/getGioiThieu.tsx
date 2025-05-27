import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";

export async function getGioiThieu() {
  try {
    const resData = await fetchWithAuth({
      url: "/introduction",
      method: methods.GET,
    });
    GetStatusCode(resData.statusCode);
    // console.log("resData", resData.data);
    return resData.data;
  } catch (error) {
    throw new Error(error || "Lỗi khi lấy giới thiệu");
  }
}
