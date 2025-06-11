// Mock data cho đơn đăng ký
export const mockDonDangKy = [
  {
    maDon: "DK001",
    tenDDK: "Đăng ký bảng điểm học tập",
    thongtinChitiet: [
      {
        name: "field1",
        type: "checkbox-group",
        label: "Học kỳ:",
        description: "Mô tả: Chọn học kỳ bạn muốn đăng ký bảng điểm",
        selectOptions: ["Học kỳ 1", "Học kỳ 2", "Toàn khóa"],
        required: true,
      },
      {
        name: "field2",
        type: "text",
        label: "Năm học:",
        placeholder: "Ví dụ: 2024-2025",
        required: true,
      },
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
      {
        name: "field1",
        type: "radio",
        label: [
          "Thuộc diện",
          "(Muốn được xác nhận là đối tượng Miễn/Giảm học phí thì SV phải thuộc danh sách được Nhà trường Miễn/Giảm học phí.)",
        ],
        selectOptions: ["Không miễn, giảm", "Giảm học phí", "Miễn học phí"],
      },
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
          "Mục đích xin cấp",
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

// Mock data cho chi tiết đơn đăng ký với thông tin đã điền
export const mockDonDangKyChiTiet = [
  {
    maDonCT: "2051000",
    maDon: "DK001",
    mssv: "2051001",
    tenDon: "Đăng ký bảng điểm học tập",
    trangThai: "Đang xử lý",
    thongtinChitiet: [
      {
        field1: ["Học kỳ 1"],
        field2: "2024-2025",
        field3: ["Tiếng Việt"],
      },
    ],
  },
  {
    maDonCT: "2051002",
    maDon: "DK001",
    mssv: "2051002",
    tenDon: "Đăng ký bảng điểm học tập",
    trangThai: "Đã duyệt",
    thongtinChitiet: [
      {
        field1: ["Học kỳ 2"],
        field2: "2024-2025",
        field3: ["Tiếng Anh"],
      },
    ],
  },
  {
    maDonCT: "2051004",
    maDon: "DK001",
    mssv: "2051004",
    tenDon: "Đăng ký bảng điểm học tập",
    trangThai: "Đang xử lý",
    thongtinChitiet: [
      {
        field1: ["Toàn khóa"],
        field2: "2024-2025",
        field3: ["Tiếng Việt"],
      },
    ],
  },
  {
    maDonCT: "2051006",
    maDon: "DK001",
    mssv: "2051006",
    tenDon: "Đăng ký bảng điểm học tập",
    trangThai: "Đang xử lý",
    thongtinChitiet: [
      {
        field1: ["Học kỳ 1", "Học kỳ 2"],
        field2: "2024-2025",
        field3: ["Tiếng Việt", "Tiếng Anh"],
      },
    ],
  },
  {
    maDonCT: "2051009",
    maDon: "DK001",
    mssv: "2051009",
    tenDon: "Đăng ký bảng điểm học tập",
    trangThai: "Đang xử lý",
    thongtinChitiet: [
      {
        field1: ["Học kỳ 1"],
        field2: "2024-2025",
        field3: ["Tiếng Việt"],
      },
    ],
  },
  {
    maDonCT: "2051010",
    maDon: "DK002",
    mssv: "2051010",
    tenDon: "Đăng ký giấy xác nhận sinh viên",
    trangThai: "Đã duyệt",
    thongtinChitiet: [
      {
        field1: "Không miễn, giảm",
        field2: "Mồ côi",
        field3: "Giảm lệ phí thi Tin học/Ngoại ngữ",
      },
    ],
  },
];
