"use client";
import { useMemo, useState } from "react";

import { Alert, AlertColor, Collapse } from "@mui/material";
import { useAppDispatch } from "@redux/hook";
import { fetchDonDangKyChiTiet } from "@redux/features/donDangKyChiTietSlice";

import { updateStatus } from "@apis/canBo/updateStatus";

import CustomTable from "@components/Table";
// import { donCanXuLy } from "@services/donCanXuLy";
import FormMui from "@components/form/Form";

import FormDonDangKy from "./formDonDangKy";

export default function XuLyDonTable({ data }) {
  const dispatch = useAppDispatch();
  const [alert, setAlert] = useState<{
    open: boolean;
    type: AlertColor;
    message: string;
  }>({
    open: false,
    type: "success",
    message: "",
  });

  const columns = [
    { id: "stt", label: "STT", width: "5ch" },
    { id: "mssv", label: "MSSV", width: "15ch" },
    { id: "tenDon", label: "Loại đơn" },
    { id: "trangThai", label: "Trạng thái", width: "20ch" },
  ];

  // Đảm bảo data luôn là array
  const safeData = Array.isArray(data) ? data : [];

  const filteredData = useMemo(() => {
    return safeData.filter((item) => item.trangThai === "Đang xử lý");
  }, [safeData]);
  const alertTimer = async (time: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, open: false }));
        resolve(true);
      }, time);
    });
  };
  //   thay doi trang thai se goi API cap nhat trang thai
  const handleStatusChange = async (don, newStatus) => {
    const data = {
      maDonCT: don.maDonCT,
      trangThai: newStatus,
    };
    const response = await updateStatus(data);
    if (response.status) {
      setAlert({
        open: true,
        type: "success",
        message: "Cập nhật trạng thái thành công",
      });
    } else {
      setAlert({
        open: true,
        type: "error",
        message: "Không thể cập nhật trạng thái",
      });
    }
    await alertTimer(2000); // Ẩn alert sau 3 giây
    // console.log("Cập nhật dữ liệu");
    dispatch(fetchDonDangKyChiTiet());
  };

  const formattedData = useMemo(() => {
    return filteredData.map((item, index) => ({
      stt: index + 1,
      mssv: item.mssv,
      //   ten don laf button mo form don dang ky
      tenDon: <FormDonDangKy maDonCT={item.maDonCT} maDon={item.maDon} />,
      trangThai: (
        <FormMui
          inputSchema={[
            {
              name: "trangThai",
              type: "select",
              selectOptions: [
                { display: "Chờ xử lý", value: "Đang xử lý" },
                { display: "Đã xử lý", value: "Đã duyệt" },
                { display: "Đã hủy", value: "Bị từ chối" },
              ],
              className: "w-full border-none !mb-0",
              value: item.trangThai,
              onChange: (value) => {
                handleStatusChange(item, value);
              },
            },
          ]}
        />
      ),
    }));
  }, [filteredData]);

  // Define tableCellStyles function separately
  const tableCellStyles = (columnId, row) => {
    if (columnId === "mssv" || columnId === "trangThai" || columnId === "stt") {
      return {
        textAlign: "center",
      };
    }
    return {
      textAlign: "left",
    };
  };

  return (
    <div className="w-full">
      {alert.open && (
        <Collapse in={alert.open} className="mb-4">
          <Alert severity={alert.type}>{alert.message}</Alert>
        </Collapse>
      )}
      <CustomTable
        columns={columns}
        data={formattedData}
        tableCellStyles={tableCellStyles}
        idCol="stt"
      />
    </div>
  );
}
