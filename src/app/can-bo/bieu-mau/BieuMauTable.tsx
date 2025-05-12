"use client";

import CustomTable from "@components/Table";

// thong tin cac cot trong bieumau table
const columns = [
  { id: "bieuMau", label: "Tên biểu mẫu" },
  { id: "donVi", label: "Đơn vị thực hiện", width: "18ch" },
  { id: "taiXuong", label: "Tải xuống", width: "10ch" },
];

export const BieuMauTable = ({ data }) => {
  const formattedData = data.map((row, index) => ({
    stt: index + 1,
    bieuMau: row.tenBM,
    donVi: row.tenPB,
    taiXuong: (
      <a href={row.lienKet} download>
        <button className="color-black">
          <img
            src="/assets/icons/download.svg"
            alt="Tải xuống"
            width={25}
            height={25}
          />
        </button>
      </a>
    ),
  }));
  const tableCellStyles = (columnId, row) => {
    if (columnId === "bieuMau") {
      return { textAlign: "left" };
    }
    return { textAlign: "center" };
  };
  const handleChange = (data) => {
    console.log("data", data);
  };
  return (
    <CustomTable
      columns={columns}
      data={formattedData}
      tableCellStyles={tableCellStyles}
      hasSelective={true}
      handeleChange={handleChange}
    />
  );
};
