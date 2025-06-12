import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";

// interface AddBieuMauResquest {
//   maCB: string;
//   tenBM: string;
//   lienKet: string;
//   thoiGianDang: Date;
// }

export async function addQuyDinh(data: any) {
  // thieu ma quy dinh
  const {
    tenQD,
    loaiVanBan,
    lienKet,
    noiBanHanh,
    ngayBanHanh,
    ngayCoHieuLuc,
    hieuLuc,
  } = data;
  try {
    const resData = await fetchWithAuth({
      // url them bieu mau
      url: "/staff/regulations",
      method: methods.POST,
      data: {
        tenQD,
        loaiVanBan,
        lienKet,
        noiBanHanh,
        ngayBanHanh,
        ngayCoHieuLuc,
        hieuLuc,
      },
    });
    GetStatusCode(resData.statusCode);
    return { status: true, data: resData.data };
  } catch (error) {
    console.error("Error adding quy dinh:", error);
    return {
      status: false,
      message: error.message || "Có lỗi xảy ra, vui lòng thử lại sau",
    };
  }
}
