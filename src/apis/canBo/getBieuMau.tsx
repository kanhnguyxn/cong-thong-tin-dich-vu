import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";
import dataBieuMauCanBo from "@services/dataBieuMauCanBo";

// tao datamock
export async function getBieuMauMockup() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataBieuMauCanBo);
    }, 1000);
  });
}
