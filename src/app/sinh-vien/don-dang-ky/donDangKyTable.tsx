"use client";
import CustomTable from "@components/Table";
import { useAppSelector } from "@redux/hook";
import { Container } from "@components/Container";

interface DonDangKyTableProps {
  onDangKy: (maDon: string) => void;
}

export default function DonDangKyTable({ onDangKy }: DonDangKyTableProps) {
  const columns = [
    { id: "stt", label: "STT", width: "5ch" },
    { id: "tenDon", label: "Tên đơn" },
    { id: "donVi", label: "Đơn vị phụ trách", width: "20ch" },
    { id: "dangKy", label: "Đăng ký", width: "20ch" },
  ];

  // Lấy dữ liệu từ Redux
  const rawDonDangKy = useAppSelector((state) => state.donDangKy.donDangKySV);

  const formattedData = rawDonDangKy.map((item: any, index: number) => ({
    stt: index + 1,
    tenDon: item.tenDon,
    donVi: item.donVi || "Phòng đào tạo",
    dangKy: (
      <button
        className="px-4 py-2 bg-[var(--color-blue)] text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => onDangKy(item.maDon)}
      >
        Đăng ký
      </button>
    ),
    maDon: item.maDon,
  }));

  const getTableCellStyles = (columnId: string, row: any) => {
    if (columnId === "tenDon") {
      return { textAlign: "left" };
    }
    if (columnId === "dangKy") {
      return { textAlign: "center" };
    }
    return { textAlign: "center" };
  };

  const getTableHeaderStyles = (columnId: string) => {
    return {
      borderRight: columnId !== "dangKy" ? "2px solid white" : undefined,
      backgroundColor: "var(--color-blue)",
      color: "white",
    };
  };

  return (
    <Container className="w-full md:max-w-[90%] mb-6 mx-6 mt-3 md:border-2 border-[var(--color-gray-stroke)]">
      <CustomTable
        columns={columns}
        data={formattedData}
        tableCellStyles={getTableCellStyles}
        tableHeaderStyles={getTableHeaderStyles}
      />
    </Container>
  );
}
