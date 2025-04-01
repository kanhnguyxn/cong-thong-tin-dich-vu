"use client";

import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from './input/FormInput';

// Định nghĩa props cho component FileInput
interface FileFieldProps {
  id?: string;                  // ID của input file
  name: string;                 // Tên trường (bắt buộc để tương tác với Form)
  label?: string;               // Nhãn hiển thị
  required?: boolean;           // Đánh dấu trường bắt buộc
  wrapperClassName?: string;    // CSS class cho div bao quanh
  fileClassName?: string;       // CSS class cho input file
  labelClassName?: string;      // CSS class cho label
  validation?: ((value: FileList | null) => string | null)[]; // Mảng các hàm kiểm tra
  accept?: string;              // Các loại file được chấp nhận
  multiple?: boolean;           // Cho phép chọn nhiều file
  showFileList?: boolean;       // Hiển thị danh sách file đã chọn
  fileListClassName?: string;   // CSS class cho danh sách file
  dataAttributes?: {            // Thuộc tính dữ liệu bổ sung
    fileDataAttributes?: {
      className?: string;       // CSS class bổ sung
      onChange?: string;        // JavaScript sẽ chạy khi giá trị thay đổi
    };
  };
}

export function FileInput(props: FileFieldProps) {
  const {
    id,
    name,
    label,
    required,
    wrapperClassName,
    fileClassName,
    labelClassName,
    validation = [],
    accept,
    multiple,
    showFileList = true,
    fileListClassName,
    dataAttributes
  } = props;

  // State riêng để quản lý file vì Form context không thể lưu trực tiếp FileList
  const [fileList, setFileList] = useState<FileList | null>(null);
  
  // Sử dụng context của Form
  const { errors, touched, handleChange, registerValidation } = useForm();
  
  // Đăng ký các quy tắc kiểm tra khi component được tạo
  useEffect(() => {
    if (validation.length > 0) {
      registerValidation(name, validation as any);
    }
  }, [name, registerValidation, validation]);

  // Xử lý sự kiện khi giá trị file thay đổi
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFileList(files);
    
    // Kiểm tra validation cho files
    if (validation && files) {
      for (const rule of validation) {
        const error = rule(files);
        if (error) {
          // Validation failed
          break;
        }
      }
    }
    
    // Gửi FileList lên Form context
    handleChange(name, files as any);
  };

  // Chuẩn bị các thuộc tính dữ liệu cho input file
  const fileDataProps: Record<string, any> = {};
  if (dataAttributes?.fileDataAttributes) {
    Object.entries(dataAttributes.fileDataAttributes).forEach(([key, value]) => {
      if (key === 'className') {
        // className được xử lý riêng trong thuộc tính className
      } else if (key === 'onChange') {
        fileDataProps['onChange'] = (e: any) => {
          onFileChange(e);
          // Tạo một hàm từ chuỗi JavaScript và gọi nó với context là phần tử input file
          new Function('this', value).call(e.target, e.target);
        };
      } else {
        fileDataProps[`data-${key}`] = value;
      }
    });
  }

  // Lấy trạng thái lỗi từ context
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
      <input
        id={id || name}
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        onChange={dataAttributes?.fileDataAttributes?.onChange ? undefined : onFileChange}
        required={required}
        className={`${fileClassName || ''} ${dataAttributes?.fileDataAttributes?.className || ''} ${error ? 'error' : ''}`}
        {...fileDataProps}
      />
      
      {/* Hiển thị danh sách file đã chọn nếu có */}
      {showFileList && fileList && fileList.length > 0 && (
        <div className={`file-list ${fileListClassName || ''}`}>
          {Array.from(fileList).map((file, index) => (
            <div key={index} className="file-item">
              {file.name} ({Math.round(file.size / 1024)} KB)
            </div>
          ))}
        </div>
      )}
      
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
