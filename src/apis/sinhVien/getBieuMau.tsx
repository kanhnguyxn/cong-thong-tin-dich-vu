import { methods } from "@apis/config";
import { fetchWithAuth } from "../fetchWithAuth";

export async function getBieuMau() {
  try {
    const resData = await fetchWithAuth({
      url: "/students/templates",
      method: methods.GET,
    });
    console.log("resData", resData);
    // const data = await resData.json();
    // switch (resData.status) {
    //   case 200:
    //     return data;
    //   case 401:
    //     throw new Error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
    //   case 500:
    //     throw new Error("Có lỗi xảy ra, vui lòng thử lại sau");

    //   default:
    //     throw new Error("Có lỗi xảy ra, vui lòng thử lại sau");
    // }
  } catch (error) {
    throw new Error("Có lỗi xảy ra, vui lòng thử lại sau");
  }
}
