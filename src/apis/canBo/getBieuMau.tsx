import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";
import bieuMauData from "@services/dataBieuMauCanBo";

// tao datamock
// export async function getBieuMauMockup() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(bieuMauData);
//     }, 1000);
//   });
// }
export async function getBieuMau() {
  try {
    const response = await fetchWithAuth({
      method: methods.GET,
      url: "/staff/templates",
    });
    GetStatusCode(response.statusCode);
    console.log("getBieuMau response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching Bieu Mau:", error);
    throw new Error(error || "Loi lay bieu mau");
  }
}
