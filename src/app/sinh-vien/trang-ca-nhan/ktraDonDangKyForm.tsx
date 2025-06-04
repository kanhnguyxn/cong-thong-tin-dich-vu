"use client";
import { Container } from "@components/Container";
import { InputLabel } from "@mui/material";
import { labelStyles } from "@styles/style_component";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { fetchDonDangKy } from "@redux/features/donDangKySlice";
import { getDonDangKyChiTiet } from "@apis/sinhVien/getDonDangKyChiTiet";

interface DonDangKyFormProps {
  onChange: (data: any) => void;
}

export default function KtraDonDangKyForm({ onChange }: DonDangKyFormProps) {
  const dispatch = useAppDispatch();
  const [selectedDon, setSelectedDon] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [allChiTietData, setAllChiTietData] = useState<any[]>([]);

  // Lấy dữ liệu từ Redux
  const rawDonDangKy = useAppSelector((state) => state.donDangKy.donDangKySV);
  const donDangKyLoading = useAppSelector((state) => state.donDangKy.loading);

  // Gọi API để lấy danh sách đơn đăng ký và chi tiết khi component mount
  useEffect(() => {
    if (rawDonDangKy.length === 0) {
      dispatch(fetchDonDangKy());
    }

    // Lấy tất cả chi tiết đơn đăng ký
    const fetchAllChiTiet = async () => {
      const response = await getDonDangKyChiTiet();
      if (response.status) {
        setAllChiTietData(response.data);
      }
    };

    fetchAllChiTiet();
  }, [dispatch, rawDonDangKy.length]);

  // Format dữ liệu cho dropdown
  const donDangKy = rawDonDangKy.map((item) => ({
    maDon: item.maDon,
    tenDon: item.tenDon,
    thongTinChiTiet: item.thongTinChiTiet,
  }));

  const handleChange = async (e: any) => {
    const value = e.target.value;
    setLoading(true);

    try {
      if (value === "all") {
        // Hiển thị tất cả đơn chi tiết
        setSelectedDon({ type: "all", data: allChiTietData });
        onChange({ type: "all", data: allChiTietData });
      } else if (value) {
        // Filter chi tiết đơn theo mã đơn đã chọn
        const selectedDonData = donDangKy.find((item) => item.maDon === value);
        if (selectedDonData) {
          // Filter dữ liệu chi tiết theo mã đơn
          const filteredData = allChiTietData.filter(
            (item) => item.maDon === value
          );

          const result = {
            type: "specific",
            maDon: value,
            donData: selectedDonData,
            chiTietData: filteredData,
          };
          setSelectedDon(result);
          onChange(result);
        } else {
          onChange({
            type: "error",
            message: "Không tìm thấy thông tin đơn đăng ký",
          });
        }
      } else {
        // Reset khi không chọn gì
        setSelectedDon(null);
        onChange({ type: "reset" });
      }
    } catch (error) {
      console.error("Lỗi khi xử lý:", error);
      onChange({
        type: "error",
        message: "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="w-full md:max-w-[80%] mb-6 mx-auto mt-4 p-4 md:border-2 border-[var(--color-gray-stroke)] rounded-2xl shadow-sm bg-white">
      <div className="w-full grid grid-cols-[1fr_2fr] gap-4 text-center items-center">
        {/* Dropdown chọn đơn đăng ký */}
        <div className="flex-1">
          <InputLabel
            sx={labelStyles}
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Chọn đơn đăng ký để xem chi tiết:
          </InputLabel>
          <select
            onChange={handleChange}
            disabled={donDangKyLoading || loading}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">
              {donDangKyLoading
                ? "Đang tải danh sách đơn..."
                : "-- Chọn đơn đăng ký --"}
            </option>
            <option value="all">Tất cả đơn đã đăng ký</option>
            {donDangKy.map((don) => (
              <option key={don.maDon} value={don.maDon}>
                {don.tenDon || `Đơn ${don.maDon}`}
              </option>
            ))}
          </select>
        </div>

        {/* Phần ghi chú */}
        <div className="flex-1 text-sm text-gray-700 text-left">
          <p className="font-semibold mb-2 text-blue-800">Ghi chú:</p>
          <p className="mb-1">
            Sinh viên vui lòng đến nhận giấy tờ sau khi đơn đăng ký hiển thị
            trạng thái <b>Đã xử lý</b> trên hệ thống.
          </p>
          <ol className="list-decimal list-inside mt-2 pl-4 space-y-1">
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

      {/* Thông báo tải dữ liệu */}
      {loading && (
        <div className="mt-4 text-blue-600 text-sm">
          <span>Đang tải dữ liệu...</span>
        </div>
      )}

      {/* Khi không có đơn đăng ký */}
      {donDangKy.length === 0 && !donDangKyLoading && (
        <div className="mt-4 text-gray-500 text-sm">
          Bạn chưa có đơn đăng ký nào.
        </div>
      )}
    </Container>
  );
}
