import { fetchWithAuth } from "@utils/requestWithAuth";

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
      input: "/auth/change-password",
      init: {
        method: "POST",
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        }),
      },
    });

    if (!resData) {
      console.log("Không nhận được phản hồi");
      return false;
    }
    const Data = await resData.json();
    switch (resData.status) {
      case 200:
        return { status: true, message: Data.message };
      case 400:
        // console.log("Mật khẩu không hợp lệ");
        return {
          status: false,
          message: Data.message || "Mật khẩu không hợp lệ",
        };
      case 401:
        // console.log("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
        return {
          status: false,
          message:
            Data.message ||
            "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!",
        };

      case 500:
        // console.log(Data.message || "Có lỗi xảy ra, vui lòng thử lại sau");
        return {
          status: false,
          message: Data.message || "Có lỗi xảy ra, vui lòng thử lại sau",
        };

      default:
        // console.log("Có lỗi xảy ra, vui lòng thử lại sau");
        return {
          status: false,
          message: Data.message || "Có lỗi xảy ra, vui lòng thử lại sau",
        };
    }
  } catch (error) {
    console.error("Lỗi khi thay đổi mật khẩu:", error);
    return { status: false, message: "Có lỗi xảy ra, vui lòng thử lại sau" };
  }
}
