import { methods } from "@apis/config";
import { fetchWithAuth } from "../fetchWithAuth";
import { GetStatusCode } from "@apis/config";

type Response = {
  data: {
    userName: string;
    userType: string;
  };
  statusCode: number;
};

export async function getUser() {
  const url = "/auth/user/profile";

  const res = (await fetchWithAuth({
    url,
    method: methods.GET,
  })) as Response;
  GetStatusCode(res.statusCode);

  return res.data;
}
