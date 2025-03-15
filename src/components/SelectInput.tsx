"use client";

import { ChangeEvent, useEffect } from 'react';
import { useForm } from './Container';

// Định nghĩa tùy chọn cho select
interface SelectOption {
  value: string;
  label: string;
}

// Định nghĩa props cho component SelectInput
interface SelectFieldProps {
  id?: string;                  // ID của select
  name: string;                 // Tên trường (bắt buộc để tương tác với Form)
  label?: string;               // Nhãn hiển thị
  required?: boolean;           // Đánh dấu trường bắt buộc
  wrapperClassName?: string;    // CSS class cho div bao quanh
  selectClassName?: string;     // CSS class cho select
  labelClassName?: string;      // CSS class cho label
  validation?: ((value: string) => string | null)[]; // Mảng các hàm kiểm tra
  options: SelectOption[];      // Mảng các tùy chọn
  placeholder?: string;         // Văn bản gợi ý cho tùy chọn đầu tiên
  dataAttributes?: {            // Thuộc tính dữ liệu bổ sung
    selectDataAttributes?: {
      className?: string;       // CSS class bổ sung
      onChange?: string;        // JavaScript sẽ chạy khi giá trị thay đổi
    };
  };
}

export function SelectInput(props: SelectFieldProps) {
  const {
    id,
    name,
    label,
    required,
    wrapperClassName,
    selectClassName,
    labelClassName,
    validation = [],
    options,
    placeholder,
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

  // Xử lý sự kiện khi giá trị select thay đổi
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    handleChange(name, e.target.value);
  };

  // Chuẩn bị các thuộc tính dữ liệu cho select
  const selectDataProps: Record<string, any> = {};
  if (dataAttributes?.selectDataAttributes) {
    Object.entries(dataAttributes.selectDataAttributes).forEach(([key, value]) => {
      if (key === 'className') {
        // className được xử lý riêng trong thuộc tính className
      } else if (key === 'onChange') {
        selectDataProps['onChange'] = (e: any) => {
          onSelectChange(e);
          // Tạo một hàm từ chuỗi JavaScript và gọi nó với context là phần tử select
          new Function('this', value).call(e.target, e.target);
        };
      } else {
        selectDataProps[`data-${key}`] = value;
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
      <select
        id={id || name}
        name={name}
        value={value}
        onChange={dataAttributes?.selectDataAttributes?.onChange ? undefined : onSelectChange}
        required={required}
        className={`${selectClassName || ''} ${dataAttributes?.selectDataAttributes?.className || ''} ${error ? 'error' : ''}`}
        {...selectDataProps}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
