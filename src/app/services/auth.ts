// Hàm đăng nhập giả - thay thế bằng cuộc gọi API thực tế trong sản phẩm
export const loginUser = async (username: string, password: string) => {
  // Mô phỏng độ trễ yêu cầu API
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // Logic xác thực đơn giản giả lập
    if (username === 'admin' && password === 'password') {
      return {
        status: 200, // Successful response
        success: true,
        token: 'mock-auth-token-12345',
        user: { id: 1, username, name: 'Administrator' }
      };
    }
    
    // Mô phỏng lỗi server 500 (có thể thay đổi điều kiện này)
    if (username === 'server-error') {
      return {
        status: 500,
        success: false,
        message: 'đã có lỗi xảy ra, vui lòng thử lại'
      };
    }
    
    // Mô phỏng lỗi client (401 - Unauthorized)
    return {
      status: 401,
      success: false,
      message: 'Đăng nhập thất bại, hãy  thử lại!'
    };
  } catch (error) {
    // Xử lý lỗi không mong đợi
    return {
      status: 500,
      success: false,
      message: 'đã có lỗi xảy ra, vui lòng thử lại'
    };
  }
};
