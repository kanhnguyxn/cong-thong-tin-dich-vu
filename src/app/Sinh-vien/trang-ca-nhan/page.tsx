"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { fetchLichSuDangKy } from "@redux/features/lichSuDangKySlice";
import KtraDonDangKyForm from "./ktraDonDangKyForm";
import DonDaDangKyTable from "./donDaDangKyTable";
import Loading from "src/app/loading";

export default function TrangCaNhanPage() {
  const [madon, setMadon] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const { loading: loadingRedux } = useAppSelector(
    (state) => state.lichSuDangKy
  );

  useEffect(() => {
    setLoading(true);
    dispatch(fetchLichSuDangKy());
    if (!loadingRedux) {
      setLoading(false);
    }
  }, []);

  const handleChange = (maDon: string) => {
    setMadon(maDon);
    // console.log(maDon);
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col w-full items-center">
          <div className="border-b-2 border-b-[var(--color-gray-fill)] w-full p-3 flex justify-between sticky  top-[234px] md:top-[121px] bg-white z-40">
            <h3 className="text-xl md:text-3xl uppercase font-bold">
              Trang cá nhân
            </h3>
          </div>
          <KtraDonDangKyForm onChange={handleChange} />
          <DonDaDangKyTable madon={madon} />
        </div>
      )}
    </>
  );
}
