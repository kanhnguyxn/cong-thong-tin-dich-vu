import CustomTable from "@components/Table";
import { formatDate } from "@components/formatDate";
// import dữ liệu từ file DataQuyDinh.tsx

// thong tin các cột trong table
const columns = [
  { id: "sokyhieu", label: "Số ký hiệu", width: "16ch" },
  { id: "quydinh", label: "Tên quy định" },
  { id: "noibanhanh", label: "Nơi ban hành", width: "20ch" },
  { id: "ngaybanhanh", label: "Ngày ban hành", width: "12ch" },
  { id: "ngayhieuluc", label: "Ngày có hiệu lực", width: "12ch" },
  { id: "hieuluc", label: "Hiệu lực", width: "10ch" },
];

export default function QuyDinhTable({ data }) {
  const formattedData = data.map((row, index) => ({
    sokyhieu: row.maQD,
    quydinh: (
      <a
        href={row.lienKet}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--color-blue)] hover:underline"
      >
        {row.tenQD}
      </a>
    ),
    noibanhanh: row.noiBanHanh,
    // chuyeenr thanhf dang dd/mm/yyyy
    ngaybanhanh: formatDate(row.ngayBanHanh),
    ngayhieuluc: formatDate(row.ngayCoHieuLuc),
    hieuluc: row.hieuLuc ? "Có" : "Không",
  }));
  const tableCellStyles = (columnId, row) => {
    if (columnId === "quydinh" || columnId === "sokyhieu") {
      return { textAlign: "left" };
    }
    return { textAlign: "center" };
  };
  return (
    <CustomTable
      columns={columns}
      data={formattedData}
      tableCellStyles={tableCellStyles}
    />
  );
}
