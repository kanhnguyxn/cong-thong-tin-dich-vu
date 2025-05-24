"use client";

import React, { useState } from "react";
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
// import getTime from "@components/getTime";
import { createFormRequest } from "@apis/sinhVien/createFormRequest";
import { Notification } from "@components/Notification";
import ICONS from "@components/icons";

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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [flag, setFlag] = useState(false);

  // lay du lieu tu redux
  const rawDonDangKy = useAppSelector((state) => state.donDangKy.donDangKy);
  const donDangKy = rawDonDangKy.find((item) => item.maDon === maDonDangKy);
  // lấy user từ redux
  const user = useAppSelector((state) => state.auth.user);
  const maSV = user?.username;

  // hien thi thong tin chi tiet cua don
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
      loading: loading,
      sx: { ...buttonStyles },
    },
  ];

  // xu ly submit form
  const hanleSubmit = async (formData: any) => {
    // console.log("formData", formData);
    setLoading(true);
    const data = {
      // maDCT không cần
      maDonCT: "125",
      maDon: donDangKy?.maDon,
      maSV: maSV,
      // hoc kỳ hien tai không cần
      hocKyHienTai: "20232024",
      ngayTaoDonCT: new Date().toISOString(),
      thongTinChiTiet: JSON.stringify(formData),
      // không cần
      trangThaiXuLy: "Chờ duyệt",
    };
    const response = await createFormRequest(data);
    if (response.status === true) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
    setLoading(false);
    setFlag(true);
  };

  const onCloseNotification = () => {
    setFlag(false);
    setSuccess(null);
  };

  return (
    <>
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
      {flag && (
        <Notification
          success={success}
          onClose={onCloseNotification}
          message={{
            success: "Đăng ký thành công",
            fail: "Đăng ký thất bại",
          }}
          icon={{
            success: ICONS.SUCCESS,
            fail: ICONS.FAIL,
          }}
        />
      )}
    </>
  );
}
