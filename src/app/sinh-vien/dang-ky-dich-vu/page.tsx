"use client";
import React, { useEffect, useState } from "react";
import DonDangKyForm from "./DonDangKyForm";
import DonDangKyTable from "./donDangKyTable";
import { fetchDonDangKy } from "@redux/features/donDangKySlice";
import { useAppDispatch } from "@redux/hook";

export default function ĐonangKyPage() {
  const [maDonDangKy, setMaDonDangKy] = useState<string>("");
  const [openDonDangKy, setOpenDonDangKy] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("ĐonangKyPage");
    dispatch(fetchDonDangKy());
  }, [dispatch]);

  const handleDangKy = (maDon: string) => {
    setMaDonDangKy(maDon);
    setOpenDonDangKy(true);
  };

  const handleBackToTable = () => {
    setOpenDonDangKy(false);
    setMaDonDangKy("");
  };

  return (
    <div className="flex flex-col w-full relative">
      <div className="border-b-2 border-b-[var(--color-gray-fill)] w-full p-3 sticky top-[234px] md:top-[121px] bg-white z-40">
        {openDonDangKy ? (
          <button
            onClick={handleBackToTable}
            className="mt-2 px-4 py-2 bg-[var(--color-blue)] text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Quay lại danh sách
          </button>
        ) : (
          <h3 className="text-xl md:text-3xl uppercase font-bold">
            Đăng Ký Đơn
          </h3>
        )}
      </div>
      <div className="w-full h-full flex justify-center items-start">
        {!openDonDangKy && <DonDangKyTable onDangKy={handleDangKy} />}
        {openDonDangKy && <DonDangKyForm maDonDangKy={maDonDangKy} />}
      </div>
    </div>
  );
}
