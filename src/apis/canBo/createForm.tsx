import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";

type CreateFormResquest = {
  // // phai la ma CB
  // maQL: string;
  // // khong can
  // maPB: string;
  tenDon: string;
  thongTinChiTiet: string;
};

export default async function createForm(data: CreateFormResquest) {
  try {
    const res = await fetchWithAuth({
      method: methods.POST,
      url: "/staff/registration-forms",
      data: {
        maQL: "QL_ADMIN",
        maPB: "PB01",
        tenDon: data.tenDon,
        thongTinChiTiet: data.thongTinChiTiet,
      },
    });
    GetStatusCode(res.statusCode);
    return {
      status: true,
      message: "Tạo mẫu đơn thành công",
    };
  } catch (error) {
    return {
      status: false,
      message: "Tạo mẫu đơn thất bại",
    };
  }
}
