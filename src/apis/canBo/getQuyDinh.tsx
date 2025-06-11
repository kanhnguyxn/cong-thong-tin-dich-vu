import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";

export const getQuyDinh = async () => {
  try {
    const resData = await fetchWithAuth({
      // url đến API lấy quy định
      url: "/staff/regulations/department",
      method: methods.GET,
    });
    GetStatusCode(resData.statusCode);
    return resData.data;
  } catch (error) {
    throw new Error(error || "Lỗi khi lấy quy định");
  }
};

// data mock
// import dataQuyDinh from "@services/dataQuyDinh";
// export async function getQuyDinh() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(dataQuyDinh);
//     }, 1000);
//   });
// }
