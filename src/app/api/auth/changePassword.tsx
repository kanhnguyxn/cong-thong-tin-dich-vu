import { fetchWithAuth } from "src/app/utils/requestWithAuth";

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
    const resData = await fetchWithAuth({
      input: "auth/change-password",
      init: {
        method: "POST",
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        }),
      },
    });
    switch (resData.status) {
      case 200:
        return true;
      case 400:
        console.log("Mật khẩu không hợp lệ");
        return false;
      case 401:
        console.log("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
        return false;
      case 500:
        console.log("Có lỗi xảy ra, vui lòng thử lại sau");
        return false;
      default:
        console.log("Có lỗi xảy ra, vui lòng thử lại sau");
        return false;
    }
  } catch (error) {
    console.error("Lỗi khi thay đổi mật khẩu:", error);
    return false;
  }
}
