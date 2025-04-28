"use client";

import React from "react";
import FormMui from "@components/form/Form";
import { InputLabel } from "@mui/material";
import { dataDonDangKy } from "src/app/services/dataDonDangKy";
import { labelStyles } from "@styles/style_component";
import { Container } from "@components/Container";
import {
  customeLabelStyle,
  formControlStyle,
  typeClassNameMap,
} from "./styles";

interface DonDangKyFormProps {
  maDonDangKy: string;
}

const labelRebder = (label: string | string[]) => {
  if (Array.isArray(label)) {
    return (
      // string dau tien lam tieu def con cacs chuoi con laij laf subtitle
      <div className="flex flex-col gap-2 w-full text-wrap">
        <InputLabel sx={{ ...labelStyles, ...customeLabelStyle }}>
          {label[0]}
        </InputLabel>
        {/* nhung lable con lai laf subtitle */}
        {label.slice(1).map((item, index) => (
          <span className="font-light pl-3" key={index}>
            {item}
          </span>
        ))}
      </div>
    );
  }
  return label;
};

export default function DonDangKyForm({ maDonDangKy }: DonDangKyFormProps) {
  const donDangKy = dataDonDangKy.find(
    (item) => item.maDon.toString().trim() === maDonDangKy.trim()
  );

  const inputSchema = (donDangKy?.thongtinChitiet || []).map((item) => ({
    ...item,
    label: labelRebder(item.label),
    formControlStyle,
    customeLabelStyle,
    className: typeClassNameMap[item.type] || "",
    variant: "standard",
  }));
  // console.log("inputSchema", inputSchema);

  const buttons = [
    {
      label: "Đăng ký",
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

  return (
    <Container
      className="w-full flex flex-col justify-center items-center gap-2 border-2"
      shadow
    >
      <h6 className="w-full text-lg md:text-xl lg:text-2xl font-bold uppercase">
        {donDangKy.tenDDK}
      </h6>
      <FormMui
        className="w-full flex flex-col "
        inputSchema={inputSchema}
        onSubmit={(formData) => {
          console.log("formData", formData);
        }}
        buttons={buttons}
      />
    </Container>
  );
}
