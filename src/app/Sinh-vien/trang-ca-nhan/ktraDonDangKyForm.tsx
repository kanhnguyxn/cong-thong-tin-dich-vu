"use client";
import { Container } from "@components/Container";
import { InputLabel } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { fetchDonDangKy } from "@redux/features/donDangKySlice";

// import { dataDonDangKy } from "@services/dataDonDangKy";
import { labelStyles } from "@styles/style_component";
import { useEffect, useState } from "react";

export default function KtraDonDangKyForm({ onChange }) {
  const dispatch = useAppDispatch();
  const donDangKyState = useAppSelector((state) => state.donDangKy.donDangKy);

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    dispatch(fetchDonDangKy());
  }, []);

  useEffect(() => {
    if (donDangKyState.length > 0) {
      setData(donDangKyState);
    }
  }, [donDangKyState]);

  const donDangKy = data
    ? data.map((item) => ({
        maDon: item.maDon,
        tenDDK: item.tenDon,
      }))
    : [];

  const handleChange = (e: any) => {
    const value = e.target.value;
    if (value === "all") {
      onChange("all");
    } else {
      const selectedDon = donDangKy.find((item) => item.maDon === value);
      if (selectedDon) onChange(selectedDon.maDon);
    }
  };

  return (
    <Container className="w-full md: max-w-[80%] my-6 " shadow>
      <h6 className="uppercase text-[var(--color-blue)] w-full text-lg md:text-xl lg:text-2xl font-bold mb-4">
        Đơn Đăng ký
      </h6>

      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex flex-row md:justify-center items-center">
          <InputLabel
            sx={{
              ...labelStyles,
              color: "black",
              padding: "0px 0px 4px 4px",
              width: "9ch",
            }}
          >
            Loại đơn:
          </InputLabel>
          <select
            onClick={handleChange}
            className="w-full max-w-[60%] h-10 border border-[var(--color-blue)] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="all">Tất cả</option>
            {data?.map((item) => (
              <option
                key={item.maDon}
                value={item.maDon}
                className="text-sm md:text-base lg:text-lg"
              >
                {item.tenDDK}
              </option>
            ))}
          </select>
        </div>

        <div className=" text-black text-xs md:text-sm text-left">
          <p className="font-semibold mb-1 text-left">Ghi chú:</p>
          <p>
            Sinh viên vui lòng đến nhận giấy tờ sau khi đơn đăng ký hiển thị
            trạng thái <b>Đã xử lý</b> trên hệ thống.
          </p>
          <ol className="list-disc list-inside mt-2 text-left pl-4">
            <li>
              Nhận bảng điểm tại Phòng Đào tạo (Phòng H215, Tòa nhà đa năng).
            </li>
            <li>
              Nhận giấy xác nhận sinh viên tại Phòng Công tác Sinh viên (Tầng 2,
              Tòa nhà đa năng).
            </li>
          </ol>
        </div>
      </div>
    </Container>
  );
}
