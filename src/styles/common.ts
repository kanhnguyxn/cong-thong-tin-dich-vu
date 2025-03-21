// Các lớp CSS chung với trạng thái hover và lỗi - kiểu dáng tập trung
export const COMMON_STYLES = {
  // Typography styles
  title: "text-[var(--color-orange)] text-lg md:text-xl lg:text-2xl font-bold mb-2", // Kiểu cho tiêu đề
  subtitle: "text-[var(--color-blue)] uppercase font-bold mb-4 text-sm md:text-lg lg:text-xl", // Kiểu cho phụ đề
  
  // Form layout styles
  wrapper: "flex flex-col w-full", // kiểu cho hộp input
  label: "text-black font-medium text-sm md:text-lg mb-3 text-left", // Updated style for label
  
  // Input styles
  input: "w-full px-4 py-2 border mb-4 outline-none transition-all duration-200 hover:outline hover:outline-2 hover:outline-blue-500 focus:outline focus:outline-2 focus:outline-blue-500 text-sm md:text-lg flex rounded-2xl", // Kiểu cơ bản cho input
  inputError: "outline outline-2 outline-red-500 border-red-500 focus:outline focus:outline-2 focus:outline-red-500", // Kiểu khi có lỗi
  inputFilled: "outline outline-2 outline-[var(--color-blue)]", // Kiểu khi input có nội dung
  errorPlaceholder: "placeholder:text-red-500 placeholder:italic", // Kiểu placeholder khi có lỗi
  iconClassName: "absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer", // Kiểu cho icon
  
  // Button styles
  button: "text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline", // Kiểu cho nút
  button_standard: "w-fit-content bg-[var(--color-blue)] mt-4", // Standard button style from Login
  button_cancel: "bg-[var(--color-light-blue)]", // Cancel button style
  button_confirm: "bg-[var(--color-blue)]", // Confirm button style
  
  // Layout elements
  footer: "grid grid-cols-3 w-full px-4 place-self-center",
  
  // Link styles
  linkClassName: "text-[var(--color-blue)] text-sm hover:text-[color:var(--color-blue-dark,#0056b3)] transition-colors duration-200 hover:underline", // Enhanced link style
  
  // Error and notification styles
  errorStyle: "bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm border border-red-200 uppercase font-semibold", // Kiểu cho thông báo lỗi
  notification: "my-4 text-sm md:text-lg flex flex-col items-center", // Notification container
  noti_mess: "mb-2", // Notification message
};
