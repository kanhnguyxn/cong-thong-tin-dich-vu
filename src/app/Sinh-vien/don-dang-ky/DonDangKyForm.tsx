"use client";

import React, { use, useEffect } from "react";
import FormMui from "@components/form/Form";
import { InputLabel } from "@mui/material";
// import { dataDonDangKy } from "src/app/services/dataDonDangKy";
import { labelStyles } from "@styles/style_component";
import { Container } from "@components/Container";
import {
  customeLabelStyle,
  formControlStyle,
  typeClassNameMap,
  buttonStyles,
} from "./styles";

import { useAppSelector } from "@lib/hook";
import getTime from "@components/getTime";
import { createFormRequest } from "@apis/sinhVien/createFormRequest";

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
  const [formData, setFormData] = React.useState<any>([]);
  console.log("maDonDangKy", maDonDangKy);
  // lay du lieu tu redux
  const rawDonDangKy = useAppSelector((state) => state.donDangKy.donDangKy);
  const donDangKy = rawDonDangKy.find((item) => item.maDon === maDonDangKy);

  console.log("donDangKy", donDangKy);

  const parsedFields = JSON.parse(donDangKy?.thongTinChiTiet || "[]");

  const inputSchema = parsedFields.map((item: any) => ({
    ...item,
    label: labelRebder(item.label),
    formControlStyle,
    customeLabelStyle,
    className: `${
      typeClassNameMap[item.type] || ""
    } grid grid-cols-[5%_95%] gap-4 md:gap-1 text-left`,
    variant: "standard",
  }));

  const buttons = [
    {
      label: "Đăng ký",
      type: "submit",
      variants: "contained",
      size: "large",
      sx: { ...buttonStyles },
    },
  ];
  const hanleSubmit = async (formData: any) => {
    console.log("formData", formData);
    // const data = {
    //   maDonDangKy: donDangKy?.maDon,
    //   maSV: "123456789",
    //   thoiGianDangKy: new Date(),
    //   thongTinChiTiet: formData,
    // };
    // // console.log("data", data);
    // try {
    //   const response = await createFormRequest({
    //     madon: data.maDonDangKy,
    //     maSv: data.maSV,
    //     thoiGian: data.thoiGianDangKy,
    //     thongTinChiTiet: data.thongTinChiTiet,
    //   });
    //   // console.log("response", response);
    // } catch (error) {
    //   console.error("Error creating form request:", error);
    // }
  };

  return (
    <Container
      className="size-fit px-8 py-6 mx-4 my-5 md:mx-0 md:min-w-[60%] lg:min-w-[50%] md:max-w-[80%]"
      shadow
    >
      <h6 className="w-full text-lg md:text-xl lg:text-2xl font-bold uppercase">
        {donDangKy.tenDon}
      </h6>
      <FormMui
        className="w-full flex flex-col "
        inputSchema={inputSchema}
        onSubmit={hanleSubmit}
        buttons={buttons}
        buttonClassName="w-full flex justify-center items-center"
      />
    </Container>
  );
}
