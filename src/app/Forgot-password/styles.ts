import { COMMON_STYLES } from "@styles/common_styles";
// Các lớp CSS với trạng thái hover và lỗi - kiểu dáng tập trung
export const STYLES = {

  ...COMMON_STYLES,
  
  // Kiểu input với hiệu ứng hover và focus
  input: `${COMMON_STYLES.input} hover:outline hover:outline-2 hover:outline-blue-500 focus:outline focus:outline-2 focus:outline-blue-500`,
  
  // Kiểu cho label
  label: "text-black font-medium text-sm md:text-lg mb-3 text-left",
  
  // Kiểu cho nút
  button: "text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full",
  button_cancel: "bg-[var(--color-light-blue)] col-start-1",
  button_confirm: "bg-[var(--color-blue)] col-start-3",

  // Kiểu cho liên kết
  linkClassName: "col-span-2 text-start place-content-center text-[var(--color-blue)] text-sm hover:text-[color:var(--color-blue-dark,#0056b3)] transition-colors duration-200 hover:underline",
};
