import { FormField } from '@types/types';

// Kiểu cấu hình cho toàn bộ form đăng nhập
type LoginFormConfig = {
  title: string;      // Tiêu đề form
  subtitle: string;   // Phụ đề form
  username: FormField; // Cấu hình trường tên đăng nhập
  password: FormField; // Cấu hình trường mật khẩu
  validation?: ((value: string) => string | null)[]; // Quy tắc xác thực
    buttonText: {        // Văn bản nút đăng nhập
        login: string;     // Văn bản nút đăng nhập
        loading: string;   // Văn bản đang tải
    };
    links: {            // Liên kết trong form
        forgotPassword: string; // Liên kết quên mật khẩu
        link: string;           // Liên kết chuyển hướng
    };
    errorMessages: {    // Các thông báo lỗi
        emptyFields: string;  // Thông báo trường trống
        loginFailed: string;  // Thông báo đăng nhập thất bại
        generalError: string; // Thông báo lỗi tổng quát
    }

};


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
 
  // Nội dung hiện ra trong trang login
  buttonText: {
    login: "Đăng nhập",
    loading: "Đang đăng nhập..."
  },
  links: {
    forgotPassword: "Quên mật khẩu?",
    link:'/Forgot-password'
  },
  errorMessages: {
    emptyFields: "Vui lòng điền đầy đủ thông tin đăng nhập",
    loginFailed: "Đăng nhập thất bại, hãy  thử lại!",
    generalError: "Có lỗi xảy ra. Vui lòng thử lại sau."
  }  
};
