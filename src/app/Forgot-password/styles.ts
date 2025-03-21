import { COMMON_STYLES } from '../../styles/common';

// Các lớp CSS với trạng thái hover và lỗi - kiểu dáng tập trung
export const STYLES = {
  ...COMMON_STYLES,
  
  // Override or specific styles for Forgot-password
  linkClassName: "col-span-2 text-start place-content-center text-[var(--color-blue)] text-sm hover:text-[color:var(--color-blue-dark,#0056b3)] transition-colors duration-200 hover:underline",
  button_cancel: 'bg-[var(--color-light-blue)] col-start-1',
  button_confirm: 'bg-[var(--color-blue)] col-start-3',
  button: "text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full",
};

