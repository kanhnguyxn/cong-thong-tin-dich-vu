"use client";
import { useEffect, useState } from "react";
import { SearchBar } from "@components/SearchBar";
import XuLyDonTable from "./xuLyDonTable";
import { fetchDonDangKyCanBo } from "@redux/features/donDangKySlice";
import { fetchDonDangKyChiTiet } from "@redux/features/donDangKyChiTietSlice";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import Loading from "src/app/loading";

export default function XuLyDonPage() {
  const [data, setData] = useState([]);
  const dispatch = useAppDispatch();
  const { donDangKyChiTiet, loading } = useAppSelector(
    (state) => state.donDangKyChiTiet
  );

  useEffect(() => {
    dispatch(fetchDonDangKyCanBo());
    dispatch(fetchDonDangKyChiTiet());
  }, [dispatch]);

  useEffect(() => {
    if (donDangKyChiTiet.length > 0) {
      setData(donDangKyChiTiet);
    }
  }, [donDangKyChiTiet]);

  const onSearch = (query: string) => {
    const filteredData = donDangKyChiTiet.filter((item) =>
      item.maDon.toLowerCase().includes(query.toLowerCase())
    );
    setData(filteredData);
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
              Xử lý đơn
            </h3>
            <SearchBar onSearch={onSearch}></SearchBar>
          </div>
          <div className="w-full px-4 md:max-w-[90%] lg:max-w-[80%]">
            <XuLyDonTable data={data} />
          </div>
        </div>
      )}
    </>
  );
}
