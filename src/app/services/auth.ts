// Hàm đăng nhập giả - thay thế bằng cuộc gọi API thực tế trong sản phẩm
export const loginUser = async (username: string, password: string) => {
  // Mô phỏng độ trễ yêu cầu API
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Logic xác thực đơn giản giả lập
  if (username === 'admin' && password === 'password') {
    return {
      success: true,
      token: 'mock-auth-token-12345',
      user: { id: 1, username, name: 'Administrator' }
    };
  }
  
  return {
    success: false,
    message: 'Đăng nhập thất bại, hãy  thử lại!'
  };
};
