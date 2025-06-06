import styled from "styled-components";

export const COMMON_STYLES = {
    // Kiểu tiêu đề và phụ đề
    title: "text-[var(--color-orange)] text-lg md:text-xl lg:text-2xl font-bold mb-2",
    subtitle: "text-[var(--color-blue)] uppercase font-bold mb-4 text-sm md:text-lg lg:text-xl",
  
    // Kiểu input chung
    input: "w-full px-4 py-2 border mb-4 outline-none text-sx sm:text-sm md:text-base flex rounded-2xl",
    inputError: "outline outline-2 outline-red-500 border-red-500 border-white",
    inputFilled: " outline outline-2 outline-[var(--color-blue)] border-white",
    errorPlaceholder: "placeholder:text-red-500 placeholder: italic",
  
    // Kiểu cho thông báo lỗi
    errorStyle: "bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm border border-red-200 uppercase font-semibold",
    
    // Kiểu cho thông báo chung
    notification: "my-4 text-sm md:text-lg flex flex-col items-center",
    noti_mess: "mb-2",
  
    // Kiểu wrapper
    wrapper: "flex flex-col w-full",
    
    // Kiểu footer
    footer: "grid grid-cols-3 w-full px-4 place-self-center"
  };
