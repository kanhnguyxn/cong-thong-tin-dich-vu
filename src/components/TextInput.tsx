"use client";

import { ChangeEvent, useEffect } from 'react';
import { useForm } from './FormInput'; // Import hook context form

// Props đơn giản hóa cho component TextInput
interface TextFieldProps {
  id?: string;                  // ID tùy chọn cho phần tử input
  name: string;                 // Tên trường (bắt buộc để tương tác với form)
  label?: string;               // Văn bản nhãn tùy chọn
  required?: boolean;           // Xác định trường có bắt buộc hay không
  wrapperClassName?: string;    // Lớp CSS cho div bao quanh
  inputClassName?: string;      // Lớp CSS cho phần tử input
  labelClassName?: string;      // Lớp CSS cho phần tử label
  type?: string;                // Loại input (text, password, v.v.)
  placeholder?: string;         // Văn bản gợi ý
  maxLength?: number;           // Độ dài tối đa
  validationRules?: ((value: string) => string | null)[]; // Hàm xác thực tùy chỉnh
  onBlur?: () => void;          // Xử lý sự kiện blur tùy chỉnh
  // thêm 1 số props khác
  rest?: any;
}

export function TextInput(props: TextFieldProps) {
  // Phân rã props với giá trị mặc định
  const {
    id,
    name,
    label,
    required,
    wrapperClassName,
    inputClassName,
    labelClassName,
    type = 'text', // Mặc định là input văn bản
    placeholder,
    maxLength,
    validationRules,
    onBlur
  } = props;

  // Lấy hàm và trạng thái context form
  const { values, errors, touched, handleChange, validation, setFieldTouched } = useForm();
  
  // Đăng ký quy tắc xác thực khi component được tạo
  useEffect(() => {
    // Nếu trường là bắt buộc nhưng không có quy tắc xác thực, thêm kiểm tra trống mặc định
    if (required && (!validationRules || validationRules.length === 0)) {
      validation(name, [(value: string) => {
        if (!value) return "Không được để trống"; // Thông báo xác thực bắt buộc mặc định
        return null;
      }]);
    } 
    // Đăng ký quy tắc xác thực tùy chỉnh nếu được cung cấp
    else if (validationRules && validationRules.length > 0) {
      validation(name, validationRules);
    }
  }, [name, required, validation, validationRules]);

  // Xử lý thay đổi giá trị input
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(name, e.target.value); // Cập nhật context form với giá trị mới
  };

  // Xử lý blur input (mất focus)
  const handleBlur = () => {
    setFieldTouched(name, true); // Đánh dấu trường đã được chạm vào trong context form
    if (onBlur) onBlur(); // Gọi xử lý blur tùy chỉnh nếu được cung cấp
  };

  // Lấy giá trị hiện tại và trạng thái lỗi từ context form
  const value = values[name] || '';
  const error = touched[name] ? errors[name] : null; // Chỉ hiển thị lỗi nếu trường đã được chạm vào

  return (
    <div className={wrapperClassName || ''}>
      {/* Hiển thị label nếu được cung cấp */}
      {label && (
        <label 
          className={labelClassName || ''} 
          htmlFor={id || name}
        >
          {label}
        </label>
      )}
      <input
        id={id || name} // Sử dụng id nếu được cung cấp, mặc định là name
        name={name}
        type={type}
        placeholder={error || placeholder} // Hiển thị lỗi trong placeholder nếu có lỗi
        value={value} // Giá trị input được kiểm soát từ context form
        maxLength={maxLength}
        onChange={onInputChange}
        onBlur={handleBlur}
        required={required}
        className={`${inputClassName || ''} ${error ? 'error' : ''}`} // Áp dụng lớp lỗi nếu cần
        {...props.rest}
      />
    </div>
  );
}