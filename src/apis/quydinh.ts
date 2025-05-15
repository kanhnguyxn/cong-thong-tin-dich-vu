import dataQuyDinh from "@services/dataQuyDinh";
import { fetchMockData, fetchWithAuth, methods } from "./config";

// type BieuMauDataResquest = {
//   tenPB?: string;
//   loaiVanBan?: string;
// };

export const getQuyDinhMockData = async (data?: any, cb?: (data: any) => any) => {
  return await fetchMockData({
    cb,
    expectResponseOptions: {
      expectData: dataQuyDinh,
      status: 200,
    },
  });
};

export const getQuyDinh = async (url: string, data?: any) => {
  return await fetchWithAuth({ method: methods.GET, url, data });
};
