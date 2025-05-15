// Mock danh sách email
const existingEmails = [
  "example1@gmail.com",
  "user.test@yahoo.com",
  "hello123@outlook.com"
];

// Kiểm tra email đã tồn tại hay chưa
export const isEmailExisted=(inputEmail: string)=>{
  let found = false
  found = existingEmails.some(
    email => email.toLowerCase() === inputEmail.toLowerCase()
  );
  return found;
}

// Sinh OTP ngẫu nhiên
export const generateOtp = (): string => {
  const otp = '123456'
  return otp;
};

// Kiểm tra OTP
export const validateOtp = (inputOtp: string, expectedOtp: string): boolean => {
  return inputOtp === expectedOtp;
};
