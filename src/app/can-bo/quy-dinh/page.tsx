"use client";

import { fetchQuyDinhs } from "@lib/features/quy-dinh-slice";
import { AppDispatch, RootState } from "@lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function QuyDinhPage() {
  const dispatch = useDispatch<AppDispatch>();
  const data = { tenPB: "Phòng Tài Chính", loaiVanBan: "Quy định" };
  // Fetch quy định data when the component mounts
  useEffect(() => {
    dispatch(fetchQuyDinhs(data));
  }, []);
  //
  const { items, loading, error } = useSelector((state: RootState) => state.quydinh);
  return (
    <div className="flex flex-col  h-screen">
      <h1 className="text-2xl font-bold mb-4">Quy định</h1>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : items && items.length > 0 ? (
        <ul className="list-disc pl-5">
          {items.map((item) => (
            <li key={item.id}>{item.sokyhieu}</li>
          ))}
        </ul>
      ) : (
        <p>Không tìm thấy quy định.</p>
      )}

      {error && <p className="text-red-500">Lỗi: {error}</p>}
    </div>
  );
}
