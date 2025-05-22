import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";

type Response = {
  data:
    | {
        maDon: string;
        maPB: string;
        tenDon: string;
        maCB: string;
        maQL: string;
        thongTinChiTiet: string;
        thoiGianDang: string;
        trangThai: boolean;
      }
    | [];
  statusCode: number;
};
export async function getDonDangKy() {
  try {
    const resData = (await fetchWithAuth({
      url: "/students/forms",
      method: methods.GET,
    })) as Response;
    console.log("res statusCode", resData.statusCode);
    GetStatusCode(resData.statusCode);
    return resData.data;
  } catch (error) {
    throw new Error("Có lỗi xảy ra, vui lòng thử lại sau");
  }
}
