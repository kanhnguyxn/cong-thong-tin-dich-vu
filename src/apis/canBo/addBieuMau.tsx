import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";

interface AddBieuMauResquest {
  maCB: string;
  tenBM: string;
  lienKet: string;
  thoiGianDang: Date;
}

export async function addBieuMau(data: AddBieuMauResquest) {
  try {
    const resData = await fetchWithAuth({
      // url them bieu mau
      url: "/can-bo/bieu-mau",
      method: methods.POST,
      data: data,
    });
    GetStatusCode(resData.statusCode);
    return { status: true, message: "Thêm biểu mẫu thành công" };
  } catch (error) {
    return {
      status: false,
      message: error.message || "Có lỗi xảy ra, vui lòng thử lại sau",
    };
  }
}
