"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Import các component tùy chỉnh từ ứng dụng
import { Form } from "@components/FormInput";
import { Container } from "@components/Container";
import Button from "@components/Button";

// Import từ các file đã tách
import { LOGIN_FORM_CONFIG } from "./config";
import { STYLES } from "./styles";
import { EnhancedInput } from "./EnhancedInput";
import { loginUser } from "../services/auth";

export default function LoginPage() {
  // Quản lý trạng thái
  const [isLoading, setIsLoading] = useState(false); // Theo dõi trạng thái đang tải trong quá trình đăng nhập
  const [error, setError] = useState<string | null>(null); // Lưu trữ thông báo lỗi
  const router = useRouter(); // Router Next.js để điều hướng sau khi đăng nhập
  
  // Xử lý gửi form
  const handleSubmit = async (values: Record<string, string>) => {
    try {
      setIsLoading(true); // Hiển thị trạng thái đang tải
      setError(null); // Xóa các lỗi trước đó
      
      // Gọi API để xác thực người dùng
      const response = await loginUser(values.username, values.password);
      
      // Xử lý dựa trên mã trạng thái
      if (response.status === 200 || response.status === 201) {
        // Đăng nhập thành công
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Chuyển hướng đến trang tổng quan sau khi đăng nhập thành công
        router.push('/gioi-thieu');
      } else if (response.status === 500) {
        // Lỗi server
        setError('đã có lỗi xảy ra, vui lòng thử lại');
      } else {
        // Lỗi client (400, 401, 403, etc.)
        setError(response.message || LOGIN_FORM_CONFIG.errorMessages.loginFailed);
      }
    } catch (err) {
      // Xử lý lỗi không mong đợi - lỗi client
      setError(LOGIN_FORM_CONFIG.errorMessages.generalError);
    } finally {
      setIsLoading(false); // Đặt lại trạng thái đang tải
    }
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
            <div className={STYLES.errorStyle}>
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
            <a className={STYLES.linkClassName} href={LOGIN_FORM_CONFIG.links.link}>{LOGIN_FORM_CONFIG.links.forgotPassword}</a>
          </div>
          
          {/* Nút đăng nhập với trạng thái đang tải */}
          <Button 
            type="submit"
            className={STYLES.button}
            name={isLoading ? LOGIN_FORM_CONFIG.buttonText.loading : LOGIN_FORM_CONFIG.buttonText.login}
            disabled={isLoading} // Vô hiệu hóa nút khi đang tải
          />
        </Form>
      }
    />
  );
}





