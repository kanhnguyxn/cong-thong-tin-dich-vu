'use client';
// services/loginRequest.ts
export const loginRequest = async (
  usename: string,
  password: string
): Promise<{ accessToken: string; userType: 'student' | 'manager' | 'staff' }> => {
  // Giả lập API backend
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (usename === 'admin' && password === '123456') {
        resolve({
          accessToken: 'mock_access_token_abc123',
          userType: 'manager', // manager
        });
      } else if (usename === 'student' && password === '123456') {
        resolve({
          accessToken: 'mock_access_token_xyz789',
          userType: 'student', // student
        });
      } else if (usename === 'staff' && password === '123456') {
        resolve({
          accessToken: 'mock_access_token_qwe456',
          userType: 'staff', // staff
        });
      } else {
        reject(new Error('Sai tài khoản hoặc mật khẩu'));
      }
    }, 1000);
  });
};
