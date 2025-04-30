import CustomTable from "@components/Table";
// import dữ liệu từ file DataQuyDinh.tsx

// thong tin các cột trong table
const columns = [
  { id: "sokyhieu", label: "Số ký hiệu", width: "16ch" },
  { id: "quydinh", label: "Tên quy định" },
  { id: "noibanhanh", label: "Nơi ban hành", width: "12ch" },
  { id: "ngaybanhanh", label: "Ngày ban hành", width: "12ch" },
  { id: "ngayhieuluc", label: "Ngày có hiệu lực", width: "12ch" },
  { id: "hieuluc", label: "Hiệu lực", width: "10ch" },
];

export default function QuyDinhTable({ data }) {
  const formattedData = data.map((row, index) => ({
    sokyhieu: row.sokyhieu,
    quydinh: (
      <a
        href={row.lienket}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--color-blue)] hover:underline"
      >
        {row.quydinh}
      </a>
    ),
    noibanhanh: row.noibanhanh,
    ngaybanhanh: row.ngaybanhanh,
    ngayhieuluc: row.ngayhieuluc,
    hieuluc: row.hieuluc,
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
