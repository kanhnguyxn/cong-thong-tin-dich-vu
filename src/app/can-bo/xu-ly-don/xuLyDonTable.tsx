"use client";
import { useEffect, useMemo, useState } from "react";

import { Alert, AlertColor, Collapse } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { fetchDonDangKyChiTiet } from "@redux/features/donDangKyChiTietSlice";

import { updateStatus } from "@apis/canBo/updateStatus";

import CustomTable from "@components/Table";

import FormDonDangKy from "./formDonDangKy";
import SelectInput from "@components/form/input/selectInput";

interface XuLyDonTableProps {
  data: any[];
}

export default function XuLyDonTable({ data }: XuLyDonTableProps) {
  const dispatch = useAppDispatch();
  const [donXuLy, setDonXuLy] = useState<any[]>([]);
  const donDangKy = useAppSelector((state) => state.donDangKy.donDangKyCB);
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
    { id: "tenSV", label: "Họ và tên", width: "20ch" },
    { id: "tenDon", label: "Loại đơn" },
    { id: "trangThai", label: "Trạng thái", width: "20ch" },
  ];

  useEffect(() => {
    // loc ra nhung don co trang thai la "Ðang x? lý"
    if (data.length > 0) {
      const filteredData = data.filter(
        (item) => item.trangThaiXuLy === "Ðang x? lý"
      );
      setDonXuLy(filteredData);
    }
  }, [data, donDangKy]);

  const alertTimer = async (time: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, open: false }));
        resolve(true);
      }, time);
    });
  };
  // loc ra nhung don co trang thai là ""

  const formattedData = useMemo(() => {
    // console.log("donXuLy trong formattedData:", donXuLy);
    const rowData = donXuLy.map((row, index) => {
      // console.log("Dòng dữ liệu:", row);
      return {
        stt: index + 1,
        mssv: row.maSV,
        tenSV: row.hoTen,
        tenDon: <FormDonDangKy maDonCT={row.maDonCT} maDon={row.maDon} />,
        trangThai: (
          <SelectInput
            name="trangThai"
            label="Trạng thái"
            value={"Đang xử lý"}
            onChange={(value) => {
              handleStatusChange(row, value);
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
      };
    });
    return rowData;
  }, [data, donDangKy]);

  //   thay doi trang thai se goi API cap nhat trang thai
  const handleStatusChange = async (don: any, newStatus: string) => {
    const requestData = {
      maDonCT: don.maDonCT,
      trangThai: newStatus,
    };
    const response = await updateStatus(requestData);
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
    await alertTimer(2000); // Ẩn alert sau 2 giây
    // console.log("Cập nhật dữ liệu");
    dispatch(fetchDonDangKyChiTiet());
  };

  // Define tableCellStyles function separately
  const tableCellStyles = (columnId: string, row: any) => {
    if (
      columnId === "mssv" ||
      columnId === "trangThai" ||
      columnId === "stt" ||
      columnId === "tenSV"
    ) {
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
        hasSelective
      />
    </div>
  );
}
