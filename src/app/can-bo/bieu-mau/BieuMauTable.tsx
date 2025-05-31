// "use client";

import { useMemo } from "react";
import { useAppDispatch } from "@redux/hook";

import { addSelectedBieuMau } from "@redux/features/bieuMauSlice";

import CustomTable from "@components/Table";
// import { useEffect, useState } from "react";

// thong tin cac cot trong bieumau table
const columns = [
  { id: "bieuMau", label: "Tên biểu mẫu" },
  { id: "donVi", label: "Đơn vị thực hiện", width: "18ch" },
  { id: "taiXuong", label: "Tải xuống", width: "10ch" },
];

export const BieuMauTable = ({ data }) => {
  const formattedData = useMemo(() => {
    return data.map((row, index) => ({
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
  }, [data]);

  const dispatch = useAppDispatch();

  const tableCellStyles = (columnId, row) => {
    if (columnId === "bieuMau") {
      return { textAlign: "left" };
    }
    return { textAlign: "center" };
  };

  const handleSelected = (data: any[]) => {
    const _data: any[] = data.reduce((acc, item) => {
      const _item = {
        maBM: item.bieuMau,
        tenBM: item.bieuMau,
        tenPB: item.donVi,
      };
      acc.push(_item);

      return acc;
    }, []);

    dispatch(addSelectedBieuMau(_data));
  };

  return (
    <CustomTable
      columns={columns}
      data={formattedData}
      tableCellStyles={tableCellStyles}
      hasSelective={true}
      handleSelected={handleSelected}
    />
  );
};
