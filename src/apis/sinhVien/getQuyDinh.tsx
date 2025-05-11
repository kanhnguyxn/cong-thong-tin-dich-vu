import { fetchWithAuth } from "@utils/requestWithAuth";
type BieuMauDataResquest = {
  tenPB: string;
  loaiVanBan: string;
};
export async function getQuyDinh({ tenPB, loaiVanBan }: BieuMauDataResquest) {
  try {
    const resData = await fetchWithAuth({
      input: "/students/templates",
      init: {
        method: "POST",
        body: JSON.stringify({
          tenPB: tenPB,
          loaiVanBan: loaiVanBan,
        }),
      },
    });
    switch (resData.status) {
      case 200:
        const data = await resData.json();
        return data;
      case 401:
        console.log("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
        return null;
      case 500:
        console.log("Có lỗi xảy ra, vui lòng thử lại sau");
        return null;
      default:
        console.log("Có lỗi xảy ra, vui lòng thử lại sau");
        return null;
    }
  } catch (error) {
    console.error("Lỗi:", error);
    return null;
  }
}
