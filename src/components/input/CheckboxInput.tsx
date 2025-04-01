"use client";

import { ChangeEvent, useEffect } from 'react';
import { useForm } from './FormInput';

// Định nghĩa props cho component CheckboxInput
interface CheckboxFieldProps {
  id?: string;                  // ID của checkbox
  name: string;                 // Tên trường (bắt buộc để tương tác với Form)
  label?: string;               // Nhãn hiển thị
  required?: boolean;           // Đánh dấu trường bắt buộc
  wrapperClassName?: string;    // CSS class cho div bao quanh
  checkboxClassName?: string;   // CSS class cho checkbox
  labelClassName?: string;      // CSS class cho label
  validation?: ((value: string) => string | null)[]; // Mảng các hàm kiểm tra
  dataAttributes?: {            // Thuộc tính dữ liệu bổ sung
    checkboxDataAttributes?: {
      className?: string;       // CSS class bổ sung
      onChange?: string;        // JavaScript sẽ chạy khi giá trị thay đổi
    };
  };
}

export function CheckboxInput(props: CheckboxFieldProps) {
  const {
    id,
    name,
    label,
    required,
    wrapperClassName,
    checkboxClassName,
    labelClassName,
    validation = [],
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

  // Xử lý sự kiện khi giá trị checkbox thay đổi
  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(name, e.target.checked.toString());
  };

  // Chuẩn bị các thuộc tính dữ liệu cho checkbox
  const checkboxDataProps: Record<string, any> = {};
  if (dataAttributes?.checkboxDataAttributes) {
    Object.entries(dataAttributes.checkboxDataAttributes).forEach(([key, value]) => {
      if (key === 'className') {
        // className được xử lý riêng trong thuộc tính className
      } else if (key === 'onChange') {
        checkboxDataProps['onChange'] = (e: any) => {
          onCheckboxChange(e);
          // Tạo một hàm từ chuỗi JavaScript và gọi nó với context là phần tử checkbox
          new Function('this', value).call(e.target, e.target);
        };
      } else {
        checkboxDataProps[`data-${key}`] = value;
      }
    });
  }

  // Lấy giá trị hiện tại và trạng thái lỗi từ context
  const value = typeof values[name] === 'string' ? values[name] === 'true' : values[name] === true;
  const error = touched[name] ? errors[name] : null;

  return (
    <div className={wrapperClassName || ''}>
      <label 
        className={labelClassName || ''} 
        htmlFor={id || name}
      >
        <input
          id={id || name}
          type="checkbox"
          name={name}
          checked={value}
          onChange={dataAttributes?.checkboxDataAttributes?.onChange ? undefined : onCheckboxChange}
          required={required}
          className={`${checkboxClassName || ''} ${dataAttributes?.checkboxDataAttributes?.className || ''} ${error ? 'error' : ''}`}
          {...checkboxDataProps}
        />
        {label}
        {required && <span className="required">*</span>}
      </label>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
