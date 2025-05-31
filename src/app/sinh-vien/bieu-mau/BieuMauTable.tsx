"use client";

import CustomTable from "@components/Table";
import { useEffect, useState } from "react";

// import dữ liệu từ file Data-bieu-mau.tsx

// thong tin các cột trong table
const columns = [
  { id: "stt", label: "STT", width: "5ch" },
  { id: "bieumau", label: "Tên Biểu mẫu" },
  { id: "donVi", label: "Đơn vị thực hiện", width: "18ch" },
  { id: "taixuong", label: "Tải xuống", width: "10ch" },
];

const BieuMauTable = ({ data }) => {
  // Format data to match the expected structure for CustomTable
  // console.log("data", data);
  const [bieuMau, setBieuMau] = useState(data);
  useEffect(() => {
    setBieuMau(data);
  }, [setBieuMau, data]);
  const formattedData = bieuMau.map((row, index) => {
    const fileIdMatch = row.lienKet.match(/\/d\/(.*?)\//);
    const docxDownloadLink = fileIdMatch
      ? `https://docs.google.com/document/d/${fileIdMatch[1]}/export?format=docx`
      : row.lienKet;

    return {
      stt: index + 1,
      bieumau: (
        <a href={row.lienKet} target="_blank" rel="noopener noreferrer">
          <span>{row.tenBM}</span>
        </a>
      ),
      donVi: row.tenPB,
      taixuong: (
        <a href={docxDownloadLink} rel="noopener noreferrer">
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
    };
  });

  // Set the style to center align specific columns
  const tableCellStyles = (columnId, row) => {
    if (columnId === "bieumau") {
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
};

export default BieuMauTable;
