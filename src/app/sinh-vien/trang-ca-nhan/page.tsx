"use client";
import KtraDonDangKyForm from "./ktraDonDangKyForm";
import DonDaDangKyTable from "./donDaDangKyTable";
import React from "react";

export default function TrangCaNhanPage() {
  const [tableData, setTableData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (data: any) => {
    setLoading(true);

    // Xử lý dữ liệu từ component và truyền cho table
    if (data.type === "specific") {
      setTableData(data.chiTietData || []);
    } else if (data.type === "all") {
      setTableData(data.data || []);
    } else if (data.type === "error") {
      console.error("Lỗi:", data.message);
      setTableData([]);
    }

    setLoading(false);
    console.log("Dữ liệu đơn đã chọn:", data);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="border-b-2 border-b-[var(--color-gray-fill)] w-full p-3 flex justify-between sticky top-[234px] md:top-[121px] bg-white z-40">
        <h3 className="text-xl md:text-3xl uppercase font-bold">
          Trang cá nhân
        </h3>
      </div>
      <KtraDonDangKyForm onChange={handleChange} />
      <DonDaDangKyTable data={tableData} loading={loading} />
    </div>
  );
}
