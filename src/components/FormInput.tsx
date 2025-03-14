import { ReactNode, createContext, useState, useContext, FormEvent } from "react";

// Định nghĩa kiểu dữ liệu cho context của form
// FormContextType chứa tất cả các trạng thái và phương thức cần thiết cho form
interface FormContextType {
  values: Record<string, string>;      // Lưu trữ giá trị của tất cả các trường
  errors: Record<string, string | null>; // Lưu trữ lỗi của từng trường
  touched: Record<string, boolean>;    // Đánh dấu trường đã được tương tác hay chưa
  handleChange: (name: string, value: string) => void; // Xử lý khi giá trị trường thay đổi
  registerValidation: (name: string, validationRules: ((value: string) => string | null)[]) => void; // kiểm tra tính hợp lệ của trường
}

// Tạo context cho form để chia sẻ dữ liệu giữa Form và các trường con
const FormContext = createContext<FormContextType | undefined>(undefined);

// Custom hook để sử dụng context của form trong các component con
export function useForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm phải được sử dụng trong một Form component");
  }
  return context;
}

// Props cho component Form
interface FormProps {
  className?: string;                       // Class CSS cho form
  children: ReactNode;                      // Các component con bên trong form
  onSubmit: (values: Record<string, string>) => void; // Hàm xử lý khi submit form
  initialValues?: Record<string, string>;   // Giá trị ban đầu cho các trường
}

export function Form(props: FormProps) {
  const { children, onSubmit, className, initialValues = {} } = props;
  
  // Thiết lập trạng thái cho form
  const [values, setValues] = useState<Record<string, string>>(initialValues); // Giá trị các trường
  const [errors, setErrors] = useState<Record<string, string | null>>({}); // Lỗi của các trường
  const [touched, setTouched] = useState<Record<string, boolean>>({}); // Trạng thái đã tương tác
  const [validations, setValidations] = useState<Record<string, ((value: string) => string | null)[]>>({}); // Các quy tắc kiểm tra
  
  // Đăng ký các quy tắc kiểm tra cho một trường
  const registerValidation = (name: string, validationRules: ((value: string) => string | null)[]) => {
    if (!validations[name]) {
      setValidations(prev => ({
        ...prev,
        [name]: validationRules
      }));
    }
  };

  // Xử lý khi giá trị của trường thay đổi
  const handleChange = (name: string, value: string) => {
    // Cập nhật giá trị
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Đánh dấu trường đã được tương tác
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Kiểm tra tính hợp lệ của trường
    if (validations[name]) {
      let fieldError: string | null = null;
      
      // Kiểm tra qua từng quy tắc cho đến khi gặp lỗi
      for (const rule of validations[name]) {
        const error = rule(value);
        if (error) {
          fieldError = error;
          break;
        }
      }
      
      // Cập nhật trạng thái lỗi
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };
  
  // Kiểm tra tính hợp lệ của toàn bộ form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string | null> = {};
    let isValid = true;
    
    // Kiểm tra từng trường có đăng ký validation
    Object.entries(validations).forEach(([name, rules]) => {
      const value = values[name] || '';
      
      for (const rule of rules) {
        const error = rule(value);
        if (error) {
          newErrors[name] = error;
          isValid = false;
          break;
        } else {
          newErrors[name] = null;
        }
      }
    });
    
    // Cập nhật trạng thái lỗi và trả về kết quả
    setErrors(newErrors);
    return isValid;
  };

  // Xử lý khi submit form
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    
    // Đánh dấu tất cả các trường đã được tương tác
    const allTouched: Record<string, boolean> = {};
    Object.keys(validations).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    // Kiểm tra tính hợp lệ trước khi submit
    if (validateForm()) {
      onSubmit(values); // Gọi hàm xử lý submit với giá trị của form
    }
  };

  // Giá trị cho context
  const formContextValue: FormContextType = {
    values,
    errors,
    touched,
    handleChange,
    registerValidation
  };

  return (
    <FormContext.Provider value={formContextValue}>
      <form className={`form ${className || ''}`} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}