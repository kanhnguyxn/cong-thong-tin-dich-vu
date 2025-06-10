import CustomTable from "@components/Table";
import { useAppSelector } from "@redux/hook";
import { Container } from "@components/Container";

interface DonDangKyTableProps {
  donDangKy: (maDon: string) => void;
}

export default function DonDangKyTable({ donDangKy }: DonDangKyTableProps) {
  const columns = [
    { id: "stt", label: "STT", width: "5ch" },
    { id: "tenDon", label: "Tên đơn" },
    { id: "donVi", label: "Đơn vị phụ trách", width: "20ch" },
    { id: "dangKy", label: "xem", width: "20ch" },
  ];
  //   / Lấy dữ liệu từ Redux
  const rawDonDangKy = useAppSelector((state) => state.donDangKy.donDangKyCB);

  const formattedData = rawDonDangKy.map((item: any, index: number) => ({
    stt: index + 1,
    tenDon: item.tenDon,
    donVi: item.tenPB || "chưa có thông tin",
    dangKy: (
      <button
        className="px-4 py-2 bg-[var(--color-blue)] text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => donDangKy(item.maDon)}
      >
        xem
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

  return (
    <Container className="w-full md:max-w-[90%] mb-6 mx-6 mt-3 md:border-2 border-[var(--color-gray-stroke)]">
      <CustomTable
        columns={columns}
        data={formattedData}
        tableCellStyles={getTableCellStyles}
        hasSelective
      />
    </Container>
  );
}
