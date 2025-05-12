"use client";
import FormMui from "@components/form/Form";
import React from "react";
import { dataDonDangKy } from "src/app/services/dataDonDangKy";

interface LoaiDonFormProps {
  onSubmitMaDon: (maDon: string) => void;
}
export default function LoaiDonForm({ onSubmitMaDon }: LoaiDonFormProps) {
  const [error, setError] = React.useState<string | null>(null);
  // Chuẩn bị dữ liệu đơn đăng ký
  const donDangKy = dataDonDangKy.map((item) => ({
    maDon: item.maDon,
    tenDDK: item.tenDDK,
  }));

  // Khai báo input schema
  const inputSchema = [
    {
      name: "loaiDon",
      label: "Loại đơn:",
      type: "select",
      selectOptions: donDangKy.map((item) => item.tenDDK),
      value: donDangKy[0]?.tenDDK || "",
      required: true,
      formControlStyle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
      },
      customeLabelStyle: {
        color: "black",
        display: "contents",
        fontWeight: 500,
      },
      className: "rounded-none !mb-0 !px-2 !py-2 border-[var(--color-blue)]",
    },
  ];

  // Button schema
  const buttons = [
    {
      label: "Tiếp tục",
      type: "submit",
      variants: "contained",
      size: "large",
      sx: {
        backgroundColor: "var(--color-blue)",
        color: "white",
        width: "30%",
        borderRadius: "15px",
      },
    },
  ];

  // Xử lý submit form
  const handleSubmit = (formData: any) => {
    const selectedDon = donDangKy.find(
      (item) => item.tenDDK === formData.loaiDon
    );
    if (!selectedDon) {
      // console.error("Không tìm thấy đơn đăng ký tương ứng.");
      setError("Không tìm thấy đơn đăng ký tương ứng.");
      return;
    }
    onSubmitMaDon(selectedDon.maDon);
  };

  return (
    <FormMui
      className="flex flex-col gap-4 justify-center items-center md:w-[50%] lg:w-[30%]"
      inputSchema={inputSchema}
      onSubmit={handleSubmit}
      buttons={buttons}
      buttonClassName="flex flex-col w-full items-center"
      formErrMsg={error}
    />
  );
}
