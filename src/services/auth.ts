'use client';
// services/loginRequest.ts
export const loginRequest = async (
  usename: string,
  password: string
): Promise<{ accessToken: string; userType: 'student' | 'manager' | 'staff' , refreshToken:string}> => {
  // Giả lập API backend
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (usename === 'admin' && password === '123456') {
        resolve({
          accessToken: 'mock_access_token_abc123',
          refreshToken: 'mock_refresh_token_abc123',
          userType: 'manager', // manager
        });
      } else if (usename === 'student' && password === '123456') {
        resolve({
          accessToken: 'mock_access_token_xyz789',
          refreshToken: 'mock_refresh_token_abc123',
          
          userType: 'student', // student
        });
      } else if (usename === 'staff' && password === '123456') {
        resolve({
          accessToken: 'mock_access_token_qwe456',
          refreshToken: 'mock_refresh_token_abc123',

          userType: 'staff', // staff
        });
      } else {
        reject(new Error('Sai tài khoản hoặc mật khẩu'));
      }
    }, 1000);
  });
};
