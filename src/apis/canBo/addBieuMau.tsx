import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";

// interface AddBieuMauResquest {
//   maCB: string;
//   tenBM: string;
//   lienKet: string;
//   thoiGianDang: Date;
// }

export async function addBieuMau(data: any) {
  try {
    const resData = await fetchWithAuth({
      // url them bieu mau
      url: "/staff/templates",
      method: methods.POST,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        TenBm: data.tenBM,
        File: data.file,
      },
    });
    GetStatusCode(resData.statusCode);
    return { status: true, data: resData.data };
  } catch (error) {
    return {
      status: false,
      message: error.message || "Có lỗi xảy ra, vui lòng thử lại sau",
    };
  }
}
