import { TextFieldProps } from "@components/input/TextInput";

export interface FormConfig {
  title: string;
  subtitle: string;
  email: TextFieldProps;
  otp: TextFieldProps;
  buttons: {
    submit: string;
    cancel: string;
    confirm: string;
    continue: string;
    loading: string;
  };
  popups: {
    notification: string;
    message: string;
    link: {
      name: string;
      url: string;
    };
  };
  links: {
    loginWithPassword: string;
  };
  console: {
    sendingResetLink: string;
    verifyingOtp: string;
  };
  errorMessages: {
    emptyFields: string;
    loginFailed: string;
    generalError: string;
    OTPIncorrect: string;
    passwordNotMatch: string;
  };
  alert: {
    changePassWordSuccess: string;
  };
}

export const FORGOT_PASSWORD_FORM_CONFIG: FormConfig = {
  title: "Cổng thông tin-Dịch vụ",
  subtitle: "Lấy lại mật khẩu",
  email: {
    name: "email",
    label: "Nhập Email",
    type: "email",
    required: true,
    placeholder: "Nhập email của bạn",
    validation: {
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Email không hợp lệ",
      },
    },
  },
  otp: {
    name: "otp",
    label: "Mã OTP",
    type: "text",
    required: true,
    placeholder: "Nhập mã OTP",
    validation: {
      minLength: {
        value: 6,
        message: "Mã OTP phải có ít nhất 6 ký tự",
      },
    },
  },
  buttons: {
    submit: "Gửi",
    cancel: "Hủy",
    confirm: "Xác nhận",
    continue: "Tiếp tục",
    loading: "Loading...",
  },
  popups: {
    notification: "Thông báo",
    message: "Chúng tôi đã gửi mã OTP đến email của bạn",
    link: {
      name: "Đăng nhập bằng mật khẩu",
      url: "/login",
    },
  },
  links: {
    loginWithPassword: "Đăng nhập bằng mật khẩu",
  },
  console: {
    sendingResetLink: "Sending reset link to:",
    verifyingOtp: "Verifying OTP:",
  },
  errorMessages: {
    emptyFields: "Vui lòng điền đầy đủ thông tin",
    loginFailed: "Đăng nhập thất bại, vui lòng thử lại",
    generalError: "Có lỗi xảy ra, vui lòng thử lại sau",
    OTPIncorrect: "Mã OTP không chính xác",
    passwordNotMatch: "Mật khẩu chưa hợp lệ",


  },
  alert: {
    changePassWordSuccess: "Mật khẩu đã được thay đổi thành công",
  }
};
