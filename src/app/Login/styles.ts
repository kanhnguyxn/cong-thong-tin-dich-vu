import { COMMON_STYLES } from "@styles/common_styles";
// Các lớp CSS với trạng thái hover và lỗi - kiểu dáng tập trung
export const STYLES = {
  ...COMMON_STYLES,
  
  // Kiểu input với hiệu ứng hover và focus
  input: `${COMMON_STYLES.input} hover:outline hover:outline-2 hover:outline-blue-500 focus:outline focus:outline-2 focus:outline-blue-500`,
  
  // Kiểu icon
  iconClassName: "absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer",
  
  // Kiểu cho nút
  button: "w-fit-content bg-[var(--color-blue)] text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4",
  
  // Kiểu cho liên kết
  linkClassName: "text-[var(--color-blue)] text-sm",
};
