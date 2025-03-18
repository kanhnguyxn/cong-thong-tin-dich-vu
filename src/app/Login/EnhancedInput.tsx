"use client";
import React, { useState } from "react";
import { useForm } from "@components/FormInput";
import { TextInput } from "@components/TextInput";
import { FormField } from "./types";
import { STYLES } from "./styles";
import { LOGIN_FORM_CONFIG } from "./config";

interface EnhancedInputProps {
  field: FormField;
  className: string;
}

export function EnhancedInput({ field, className }: EnhancedInputProps) {
  const { errors, touched, values } = useForm(); // Lấy giá trị từ context form
  const error = touched[field.name] ? errors[field.name] : null; // Hiển thị lỗi chỉ khi trường đã được chạm vào
  const [showPassword, setShowPassword] = useState(false); // State để theo dõi hiển thị mật khẩu
  
  // Kiểm tra nếu input có giá trị thì áp dụng style inputFilled
  const hasValue = values[field.name] ? true : false;
  
  // Kết hợp các lớp input dựa trên trạng thái lỗi và có giá trị hay không
  const inputClass = `${className} ${error ? STYLES.inputError : ''} ${hasValue ? STYLES.inputFilled : ''}`;
  
  // Kiểm tra xem đây có phải là trường mật khẩu hay không để hiển thị nút chuyển đổi
  const showPasswordToggle = field.type === 'password';
  
  // Hàm chuyển đổi hiển thị mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
  
  // Xác định loại input dựa trên trạng thái hiển thị mật khẩu
  const inputType = showPasswordToggle 
    ? (showPassword ? 'text' : 'password') 
    : field.type;
  
  return (
    <div className="relative">
      <TextInput
        id={field.name}
        name={field.name}
        required={field.required}
        type={inputType}
        placeholder={field.placeholder}
        inputClassName={`${inputClass} ${error ? STYLES.errorPlaceholder : ""}`} // Áp dụng kiểu lỗi có điều kiện
        validationRules={LOGIN_FORM_CONFIG.validation} // Truyền quy tắc xác thực
      />
      
      {/* Nút hiển thị/ẩn mật khẩu */}
      {showPasswordToggle && field.rest?.icon && (
        <img
          src={showPassword ? field.rest.icon.visible_password : field.rest.icon.hidden_password}
          alt={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          className={STYLES.iconClassName}
          onClick={togglePasswordVisibility}
        />
      )}
    </div>
  );
}
