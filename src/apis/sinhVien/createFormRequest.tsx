import { methods } from "@apis/config";
import { fetchWithAuth } from "../fetchWithAuth";

type FormRequestData = {
  madon: string;
  maSv: string;
  thoiGian: Date;
  thongTinChiTiet: {};
};
export async function createFormRequest({
  madon,
  maSv,
  thoiGian,
  thongTinChiTiet,
}: FormRequestData) {
  try {
    const resData = await fetchWithAuth({
      url: "/sinhVien/create-form",
      method: methods.POST,
      data: JSON.stringify({
        madon: madon,
        maSv: maSv,
        ngayTaoDonCT: thoiGian,
        thongTinChiTiet: thongTinChiTiet,
      }),
    });
    console.log("resData", resData);

    // switch (resData.status) {
    //   case 200:
    //     return true;
    //   case 400:
    //     // console.log("Dữ liệu không hợp lệ");
    //     return false;
    //   case 401:
    //     // console.log("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
    //     return false;
    //   case 500:
    //     console.log("Có lỗi xảy ra, vui lòng thử lại sau");
    //     return false;
    //   default:
    //     console.log("Có lỗi xảy ra, vui lòng thử lại sau");
    //     return false;
    // }
  } catch (error) {
    console.error("Lỗi khi tạo form:", error);
    return false;
  }
}
