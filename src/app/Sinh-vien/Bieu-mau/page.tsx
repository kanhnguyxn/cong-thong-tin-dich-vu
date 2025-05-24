"use client";
import { useEffect, useRef, useState } from "react";

import { SearchBar } from "@components/SearchBar";
import BieuMauTable from "./BieuMauTable";
import { getBieuMau } from "@apis/sinhVien/getBieuMau";
// import dataBieuMau from "../../services/Data-bieu-mau";

export default function BieuMauPage() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const originalRef = useRef([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await getBieuMau();
    if (result && result.status && result.data.length > 0) {
      originalRef.current = result.data;
      setOriginalData(result.data);
      setData(result.data);
    } else {
      originalRef.current = [];
      setOriginalData([]);
      setData([]);
    }
  };

  const onSearch = (query: string) => {
    const baseData = originalRef.current;
    if (!query || query.trim() === "") {
      setData(baseData);
      // console.log("baseData", data);
      return;
    }

    const filteredData = baseData.filter((item) =>
      item.tenBM.toLowerCase().includes(query.toLowerCase())
    );
    setData(filteredData);
  };
  useEffect(() => {
    // Sau khi originalData đã được set
    if (originalData.length > 0) {
      onSearch("");
    }
  }, [originalData]);

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
