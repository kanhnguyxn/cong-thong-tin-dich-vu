import { ReactNode, createContext, useState, useContext, FormEvent } from "react";

// Định nghĩa kiểu dữ liệu cho context của form
interface FormContextType {
  values: Record<string, string>;      // Lưu trữ giá trị của tất cả các trường theo tên
  errors: Record<string, string | null>; // Lưu trữ lỗi xác thực theo tên trường
  touched: Record<string, boolean>;    // Theo dõi những trường đã được tương tác
  handleChange: (name: string, value: string) => void; // Cập nhật giá trị của trường
  validation: (name: string, validationRules: ((value: string) => string | null)[]) => void; // Đăng ký quy tắc xác thực
  setFieldTouched: (name: string, isTouched: boolean) => void; // Đánh dấu trường đã được chạm vào/chưa được chạm vào
  validateField: (name: string) => void; // Xác thực một trường cụ thể
}

// Tạo context form
const FormContext = createContext<FormContextType | undefined>(undefined);

// Hook tùy chỉnh để sử dụng context form trong các component con
export function useForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm phải được sử dụng trong một Form component"); // Lỗi nếu sử dụng ngoài Form
  }
  return context;
}

// Props cho component Form
interface FormProps {
  className?: string;                       // Lớp CSS cho phần tử form
  children: ReactNode;                      // Các component con (các trường form)
  onSubmit: (values: Record<string, string>) => void; // Xử lý gửi form
  initialValues?: Record<string, string>;   // Giá trị ban đầu của các trường
}

export function Form(props: FormProps) {
  const { children, onSubmit, className, initialValues = {} } = props;
  
  // Quản lý trạng thái form
  const [values, setValues] = useState<Record<string, string>>(initialValues); // Giá trị các trường
  const [errors, setErrors] = useState<Record<string, string | null>>({}); // Lỗi xác thực
  const [touched, setTouched] = useState<Record<string, boolean>>({}); // Trạng thái chạm của các trường
  const [validations, setValidations] = useState<Record<string, ((value: string) => string | null)[]>>({}); // Quy tắc xác thực
  
  // Đăng ký quy tắc xác thực cho một trường
  const registerValidation = (name: string, validationRules: ((value: string) => string | null)[]) => {
    if (!validations[name]) {
      setValidations(prev => ({
        ...prev,
        [name]: validationRules
      }));
    }
  };

  // Xử lý thay đổi giá trị trường
  const handleChange = (name: string, value: string) => {
    // Cập nhật giá trị trường
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Đánh dấu trường đã được chạm vào (tương tác)
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Xác thực trường với giá trị mới
    validateFieldValue(name, value);
  };
  
  // Đánh dấu một trường đã được chạm vào/chưa được chạm vào
  const setFieldTouched = (name: string, isTouched: boolean) => {
    setTouched(prev => ({
      ...prev,
      [name]: isTouched
    }));
    
    // Xác thực khi chạm vào nếu trường được đánh dấu là đã chạm vào
    if (isTouched) {
      validateField(name);
    }
  };
  
  // Xác thực giá trị cụ thể của một trường
  const validateFieldValue = (name: string, value: string) => {
    if (validations[name]) {
      let fieldError: string | null = null;
      
      // Kiểm tra tất cả quy tắc cho đến khi một quy tắc không thành công
      for (const rule of validations[name]) {
        const error = rule(value);
        if (error) {
          fieldError = error; // Lưu thông báo lỗi
          break; // Dừng tại quy tắc không thành công đầu tiên
        }
      }
      
      // Cập nhật trạng thái lỗi cho trường
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };
  
  // Xác thực một trường với giá trị hiện tại của nó
  const validateField = (name: string) => {
    const value = values[name] || '';
    validateFieldValue(name, value);
  };
  
  // Xác thực toàn bộ form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string | null> = {};
    let isValid = true;
    
    // Kiểm tra từng trường có đăng ký xác thực
    Object.entries(validations).forEach(([name, rules]) => {
      const value = values[name] || '';
      
      for (const rule of rules) {
        const error = rule(value);
        if (error) {
          newErrors[name] = error;
          isValid = false; // Form không hợp lệ nếu bất kỳ trường nào không vượt qua xác thực
          break;
        } else {
          newErrors[name] = null;
        }
      }
    });
    
    // Cập nhật tất cả lỗi trường
    setErrors(newErrors);
    return isValid;
  };

  // Xử lý gửi form
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn chặn hành vi gửi form mặc định
    
    // Đánh dấu tất cả các trường đã được chạm vào để hiển thị lỗi xác thực
    const allTouched: Record<string, boolean> = {};
    Object.keys(validations).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    // Gửi chỉ khi tất cả xác thực đều thành công
    if (validateForm()) {
      onSubmit(values); // Gọi xử lý gửi được cung cấp với giá trị form
    }
  };

  // Giá trị context form để cung cấp cho các thành phần con
  const formContextValue: FormContextType = {
    values,
    errors,
    touched,
    handleChange,
    validation: registerValidation,
    setFieldTouched,
    validateField
  };

  return (
    <FormContext.Provider value={formContextValue}>
      <form className={`form ${className || ''}`} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}