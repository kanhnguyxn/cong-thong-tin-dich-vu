// Định nghĩa cấu trúc cho mỗi trường nhập liệu
export type FormField = {
    name: string;       // Định danh của trường
    label?: string;      // Nhãn của trường
    required?: boolean;  // Xác định trường có bắt buộc hay không
    type: string;       // Loại input (text, password, v.v.)
    placeholder?: string; // Văn bản gợi ý
    rest?: any;
  };
  