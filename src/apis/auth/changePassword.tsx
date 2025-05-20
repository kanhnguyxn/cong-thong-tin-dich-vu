import { methods, GetStatusCode } from "../config";
import { fetchWithAuth } from "../fetchWithAuth";

type Response = {
  statusCode: number;
};

export async function changePassword({
  oldPassword,
  newPassword,
  confirmNewPassword,
}: {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}) {
  try {
    const resData = (await fetchWithAuth({
      url: "/auth/change-password",
      method: methods.POST,
      // chuyen thanh text
      data: {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      },
    })) as Response;

    GetStatusCode(resData.statusCode);
    return { status: true, message: "Thay đổi mật khẩu thành công" };
  } catch (error) {
    return {
      status: false,
      message: error.message || "Có lỗi xảy ra, vui lòng thử lại sau",
    };
  }
}
