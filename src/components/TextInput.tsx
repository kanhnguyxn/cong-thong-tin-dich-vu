"use client";

import { ChangeEvent} from 'react';
import { useForm } from './FormInput';

// Định nghĩa props cho component TextInput
interface TextFieldProps {
  id?: string;                  // ID của input
  name: string;                 // Tên trường (bắt buộc để tương tác với Form)
  label?: string;               // Nhãn hiển thị
  required?: boolean;           // Đánh dấu trường bắt buộc
  wrapperClassName?: string;    // CSS class cho div bao quanh
  inputClassName?: string;      // CSS class cho input
  labelClassName?: string;      // CSS class cho label
  type?: string;                // Loại input (text, password, etc.)
  placeholder?: string;         // Văn bản gợi ý
  maxLength?: number;           // Độ dài tối đa
  dataAttributes?: {            // Thuộc tính dữ liệu bổ sung
    inputDataAttributes?: {
      className?: string;       // CSS class bổ sung
      onInput?: string;         // JavaScript sẽ chạy khi nhập liệu
    };
  };
}

export function TextInput(props: TextFieldProps) {
  const {
    id,
    name,
    label,
    required,
    wrapperClassName,
    inputClassName,
    labelClassName,
    type = 'text',
    placeholder,
    maxLength,
    dataAttributes
  } = props;

  // Sử dụng context của Form
  const { values, errors, touched, handleChange } = useForm();
  

  // Xử lý sự kiện khi giá trị input thay đổi
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(name, e.target.value);
  };

  // Chuẩn bị các thuộc tính dữ liệu cho input
  const inputDataProps: Record<string, any> = {};
  if (dataAttributes?.inputDataAttributes) {
    Object.entries(dataAttributes.inputDataAttributes).forEach(([key, value]) => {
      if (key === 'className') {
        // className được xử lý riêng trong thuộc tính className
      } else if (key === 'onInput') {
        inputDataProps['onInput'] = (e: any) => {
          // Tạo một hàm từ chuỗi JavaScript và gọi nó với context là phần tử input
          new Function('this', value).call(e.target, e.target);
        };
      } else {
        inputDataProps[`data-${key}`] = value;
      }
    });
  }

  // Lấy giá trị hiện tại và trạng thái lỗi từ context
  const value = values[name] || '';
  const error = touched[name] ? errors[name] : null; // Chỉ hiển thị lỗi khi trường đã được tương tác

  return (
    <div className={wrapperClassName || ''}>
      {label && (
        <label 
          className={labelClassName || ''} 
          htmlFor={id || name}
        >
          {label}
          {/* {required && <span className="required">*</span>} Hiển thị dấu * nếu trường bắt buộc */}
        </label>
      )}
      <input
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={onInputChange}
        required={required}
        className={`${inputClassName || ''} ${dataAttributes?.inputDataAttributes?.className || ''} ${error ? 'error' : ''}`}
        {...inputDataProps}
      />
      {error && <span className="error-message">{error}</span>} {/* Hiển thị thông báo lỗi nếu có */}
    </div>
  );
}