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
import SelectInput from "@components/form/input/selectInput";

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
        <SelectInput
          name="trangThai"
          label="Trạng thái"
          value={item.trangThai}
          onChange={(value) => {
            handleStatusChange(item, value);
          }}
          options={[
            { display: "Đang xử lý", value: "Đang xử lý" },
            { display: "Đã duyệt", value: "Đã duyệt" },
            { display: "Bị từ chối", value: "Bị từ chối" },
          ]}
          sx={{
            "& .MuiSelect-select": { border: "none" },
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          }}
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
  const getTableHeaderStyles = (columnId: string) => {
    return {
      borderRight: "2px solid white",
      backgroundColor: "var(--color-blue)",
      color: "white",
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
        tableHeaderStyles={getTableHeaderStyles}
        idCol="stt"
      />
    </div>
  );
}
