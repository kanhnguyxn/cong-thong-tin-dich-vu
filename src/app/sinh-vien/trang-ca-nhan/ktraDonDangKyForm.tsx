"use client";
import { Container } from "@components/Container";
import { InputLabel } from "@mui/material";
import { labelStyles } from "@styles/style_component";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { fetchDonDangKy } from "@redux/features/donDangKySlice";
import { getDonDangKyChiTiet } from "@apis/sinhVien/getDonDangKyChiTiet";
import SelectInput from "@components/form/input/selectInput";

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

  const handleChange = async (value: any) => {
    setLoading(true);

    try {
      if (!value || value === "") {
        // Reset to no selection
        setSelectedDon(null);
        onChange({ type: "none", data: [] });
        setLoading(false);
        return;
      }

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
    <Container className="w-full md: max-w-[80%] my-6  " shadow>
      <h6 className="uppercase text-[var(--color-blue)] w-full text-lg md:text-xl lg:text-2xl font-bold mb-4">
        Đơn Đăng ký
      </h6>
      <div className="w-full flex flex-col gap-3 md:flex-row items-center justify-around">
        <div className="flex flex-row md:justify-center items-center gap-3">
          <InputLabel
            sx={labelStyles}
            className="block text-sm font-medium text-gray-700"
          >
            Loại đơn:
          </InputLabel>
          <SelectInput
            className="border-2 border-black rounded-md"
            onChange={handleChange}
            options={[
              { display: "Tất cả đơn", value: "all" },
              ...donDangKy.map((don) => ({
                display: don.tenDon,
                value: don.maDon,
              })),
            ]}
          />
        </div>
        <div className=" text-black text-xs md:text-sm text-left">
          <p className="font-semibold mb-1 text-left text-[var(--color-blue)]">
            Ghi chú:
          </p>
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
