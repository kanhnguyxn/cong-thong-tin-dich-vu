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
      },
      // kiểu input
      {
        name: "feild2",
        type: "text",
        label: "Năm học:",
        placeholder: "Ví dụ: 2024-2024",
      },
      // checkbox
      {
        name: "field3",
        type: "checkbox-group",
        label: "Ngôn ngữ:",
        selectOptions: ["Tiếng Việt", "Tiếng Anh"],
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
        name: "feild2",
        type: "radio",
        label: [
          "Thuộc đối tượng",
          " Muốn được xác nhận là đối tượng Mồ côi thì SV phải nộp minh chứng mồ côi về Phòng CTSV. (Minh chứng mồ côi có thể là Giấy chứng tử, Giấy khai sinh không có tên phụ huynh, hoặc Giấy xác nhận có đóng dấu của địa phương...)",
        ],
        selectOptions: ["Mồ côi", "Không mồ coi"],
      },
    ],
  },
];
