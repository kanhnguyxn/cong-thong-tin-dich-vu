// Các lớp CSS với trạng thái hover và lỗi - kiểu dáng tập trung
export const STYLES = {

    title: "text-[var(--color-orange)] text-lg md:text-xl lg:text-2xl font-bold mb-2", // Kiểu cho tiêu đề

    subtitle: "text-[var(--color-blue)] uppercase font-bold mb-4 text-sm md:text-lg lg:text-xl", // Kiểu cho phụ đề

    // kiểu cho hộp input
    wrapper: "flex flex-col w-full",

    // Updated style for label - positioned above input
    label: "text-black font-medium text-sm md:text-lg  mb-3 text-left",

    // Enhanced input styles - updated for vertical layout
    input: "w-full px-4 py-2 border  mb-4 outline-none transition-all duration-200 hover:outline hover:outline-2 hover:outline-blue-500 focus:outline focus:outline-2 focus:outline-blue-500 text-sm md:text-lg flex rounded-2xl", // Kiểu cơ bản cho input
  
    inputError: "outline outline-2 outline-red-500 border-red-500 focus:outline focus:outline-2 focus:outline-red-500", // Kiểu khi có lỗi

    inputFilled: "outline outline-2 outline-[var(--color-blue)]", // Kiểu khi input có nội dung

    // Kiểu placeholder khi có lỗi - thêm italic để nổi bật
    errorPlaceholder: "placeholder:text-red-500 placeholder:italic",

    footer:"grid grid-cols-3 w-full px-4 place-self-center",
   
    button: "text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full", // Kiểu cho nút
    button_cancel:'bg-[var(--color-light-blue)] col-start-1',
    button_confirm:'bg-[var(--color-blue)] col-start-3',
  
    // Kiểu cho liên kết - thêm hiệu ứng hover và underline
    linkClassName: "col-span-2 text-start place-content-center text-[var(--color-blue)] text-sm hover:text-[color:var(--color-blue-dark,#0056b3)] transition-colors duration-200 hover:underline",
    
    
    // Kiểu cho thông báo lỗi - cải thiện với icon và border radius
    errorStyle: "bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm border border-red-200 uppercase font-semibold",
    
    // Notification style
    notification: "my-4 text-sm md:text-lg flex flex-col items-center",
    noti_mess: "mb-2",
};

