import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";

export const updateQuyDinh = async (maQD, data) => {
  console.log("updateQuyDinh", maQD, data);
  try {
    const resData = await fetchWithAuth({
      // url đến API update quy định
      url: `/staff/${maQD}`,
      method: methods.PUT,
      data: data,
    });
    GetStatusCode(resData.statusCode);
    return {
      status: true,
      message: "Cập nhật quy định thành công",
    };
  } catch (error) {
    return {
      status: false,
      message: error.message || "Có lỗi xảy ra, vui lòng thử lại sau",
    };
  }
};
