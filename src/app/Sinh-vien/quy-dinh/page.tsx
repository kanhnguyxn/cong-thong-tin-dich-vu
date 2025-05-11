"use client";

import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import QuyDinhTable from "./QuyDinhTable";
import { SearchBar } from "@components/SearchBar";
import { getQuyDinh } from "@apis/sinhVien/getQuyDinh";

export default function QuyDinhPage() {
  const [department, setDepartment] = useState("");
  const [option, setOption] = useState("");
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!department || !option) {
        setData([]);
        setOriginalData([]);
        return;
      }

      const result = await getQuyDinh({
        tenPB: department,
        loaiVanBan: option,
      });

      if (result) {
        setData(result);
        setOriginalData(result);
      } else {
        console.log("Không có dữ liệu");
        setData([]);
        setOriginalData([]);
      }
    };

    fetchData();
  }, [department, option]);

  const onSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setData(originalData);
      return;
    }

    const filteredData = originalData.filter((item) =>
      item.TenBM.toLowerCase().includes(query.toLowerCase())
    );

    setData(filteredData);
    console.log(filteredData, query);
  };

  const handleSelectionsChange = (
    selectedDepartment: string,
    selectedOption: string
  ) => {
    setDepartment(selectedDepartment);
    setOption(selectedOption);
    console.log("Selected Department:", selectedDepartment);
    console.log("Selected Option:", selectedOption);
  };

  const isEmpty =
    (!department && !option && !searchQuery.trim()) || data.length === 0;

  return (
    <div className="flex flex-col w-full relative">
      {/* Header */}
      <div className="border-b-2 border-b-[var(--color-gray-fill)] w-full p-3 flex justify-between sticky top-[234px] md:top-[121px] bg-white z-40">
        <h3 className="text-xl md:text-3xl uppercase font-bold">
          Tra cứu Quy định
        </h3>
        <SearchBar onSearch={onSearch} />
      </div>

      {/* Main layout */}
      <div className="flex flex-col md:flex-row w-full md:h-full">
        {/* Sidebar NavBar */}
        <div
          className="
            w-full md:w-[25%] lg:w-[20%] p-4
            md:fixed md:top-[200px] md:left-0 md:h-[calc(100vh-250px)]
            bg-white z-30
          "
        >
          <NavBar onSelectionsChange={handleSelectionsChange} />
        </div>

        {/* Content */}
        <div className="w-full md:ml-[25%] lg:ml-[20%] px-4 pt-4">
          {option && (
            <h5 className="w-full text-center uppercase font-semibold text-[var(--color-blue)] text-lg md:text-2xl mb-2">
              {option}
            </h5>
          )}
          {isEmpty ? (
            <div className="flex justify-center items-center w-full h-full">
              <p className="uppercase font-light text-lg md:text-2xl text-[var(--color-gray)] text-center">
                Trống
              </p>
            </div>
          ) : (
            <QuyDinhTable data={data} />
          )}
        </div>
      </div>
    </div>
  );
}
