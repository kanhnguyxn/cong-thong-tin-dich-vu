import { LoginFormConfig } from './types';

// Cấu hình form - nơi tập trung tất cả các thiết lập form
export const LOGIN_FORM_CONFIG: LoginFormConfig = {
  title: "Cổng Thông tin-Dịch vụ",
  subtitle: "Đăng nhập",
  username: {
    name: "username",
    required: true,
    type: "text",
    placeholder: "username",
  },
  password: {
    name: "password",
    required: true,
    type: "password",
    placeholder: "password",
    rest:{
      icon:{
        visible_password: "../assets/icons/icon_eye.svg",
        hidden_password: "../assets/icons/icon_eye-closed.svg"
      },
    }
  },
  // Xác thực mặc định để đảm bảo các trường không được để trống
  validation:[
    (value:string)=>{
      if (!value) return "Không được để trống"; // Thông báo lỗi nếu trống
      return null; // Trả về null khi hợp lệ
    }
  ],
  // Nội dung hiện ra trong trang login
  buttonText: {
    login: "Đăng nhập",
    loading: "Đang đăng nhập..."
  },
  links: {
    forgotPassword: "Quên mật khẩu?"
  },
  errorMessages: {
    emptyFields: "Vui lòng điền đầy đủ thông tin đăng nhập",
    loginFailed: "Đăng nhập thất bại, hãy  thử lại!",
    generalError: "Có lỗi xảy ra. Vui lòng thử lại sau."
  }  
};
