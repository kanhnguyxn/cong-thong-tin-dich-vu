import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";

type FormRequestData = {
  maDonCT: string;
  maDon: string;
  maSV: string;
  hocKyHienTai: string;
  ngayTaoDonCT: string;
  thongTinChiTiet: string; // dạng string JSON
  trangThaiXuLy: string;
};

export async function createFormRequest(data: FormRequestData) {
  try {
    const resData = await fetchWithAuth({
      url: "/students/forms/detail",
      method: methods.POST,
      data: data,
    });
    GetStatusCode(resData.statusCode);
    return { status: true, message: "Tạo đơn đăng ký thành công" };
  } catch (error) {
    return {
      status: false,
      message: error.message || "Có lỗi xảy ra, vui lòng thử lại sau",
    };
  }
}
