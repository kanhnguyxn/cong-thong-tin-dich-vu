"use client";

import { useEffect, useState } from "react";
import { fetchDonDangKyCanBo } from "@redux/features/donDangKySlice";
import { useAppDispatch } from "@redux/hook";
import DonDangKyTable from "./donDangKyTable";
import DonDangKyForm from "./donDangKyForm";
export default function QuyDinhPage() {
  const [maDonDangKy, setMaDonDangKy] = useState<string>("");
  const [openDonDangKy, setOpenDonDangKy] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("ĐonangKyPage");
    dispatch(fetchDonDangKyCanBo());
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
    <>
      <div className="w-full h-full flex justify-center items-start">
        {openDonDangKy ? (
          <button
            onClick={handleBackToTable}
            className="mt-2 px-4 py-2 bg-[var(--color-blue)] text-white rounded-lg hover:bg-gray-600 transition-colors absolute left-0 ml-2"
          >
            ← Quay lại
          </button>
        ) : (
          <></>
        )}
        {!openDonDangKy && <DonDangKyTable donDangKy={handleDangKy} />}
        {openDonDangKy && <DonDangKyForm maDonDangKy={maDonDangKy} />}
      </div>
    </>
  );
}
