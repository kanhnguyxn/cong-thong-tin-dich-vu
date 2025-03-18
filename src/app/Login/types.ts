// Định nghĩa cấu trúc cho mỗi trường nhập liệu
export type FormField = {
  name: string;       // Định danh của trường
  required: boolean;  // Xác định trường có bắt buộc hay không
  type: string;       // Loại input (text, password, v.v.)
  placeholder: string; // Văn bản gợi ý
  rest?: any;
};

// Kiểu cấu hình cho toàn bộ form đăng nhập
export type LoginFormConfig = {
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
    };
    errorMessages: {    // Các thông báo lỗi
        emptyFields: string;  // Thông báo trường trống
        loginFailed: string;  // Thông báo đăng nhập thất bại
        generalError: string; // Thông báo lỗi tổng quát
    }

};
