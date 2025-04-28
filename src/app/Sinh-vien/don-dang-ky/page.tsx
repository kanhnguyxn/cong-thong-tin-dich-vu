import React from "react";
import DonDangKyForm from "./DonDangKyForm";
// import LoaiDonForm from "./LoaiDonForm";

export default function ĐonangKyPage() {
  return (
    <div className="w-full flex flex-col justify-center items-center w-[30%]">
      {/* <LoaiDonForm /> */}
      <DonDangKyForm maDonDangKy="DK001" />
    </div>
  );
}
