"use client";

import { ChangeEvent, useEffect } from 'react';
import { useForm } from './Form';

// Định nghĩa tùy chọn cho radio
interface RadioOption {
  value: string;
  label: string;
}

// Định nghĩa props cho component RadioInput
interface RadioFieldProps {
  id?: string;                  // ID gốc của nhóm radio
  name: string;                 // Tên trường (bắt buộc để tương tác với Form)
  label?: string;               // Nhãn hiển thị cho nhóm radio
  required?: boolean;           // Đánh dấu trường bắt buộc
  wrapperClassName?: string;    // CSS class cho div bao quanh
  radioClassName?: string;      // CSS class cho input radio
  labelClassName?: string;      // CSS class cho label nhóm
  radioLabelClassName?: string; // CSS class cho label của từng radio
  groupClassName?: string;      // CSS class cho div chứa các radio
  validation?: ((value: string) => string | null)[]; // Mảng các hàm kiểm tra
  options: RadioOption[];       // Mảng các tùy chọn
  dataAttributes?: {            // Thuộc tính dữ liệu bổ sung
    radioDataAttributes?: {
      className?: string;       // CSS class bổ sung
      onChange?: string;        // JavaScript sẽ chạy khi giá trị thay đổi
    };
  };
}

export function RadioInput(props: RadioFieldProps) {
  const {
    id,
    name,
    label,
    required,
    wrapperClassName,
    radioClassName,
    labelClassName,
    radioLabelClassName,
    groupClassName,
    validation = [],
    options,
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

  // Xử lý sự kiện khi giá trị radio thay đổi
  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(name, e.target.value);
  };

  // Lấy giá trị hiện tại và trạng thái lỗi từ context
  const value = values[name] || '';
  const error = touched[name] ? errors[name] : null;

  return (
    <div className={wrapperClassName || ''}>
      {label && (
        <div className={labelClassName || ''}>
          {label}
          {required && <span className="required">*</span>}
        </div>
      )}
      <div className={groupClassName || 'radio-group'}>
        {options.map((option) => {
          // Chuẩn bị các thuộc tính dữ liệu cho từng radio
          const radioDataProps: Record<string, any> = {};
          if (dataAttributes?.radioDataAttributes) {
            Object.entries(dataAttributes.radioDataAttributes).forEach(([key, value]) => {
              if (key === 'className') {
                // className được xử lý riêng trong thuộc tính className
              } else if (key === 'onChange') {
                radioDataProps['onChange'] = (e: any) => {
                  onRadioChange(e);
                  // Tạo một hàm từ chuỗi JavaScript và gọi nó với context là phần tử radio
                  new Function('this', value).call(e.target, e.target);
                };
              } else {
                radioDataProps[`data-${key}`] = value;
              }
            });
          }

          return (
            <label 
              key={option.value} 
              className={radioLabelClassName || 'radio-label'}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={dataAttributes?.radioDataAttributes?.onChange ? undefined : onRadioChange}
                required={required}
                className={`${radioClassName || ''} ${dataAttributes?.radioDataAttributes?.className || ''} ${error ? 'error' : ''}`}
                {...radioDataProps}
              />
              {option.label}
            </label>
          );
        })}
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
