import CustomTable from "@components/Table";
import { Container } from "@components/Container";
import { formatThoiGianXuLy } from "@components/formatDate";

interface DonDaDangKyTableProps {
  data?: any[];
  loading?: boolean;
}

export default function DonDaDangKyTable({
  data = [],
  loading = false,
}: DonDaDangKyTableProps) {
  const columns = [
    { id: "stt", label: "STT", width: "5ch" },
    { id: "tenDon", label: "Tên đơn" },
    { id: "thoiGian", label: "Thời gian", width: "12ch" },
    { id: "donViThucHien", label: "Đơn vị phụ trách", width: "20ch" },
    { id: "trangThaiXuLy", label: "Trạng thái", width: "15ch" },
    { id: "ghiChu", label: "Ghi chú", width: "20ch" },
  ];

  // Không cần gọi API nữa vì data được truyền qua props

  // Format dữ liệu cho table
  console.log("Dữ liệu đơn đã đăng ký:", data);
  const formattedData = Array.isArray(data)
    ? data.map((item, index) => ({
        stt: index + 1,
        ...item,
        // Đảm bảo có đủ các trường cần thiết với giá trị mặc định
        tenDon: item.tenDon || "Chưa có tên đơn",
        thoiGian: formatThoiGianXuLy(
          item.thoiGian ||
            item.ngayTaoDonCT ||
            item.thoiGianDang ||
            new Date().toISOString().split("T")[0]
        ),
        donViThucHien: item.donViThucHien || item.donVi || "Phòng đào tạo",
        trangThai: item.trangThaiXuLy,
        ghiChu: item.ghiChu || "Không có ghi chú",
      }))
    : [];

  const getTableCellStyles = (columnId: string, row: any) => {
    if (columnId === "trangThai") {
      let color = "orange"; // Mặc định màu cam cho "Đang xử lý"
      if (row.trangThaiXuLy === "Đã duyệt") {
        color = "green";
      } else if (row.trangThaiXuLy === "Bị từ chối") {
        color = "red";
      } else if (row.trangThaiXuLy === "Đang xử lý") {
        color = "orange";
      }
      return {
        textAlign: "center",
        color: color,
        textTransform: "uppercase",
        fontWeight: "bold",
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
      };
    }
    if (columnId === "donViThucHien") {
      return { textAlign: "center", textTransform: "uppercase" };
    }
    if (columnId === "tenDon") {
      return { textAlign: "left" };
    }

    return { textAlign: "center" };
  };

  const getTableHeaderStyles = (columnId: string) => {
    // Kiểm tra trường hợp 'ghiChu' trước
    if (columnId === "ghiChu") {
      return {
        borderLeft: "2px solid white", // Chỉ áp dụng borderRight cho 'ghiChu'
        backgroundColor: "var(--color-blue)", // Màu nền cho 'ghiChu'
        color: "white", // Màu chữ cho 'ghiChu'
      };
    }
    // Kiểm tra các cột khác ngoài 'ghiChu'
    return {
      borderRight: "2px solid white",
      backgroundColor: "var(--color-blue)", // Màu nền chung cho các cột
      color: "white", // Màu chữ chung cho các cột
    };
  };

  // Hiển thị loading hoặc empty state
  if (loading) {
    return (
      <Container className="w-full md:max-w-[80%] mb-6 mx-6 mt-3 md:border-2 border-[var(--color-gray-stroke)]">
        <div className="p-4 text-center">
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </Container>
    );
  }

  if (formattedData.length === 0 && !loading) {
    return (
      <Container className="w-full md:max-w-[80%] mb-6 mx-6 mt-3 md:border-2 border-[var(--color-gray-stroke)]">
        <div className="p-4 text-center">
          <p className="text-gray-600">Không có dữ liệu đơn đăng ký</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="w-full md:max-w-[80%] mb-6 mx-6 mt-3 md:border-2 border-[var(--color-gray-stroke)]">
      <CustomTable
        columns={columns}
        data={formattedData}
        tableCellStyles={getTableCellStyles}
        tableHeaderStyles={getTableHeaderStyles}
      />
    </Container>
  );
}
