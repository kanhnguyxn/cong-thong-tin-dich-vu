"use client";

import { ChangeEvent, useEffect } from 'react';
import { useForm } from './FormInput';

// Định nghĩa props cho component TextAreaInput
interface TextAreaFieldProps {
  id?: string;                  // ID của textarea
  name: string;                 // Tên trường (bắt buộc để tương tác với Form)
  label?: string;               // Nhãn hiển thị
  required?: boolean;           // Đánh dấu trường bắt buộc
  wrapperClassName?: string;    // CSS class cho div bao quanh
  textareaClassName?: string;   // CSS class cho textarea
  labelClassName?: string;      // CSS class cho label
  validation?: ((value: string) => string | null)[]; // Mảng các hàm kiểm tra
  placeholder?: string;         // Văn bản gợi ý
  rows?: number;                // Số hàng của textarea
  cols?: number;                // Số cột của textarea
  dataAttributes?: {            // Thuộc tính dữ liệu bổ sung
    textareaDataAttributes?: {
      className?: string;       // CSS class bổ sung
      onInput?: string;         // JavaScript sẽ chạy khi nhập liệu
    };
  };
}

export function TextAreaInput(props: TextAreaFieldProps) {
  const {
    id,
    name,
    label,
    required,
    wrapperClassName,
    textareaClassName,
    labelClassName,
    validation = [],
    placeholder,
    rows,
    cols,
    dataAttributes
  } = props;

  // Sử dụng context của Form
  const { values, errors, touched, handleChange, registerValidation } = useForm();
  
  // Đăng ký các quy tắc kiểm tra khi component được tạo
  useEffect(() => {
    if (validation.length > 0) {
      registerValidation(name, validation);
    }
  }, [name, registerValidation, validation]);

  // Xử lý sự kiện khi giá trị textarea thay đổi
  const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(name, e.target.value);
  };

  // Chuẩn bị các thuộc tính dữ liệu cho textarea
  const textareaDataProps: Record<string, any> = {};
  if (dataAttributes?.textareaDataAttributes) {
    Object.entries(dataAttributes.textareaDataAttributes).forEach(([key, value]) => {
      if (key === 'className') {
        // className được xử lý riêng trong thuộc tính className
      } else if (key === 'onInput') {
        textareaDataProps['onInput'] = (e: any) => {
          // Tạo một hàm từ chuỗi JavaScript và gọi nó với context là phần tử textarea
          new Function('this', value).call(e.target, e.target);
        };
      } else {
        textareaDataProps[`data-${key}`] = value;
      }
    });
  }

  // Lấy giá trị hiện tại và trạng thái lỗi từ context
  const value = values[name] || '';
  const error = touched[name] ? errors[name] : null;

  return (
    <div className={wrapperClassName || ''}>
      {label && (
        <label 
          className={labelClassName || ''} 
          htmlFor={id || name}
        >
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <textarea
        id={id || name}
        name={name}
        placeholder={placeholder}
        value={value}
        rows={rows}
        cols={cols}
        onChange={onTextAreaChange}
        required={required}
        className={`${textareaClassName || ''} ${dataAttributes?.textareaDataAttributes?.className || ''} ${error ? 'error' : ''}`}
        {...textareaDataProps}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
