"use client";
import CustomTable from "@components/Table";
// import { donCanXuLy } from "@services/donCanXuLy";
import FormMui from "@components/form/Form";
import { Alert } from "@mui/material";
import { useMemo } from "react";

export default function XuLyDonTable({ data }) {
  const columns = [
    { id: "stt", label: "STT", width: "5ch" },
    { id: "mssv", label: "MSSV", width: "15ch" },
    { id: "tenDon", label: "Loại đơn" },
    { id: "trangThai", label: "Trạng thái", width: "20ch" },
  ];
  const filteredData = data.filter((item) => item.trangThai === "Đang xử lý");

  //   thay doi trang thai se goi API cap nhat trang thai
  const handleStatusChange = async (don, newStatus) => {
    //  goi api cap nhat trang thai don
    console.log("Cập nhật trạng thái đơn:", don, "Trạng thái mới:", newStatus);
    <Alert severity="success">
      Here is a gentle confirmation that your action was successful.
    </Alert>;
  };
  const formattedData = useMemo(() => {
    return filteredData.map((item, index) => ({
      stt: index + 1,
      mssv: item.mssv,
      tenDon: item.tenDon,
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
    <CustomTable
      columns={columns}
      data={formattedData}
      tableCellStyles={tableCellStyles}
      idCol="stt"
    />
  );
}
