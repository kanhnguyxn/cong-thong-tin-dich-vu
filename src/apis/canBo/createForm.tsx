import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";

type CreateFormResquest = {
  maCB: string;
  tenDon: string;
  thongTinChiTiet: string;
};

export default async function createForm(data: CreateFormResquest) {
  try {
    const res = await fetchWithAuth({
      method: methods.POST,
      url: "/staff/registration-forms",
      data: data,
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
