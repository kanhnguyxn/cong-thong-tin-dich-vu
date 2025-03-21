// Các lớp CSS với trạng thái hover và lỗi - kiểu dáng tập trung
export const STYLES = {
  title: "text-[var(--color-orange)] text-lg md:text-xl lg:text-2xl font-bold mb-2", // Kiểu cho tiêu đề

  subtitle: "text-[var(--color-blue)] uppercase font-bold mb-4 text-sm md:text-lg lg:text-xl", // Kiểu cho phụ đề

  input: "w-full px-4 py-2 border  mb-4 outline-none transition-all duration-200 hover:outline hover:outline-2 hover:outline-blue-500 focus:outline focus:outline-2 focus:outline-blue-500 text-sm md:text-lg flex rounded-2xl", // Kiểu cơ bản cho input

  inputError: "outline outline-2 outline-red-500 border-red-500", // Kiểu khi có lỗi

  inputFilled: "outline outline-2 outline-[var(--color-blue)]", // Kiểu khi input có nội dung

  iconClassName: "absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer ", // Kiểu cho icon

  button: "w-fit-content bg-[var(--color-blue)] text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4", // Kiểu cho nút

  linkClassName: "text-[var(--color-blue)] text-sm", // Kiểu cho liên kết

  errorPlaceholder: "placeholder:text-red-500", // Kiểu placeholder khi có lỗi
  // Thêm style cho thông báo lỗi
  
  errorStyle: "bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm border border-red-200 uppercase font-semibold",
};
