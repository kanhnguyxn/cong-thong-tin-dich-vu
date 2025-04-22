const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (data: { email: string; password: string }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });

    const resData = await res.json();

    switch (res.status) {
      case 200:
        return resData;

      case 400:
        throw new Error(resData.message || 'Dữ liệu không hợp lệ');

      case 401:
        throw new Error('Đăng nhập thất bại, hãy thử lại!');

      case 500:
        throw new Error('Đã có lỗi hệ thống, vui lòng thử lại sau');

      default:
        throw new Error(resData.message || 'Đã xảy ra lỗi không xác định');
    }
  } catch (error: any) {
    console.error('Lỗi khi gọi API login:', error);
    throw new Error(error.message || 'Lỗi kết nối đến máy chủ');
  }
};
