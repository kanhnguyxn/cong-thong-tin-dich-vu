import { GetStatusCode, methods } from "@apis/config";
import { fetchWithAuth } from "@apis/fetchWithAuth";
import { donCanXuLy } from "@services/donCanXuLy";

export async function getDonDangKyCTMockup() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(donCanXuLy);
    }, 1000);
  });
}
