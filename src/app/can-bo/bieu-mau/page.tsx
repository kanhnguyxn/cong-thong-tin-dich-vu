"use client";
import { useState } from "react";

import { SearchBar } from "@components/SearchBar";
import { BieuMauTable } from "./BieuMauTable";
import AddButton from "./addButton";
import DeleteButton from "@components/DeleteButton";
import dataBieuMau from "../../services/dataBieuMauCanBo";

export default function BieuMauPage() {
  const [data, setData] = useState(dataBieuMau);
  const onSearch = (query: string) => {
    const filteredData = dataBieuMau.filter((item) =>
      item.tenBM.toLowerCase().includes(query.toLowerCase())
    );

    setData(filteredData);
    // console.log(filteredData, query);
  };
  return (
    <div className="flex flex-col w-full items-center">
      <div className="border-b-2 border-b-[var(--color-gray-fill)] w-full p-3 flex justify-between sticky  top-[234px] md:top-[121px] bg-white z-40">
        <h3 className="text-xl md:text-3xl uppercase font-bold">Biểu mẫu</h3>
        <div className="flex flex-row gap-2">
          <SearchBar onSearch={onSearch}></SearchBar>
          <div className="grid grid-cols-2 gap-2">
            <DeleteButton title="Xoá biểu mẫu" data={data} />
            <AddButton />
          </div>
        </div>
      </div>
      <div className="w-full px-4 md:max-w-[90%] lg:max-w-[80%]">
        <BieuMauTable data={data} />
      </div>
    </div>
  );
}
