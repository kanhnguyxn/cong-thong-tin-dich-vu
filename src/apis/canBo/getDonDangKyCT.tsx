import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";
// import { donCanXuLy } from  @services/donCanXuLy ;

// export async function getDonDangKyCTMockup() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(donCanXuLy);
//     }, 1000);
//   });
// }

type GetDonDangKyCTResponse = {
  data: {
    maDon: string;
    maDonCT: string;
    tenDon: string;
    maSV: string;
    hocKyHienTai: string;
    ngayTaoDonCT: Date;
    thongTinChiTiet: string;
    trangThaiXuLy: string;
    hoTen: string;
    lop: string;
    khoa: string;
    email: string;
    chuyenNganh: string;
    khoaHoc: string;
  }[];
  statusCode: number;
};

export async function getDonDangKyCT() {
  try {
    const response = (await fetchWithAuth({
      url: `/staff/forms/department`,
      method: methods.GET,
    })) as GetDonDangKyCTResponse;

    GetStatusCode(response.statusCode);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Lỗi khi lấy đơn đăng ký chi tiết");
  }
}
