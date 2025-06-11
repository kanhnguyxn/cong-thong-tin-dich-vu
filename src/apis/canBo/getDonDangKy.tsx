// import { dataDonDangKy } from "@services/dataDonDangKy";
// export async function getDonDangKyMockup() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(dataDonDangKy);
//     }, 1000);
//   });
// }

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
        tenPB: string;
      }
    | [];
  statusCode: number;
};
export async function getDonDangKy() {
  try {
    const resData = (await fetchWithAuth({
      url: `/staff/forms`,
      method: methods.GET,
    })) as Response;
    GetStatusCode(resData.statusCode);
    return { status: true, data: resData.data };
  } catch (error) {
    return {
      status: false,
      message: error.message || "Lỗi khi lấy đơn đăng ký",
    };
  }
}
