// vs radio, checkbox, input

export const dataDonDangKy = [
  {
    maDon: "DK001",
    tenDDK: "Đăng ký bảng điểm học tập",
    thongtinChitiet: [
      // kiểu checkbox
      {
        name: "field1",
        type: "checkbox-group",
        label: "Học kỳ:",
        selectOptions: ["Học kỳ 1", "Học kỳ 2", "Toàn khóa"],
        required: true,
      },
      // kiểu input
      {
        name: "field2",
        type: "text",
        label: "Năm học:",
        placeholder: "Ví dụ: 2024-2024",
        required: true,
      },
      // checkbox
      {
        name: "field3",
        type: "checkbox-group",
        label: "Ngôn ngữ:",
        selectOptions: ["Tiếng Việt", "Tiếng Anh"],
        required: true,
      },
    ],
  },
  {
    maDon: "DK002",
    tenDDK: "Đăng ký giấy xác nhận sinh viên",
    thongtinChitiet: [
      // kiểu radio
      {
        name: "field1",
        type: "radio",
        label: [
          "Thuộc diện",
          "(Muốn được xác nhận là đối tượng Miễn/Giảm học phí thì SV phải thuộc danh sách được Nhà trường Miễn/Giảm học phí.)",
        ],
        selectOptions: ["Không miễn, giảm", "Giảm học phí", "Miễn học phí"],
      },
      // kiểu input
      {
        name: "field2",
        type: "radio",
        label: [
          "Thuộc đối tượng",
          " Muốn được xác nhận là đối tượng Mồ côi thì SV phải nộp minh chứng mồ côi về Phòng CTSV. (Minh chứng mồ côi có thể là Giấy chứng tử, Giấy khai sinh không có tên phụ huynh, hoặc Giấy xác nhận có đóng dấu của địa phương...)",
        ],
        selectOptions: ["Mồ côi", "Không mồ coi"],
      },
      {
        name: "field3",
        type: "radio",
        label: [
          "Muc dich xin cap",
          "Nếu ngoài các mục đích dưới đây, SV phải đến trực tiếp tại Phòng Công tác sinh viên để đăng ký.",
        ],
        selectOptions: [
          "Giảm lệ phí thi Tin học/Ngoại ngữ",
          "Xin tạm hoãn nghĩa vụ quân sự tại địa phương",
          "Mẫu 01/TDSV - Làm hồ sơ vay vốn",
          "Mẫu 41 - Làm hồ sơ hưởng ưu đãi cho người có công cách mạng",
          "Giảm trừ thuế thu nhập cá nhân cho phụ huynh; Ứng tuyển học bổng của Hội khuyến học, học bổng bậc Sau Đại học; Đăng ký ở Ký túc xá hoặc tạm trú tại địa phương; Xin việc làm thêm.",
          "Hoàn thiện hồ sơ đăng ký Hiệp hội Kế toán Công chứng Anh quốc (ACCA)",
          "Nộp cho cơ quan quản lý (Đối với Sinh viên hệ Vừa làm Vừa học)",
        ],
      },
    ],
  },
];
