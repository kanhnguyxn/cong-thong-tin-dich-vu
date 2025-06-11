"use client";
import { useEffect, useState } from "react";
import { SearchBar } from "@components/SearchBar";
import XuLyDonTable from "./xuLyDonTable";
import { donCanXuLy } from "@services/donCanXuLy";

export default function XuLyDonPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Chỉ sử dụng mock data
    setData(donCanXuLy);
  }, []);

  const onSearch = (query: string) => {
    const filtered = donCanXuLy.filter((item) =>
      item.tenDon.toLowerCase().includes(query.toLowerCase())
    );
    setData(filtered);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="border-b-2 border-b-[var(--color-gray-fill)] w-full p-3 flex justify-between sticky  top-[234px] md:top-[121px] bg-white z-40">
        <h3 className="text-xl md:text-3xl uppercase font-bold">Xử lý đơn</h3>
        <SearchBar onSearch={onSearch}></SearchBar>
      </div>
      <div className="w-full px-4 md:max-w-[90%] lg:max-w-[80%]">
        <XuLyDonTable data={data} useMockData={true} />
      </div>
    </div>
  );
}
