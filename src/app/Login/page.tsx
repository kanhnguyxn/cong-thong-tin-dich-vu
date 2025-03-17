"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import router Next.js để điều hướng

// Import các component tùy chỉnh từ ứng dụng
import { Form, useForm } from "@components/FormInput";
import { TextInput } from "@components/TextInput";
import { Container } from "@components/Container";
import Button from "@components/button";

// Các kiểu dữ liệu cho cấu hình form
// FormField định nghĩa cấu trúc cho mỗi trường nhập liệu
type FormField = {
  name: string;       // Định danh của trường
  required: boolean;  // Xác định trường có bắt buộc hay không
  type: string;       // Loại input (text, password, v.v.)
  placeholder: string; // Văn bản gợi ý
};

// Kiểu cấu hình cho toàn bộ form đăng nhập
type LoginFormConfig = {
  title: string;      // Tiêu đề form
  subtitle: string;   // Phụ đề form
  username: FormField; // Cấu hình trường tên đăng nhập
  password: FormField; // Cấu hình trường mật khẩu
  validation?: ((value: string) => string | null)[]; // Quy tắc xác thực
};

// Cấu hình form - nơi tập trung tất cả các thiết lập form
const LOGIN_FORM_CONFIG: LoginFormConfig = {
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
  },
  // Xác thực mặc định để đảm bảo các trường không được để trống
  validation:[
    (value:string)=>{
      if (!value) return "Không được để trống"; // Thông báo lỗi nếu trống
      return null; // Trả về null khi hợp lệ
    }
  ]
};

// Các lớp CSS với trạng thái hover và lỗi - kiểu dáng tập trung
const STYLES = {
  input: "w-full px-4 py-2 border rounded-full mb-4 outline-none transition-all duration-200 hover:outline hover:outline-2 hover:outline-blue-500 focus:outline focus:outline-2 focus:outline-blue-500 text-sm md:text-lg", // Kiểu cơ bản cho input
  inputError: "outline outline-2 outline-red-500 border-red-500", // Kiểu khi có lỗi
  button: "w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4", // Kiểu cho nút
  title: "text-[var(--color-orange)] text-lg md:text-xl lg:text-2xl font-bold mb-2", // Kiểu cho tiêu đề
  subtitle: "text-[var(--color-blue)] uppercase font-bold mb-4 text-sm md:text-lg lg:text-xl", // Kiểu cho phụ đề
  errorPlaceholder: "placeholder:text-red-500", // Kiểu placeholder khi có lỗi
};

// Component xử lý trường với tăng cường xử lý lỗi
function EnhancedInput({ field, className }: { field: FormField, className: string }) {
  const { errors, touched } = useForm(); // Lấy giá trị từ context form
  const error = touched[field.name] ? errors[field.name] : null; // Hiển thị lỗi chỉ khi trường đã được chạm vào
  
  // Kết hợp các lớp input dựa trên trạng thái lỗi
  const inputClass = `${className} ${error ? STYLES.inputError : ''}`;
  
  return (
    <div>
      <TextInput
        id={field.name}
        name={field.name}
        required={field.required}
        type={field.type}
        placeholder={field.placeholder}
        inputClassName={`${inputClass} ${error ? STYLES.errorPlaceholder : ""}`} // Áp dụng kiểu lỗi có điều kiện
        validationRules={LOGIN_FORM_CONFIG.validation} // Truyền quy tắc xác thực
      />
    </div>
  );
}

export default function LoginPage() {
  // Quản lý trạng thái
  const [isLoading, setIsLoading] = useState(false); // Theo dõi trạng thái đang tải trong quá trình đăng nhập
  const [error, setError] = useState<string | null>(null); // Lưu trữ thông báo lỗi
  const router = useRouter(); // Router Next.js để điều hướng sau khi đăng nhập
  
  // Xử lý gửi form
  const handleSubmit = async (values: Record<string, string>) => {
    // Kiểm tra các trường trống như một lớp xác thực bổ sung
    const emptyFields: string[] = [];
    if (!values.username) emptyFields.push('username');
    if (!values.password) emptyFields.push('password');
    
    if (emptyFields.length > 0) {
      setError('Vui lòng điền đầy đủ thông tin đăng nhập');
      return;
    }
    
    try {
      setIsLoading(true); // Hiển thị trạng thái đang tải
      setError(null); // Xóa các lỗi trước đó
      
      // Gọi API để xác thực người dùng
      const response = await loginUser(values.username, values.password);
      
      if (response.success) {
        // Lưu trữ dữ liệu xác thực trong localStorage
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Chuyển hướng đến trang tổng quan sau khi đăng nhập thành công
        router.push('/dashboard');
      } else {
        // Hiển thị lỗi từ API
        setError(response.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
      }
    } catch (err) {
      // Xử lý lỗi không mong đợi
      setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false); // Đặt lại trạng thái đang tải
    }
  };
  
  // Hàm đăng nhập giả - thay thế bằng cuộc gọi API thực tế trong sản phẩm
  const loginUser = async (username: string, password: string) => {
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
      message: 'Tên đăng nhập hoặc mật khẩu không chính xác'
    };
  };
  
  // Giao diện trang đăng nhập
  return (
    <Container
      className="w-full my-8 px-4 sm:w-[60%] mx-[20px] md:w-[50%] lg:w-[30%]" // Container đáp ứng
      content={
        <Form onSubmit={handleSubmit}>
          <h1 className={STYLES.title}>{LOGIN_FORM_CONFIG.title}</h1>
          <h2 className={STYLES.subtitle}>{LOGIN_FORM_CONFIG.subtitle}</h2>
          
          {/* Hiển thị lỗi có điều kiện */}
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm border border-red-200">
              {error}
            </div>
          )}
          
          {/* Trường nhập tên đăng nhập */}
          <EnhancedInput 
            field={LOGIN_FORM_CONFIG.username} 
            className={STYLES.input}
          />
          
          {/* Trường nhập mật khẩu */}
          <EnhancedInput 
            field={LOGIN_FORM_CONFIG.password} 
            className={STYLES.input}
          />
          
          {/* Liên kết khôi phục mật khẩu */}
          <div className="text-left w-full">
            <a className="text-blue-500 text-sm" href="#">Quên mật khẩu?</a>
          </div>
          
          {/* Nút đăng nhập với trạng thái đang tải */}
          <Button 
            type="submit"
            className={STYLES.button}
            name={isLoading ? "Đang đăng nhập..." : "Đăng nhập"} // Văn bản nút động
            disabled={isLoading} // Vô hiệu hóa nút khi đang tải
          />
        </Form>
      }
    />
  );
}





