"use client";
import KtraDonDangKyForm from "./ktraDonDangKyForm";
import DonDaDangKyTable from "./donDaDangKyTable";
import React from "react";
export default function TrangCaNhanPage() {
  const [madon, setMadon] = React.useState<string>("");
  const handleChange = (maDon: string) => {
    setMadon(maDon);
    // console.log(maDon);
  };
  return (
    <div className="flex flex-col w-full items-center">
      <div className="border-b-2 border-b-[var(--color-gray-fill)] w-full p-3 flex justify-between sticky  top-[234px] md:top-[121px] bg-white z-40">
        <h3 className="text-xl md:text-3xl uppercase font-bold">
          Trang cá nhân
        </h3>
      </div>
      <KtraDonDangKyForm onChange={handleChange} />
      <DonDaDangKyTable madon={madon} />
    </div>
  );
}
