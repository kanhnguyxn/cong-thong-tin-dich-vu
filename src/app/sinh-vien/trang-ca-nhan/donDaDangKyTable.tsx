import CustomTable from "@components/Table";
import { dataDonDangKyCT } from "@services/dataDonDangKyCT";
import { Container } from "@components/Container";

export default function DonDaDangKyTable({ madon }: { madon: string }) {
  const columns = [
    { id: "stt", label: "STT", width: "5ch" },
    { id: "tenDon", label: "Tên đơn" },
    { id: "thoiGian", label: "Thời gian", width: "12ch" },
    { id: "donViThucHien", label: "Đơn vị thực hiện", width: "20ch" },
    { id: "trangThai", label: "Trạng thái", width: "15ch" },
    { id: "ghiChu", label: "Ghi chú", width: "20ch" },
  ];
  //   neu dataDonDangKyCT khong co se hien trong
  const formattedData = Array.isArray(dataDonDangKyCT)
    ? dataDonDangKyCT.map((item, index) => ({ stt: index + 1, ...item }))
    : [];
  const getTableCellStyles = (columnId: string, row: any) => {
    if (columnId === "trangThai") {
      return {
        textAlign: "center",
        color: row.trangThai === "Đã xử lý" ? "green" : "red",
        textTransform: "uppercase",
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
  //   hien data theo madon
  const filteredData =
    madon && madon !== "all"
      ? formattedData.filter((item) => item.maDon === madon)
      : formattedData;

  return filteredData.length === 0 ? (
    <></>
  ) : (
    <Container className="w-full md:max-w-[80%] mb-6 mx-6 mt-3 md:border-2 border-[var(--color-gray-stroke)]">
      <CustomTable
        columns={columns}
        data={filteredData}
        tableCellStyles={getTableCellStyles}
        tableHeaderStyles={getTableHeaderStyles}
      />
    </Container>
  );
}
