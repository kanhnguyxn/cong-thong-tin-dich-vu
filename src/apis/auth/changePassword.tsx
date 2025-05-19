import { methods } from "@apis/config";
import { fetchWithAuth } from "../fetchWithAuth";

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
      data: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      }),
    })) as Response;
    const data = await resData.json();
    console.log("resData", resData);
    console.log("data", data);

    // switch (resData.status) {
    //   case 200:
    //     return { status: true, message: data.message };
    //   case 400:
    //     // console.log("Mật khẩu không hợp lệ");
    //     return {
    //       status: false,
    //       message: resData.message || "Mật khẩu không hợp lệ",
    //     };
    //   case 401:
    //     // console.log("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
    //     return {
    //       status: false,
    //       message:
    //         resData.message ||
    //         "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!",
    //     };

    //   case 500:
    //     // console.log(Data.message || "Có lỗi xảy ra, vui lòng thử lại sau");
    //     return {
    //       status: false,
    //       message: resData.message || "Có lỗi xảy ra, vui lòng thử lại sau",
    //     };

    //   default:
    //     // console.log("Có lỗi xảy ra, vui lòng thử lại sau");
    //     return {
    //       status: false,
    //       message: data.message || "Có lỗi xảy ra, vui lòng thử lại sau",
    //     };
    // }
  } catch (error) {
    console.error("Lỗi khi thay đổi mật khẩu:", error);
    return { status: false, message: "Có lỗi xảy ra, vui lòng thử lại sau" };
  }
}
