// "use client";

import { useAppDispatch } from "@redux/hook";
import { useMemo } from "react";

import { addSelectedBieuMau } from "@redux/features/bieuMauSlice";

import CustomTable from "@components/Table";
// import { useEffect, useState } from "react";

// thong tin cac cot trong bieumau table
const columns = [
  { id: "tenBM", label: "Tên biểu mẫu" },
  { id: "donVi", label: "Đơn vị thực hiện", width: "18ch" },
  { id: "taiXuong", label: "Tải xuống", width: "10ch" },
];

export const BieuMauTable = ({ data }) => {
  const formattedData = useMemo(() => {
    const rowData = data.map((row, index) => {
      const fileIdMatch = row.lienKet.match(/\/d\/(.*?)\//);
      const docxDownloadLink = fileIdMatch
        ? `https://docs.google.com/document/d/${fileIdMatch[1]}/export?format=docx`
        : row.lienKet;

      return {
        stt: index + 1,
        tenBM: (
          <a href={row.lienKet} target="_blank" rel="noopener noreferrer">
            <span>{row.tenBM}</span>
          </a>
        ),
        donVi: row.tenPB,
        taiXuong: (
          <a href={docxDownloadLink} download>
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

    return rowData;
  }, [data]);

  const dispatch = useAppDispatch();

  const tableCellStyles = (columnId, row) => {
    if (columnId === "tenBM") {
      return { textAlign: "left" };
    }
    return { textAlign: "center" };
  };

  const handleSelected = (data: any[]) => {
    const _data: any[] = data.map((item) => {
      return item.maBM;
    });

    dispatch(addSelectedBieuMau(_data));
  };

  return (
    <CustomTable
      columns={columns}
      data={formattedData}
      tableCellStyles={tableCellStyles}
      hasSelective={true}
      handleSelected={handleSelected}
      idCol="stt"
    />
  );
};
