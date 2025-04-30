"use client";
import { Container } from "@components/Container";
import { InputLabel } from "@mui/material";
import { dataDonDangKy } from "src/app/services/dataDonDangKy";
import { labelStyles } from "@styles/style_component";

export default function KtraDonDangKyForm({ onChange }) {
  const donDangKy = dataDonDangKy.map((item) => ({
    maDon: item.maDon,
    tenDDK: item.tenDDK,
  }));

  const handleChange = (e: any) => {
    const selectedDon = donDangKy.find((item) => item.maDon === e.target.value);
    if (selectedDon) onChange(selectedDon.maDon);
  };

  return (
    <Container className="mt-6 mx-6" shadow>
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
            onChange={handleChange}
            className="w-full max-w-[60%] h-10 border border-[var(--color-blue)] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {donDangKy.map((item) => (
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
