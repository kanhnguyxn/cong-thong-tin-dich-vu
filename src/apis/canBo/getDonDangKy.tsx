import { dataDonDangKy } from "@services/dataDonDangKy";
export async function getDonDangKyMockup() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataDonDangKy);
    }, 1000);
  });
}
