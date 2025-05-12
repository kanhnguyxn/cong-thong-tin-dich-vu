import { fetchWithAuth } from "@utils/requestWithAuth";

export async function getUser() {
  try {
    const resData = await fetchWithAuth({
      input: "/auth/user/profile",
      init: {
        method: "GET",
      },
    });
    // console.log("resData", resData);
    switch (resData.status) {
      case 200:
        const data = await resData.json();
        // console.log("Thông tin người dùng:", data);
        return {
          userName: data.data.username,
          userType: data.data.userType,
        };
      case 401:
        // console.log("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
        return null;
      case 500:
        console.log("Có lỗi xảy ra, vui lòng thử lại sau");
        return null;
      default:
        console.log("Có lỗi xảy ra, vui lòng thử lại sau");
        return null;
    }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    return null;
  }
}
