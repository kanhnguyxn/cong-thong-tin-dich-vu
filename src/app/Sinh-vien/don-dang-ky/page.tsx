"use client";
import React from "react";
import DonDangKyForm from "./DonDangKyForm";
import LoaiDonForm from "./LoaiDonForm";

export default function ĐonangKyPage() {
  const [maDonDangKy, setMaDonDangKy] = React.useState<string>("");
  const [openDonDangKy, setOpenDonDangKy] = React.useState(false);
  const handleSubmitLoaiDon = (maDon: string) => {
    setMaDonDangKy(maDon);
    setOpenDonDangKy(true);
  };
  return (
    <div className="flex flex-col w-full relative">
      <div className="border-b-2 border-b-[var(--color-gray-fill)] w-full p-3 sticky top-[234px] md:top-[121px] bg-white z-40">
        <h3 className="text-xl md:text-3xl uppercase font-bold">Đơn Đăng Ký</h3>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        {!openDonDangKy && <LoaiDonForm onSubmitMaDon={handleSubmitLoaiDon} />}
        {openDonDangKy && <DonDangKyForm maDonDangKy={maDonDangKy} />}
      </div>
    </div>
  );
}
