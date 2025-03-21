import { COMMON_STYLES } from '../../styles/common';

// Các lớp CSS với trạng thái hover và lỗi - kiểu dáng tập trung
export const STYLES = {
  ...COMMON_STYLES,
  
  // Override or specific styles for Login
  errorPlaceholder: "placeholder:text-red-500", // Simpler error placeholder without italic
  button: "w-fit-content bg-[var(--color-blue)] text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4",
  linkClassName: "text-[var(--color-blue)] text-sm", // Simpler link style without hover effects
};
