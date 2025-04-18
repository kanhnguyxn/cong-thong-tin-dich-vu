"use client";

import NavBar from "./Navbar";
import QuyDinhTable from "./QuyDinhTable";
import dataQuyDinh from "../../services/dataQuyDinh";
import { SearchBar } from "@components/SearchBar";
import React from "react";

export default function QuyDinhPage() {
  const [department, setDepartment] = React.useState("");
  const [option, setOption] = React.useState("");
  const [data, setData] = React.useState([]);

  const onSearch = (query: string) => {
    if (!query || query.trim() === "") return setData(dataQuyDinh); // Nếu không có từ khóa tìm kiếm, hiển thị tất cả dữ liệu
    const filteredData = dataQuyDinh.filter((item) =>
      item.quydinh.toLowerCase().includes(query.toLowerCase())
    );
    setData(filteredData);
    console.log(filteredData, query);
  };

  const handleSelectionsChange = (department: string, option: string) => {
    setDepartment(department);
    setOption(option);
  };
  return (
    <div className="flex flex-col w-full">
      <div className="border-b-2 border-b-[var(--color-gray-fill)] w-full p-3 flex justify-between sticky  top-[234px] md:top-[121px] bg-white z-40">
        <h3 className="text-xl md:text-3xl uppercase font-bold">
          Tra cứu Quy định
        </h3>
        <SearchBar onSearch={onSearch}></SearchBar>
      </div>
      <div className="flex flex-1 w-full justify-between">
        <div className="md:w-[25%] lg:w-[20%]  h-full">
          <NavBar onSelectionsChange={handleSelectionsChange} />
        </div>
        <div className="lg: w-[75%] justify-center align-center">
          <h5 className="w-full text-center uppercase font-semibold text-[var(--color-blue)] text-lg md:text-2xl">
            {option}
          </h5>
          {
            department==='' && option === '' ? (
                <p>Trống</p>
        ):( <QuyDinhTable data={data} />)
          }
        </div>
      </div>
    </div>
  );
}
