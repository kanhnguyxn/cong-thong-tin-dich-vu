"use client";
import { useEffect, useState } from "react";

import { SearchBar } from "@components/SearchBar";
import BieuMauTable from "./BieuMauTable";
import { getBieuMau } from "@apis/sinhVien/getBieuMau";
// import dataBieuMau from "../../services/Data-bieu-mau";

export default function BieuMauPage() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]); // lưu bản gốc để reset khi không tìm kiếm

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await getBieuMau();
    if (result) {
      setData(result);
      setOriginalData(result);
    } else {
      // console.log("Không có dữ liệu");
      setData([]);
      setOriginalData([]);
    }
  };

  const onSearch = (query: string) => {
    if (!query || query.trim() === "") {
      setData(originalData);
      return;
    }

    const filteredData = originalData.filter((item) =>
      item.TenBM.toLowerCase().includes(query.toLowerCase())
    );

    setData(filteredData);
    // console.log(filteredData, query);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="border-b-2 border-b-[var(--color-gray-fill)] w-full p-3 flex justify-between sticky  top-[234px] md:top-[121px] bg-white z-40">
        <h3 className="text-xl md:text-3xl uppercase font-bold">
          Tra cứu biểu mẫu
        </h3>
        <SearchBar onSearch={onSearch}></SearchBar>
      </div>
      <div className="w-full px-4 md:max-w-[90%] lg:max-w-[80%]">
        <BieuMauTable data={data} />
      </div>
    </div>
  );
}
