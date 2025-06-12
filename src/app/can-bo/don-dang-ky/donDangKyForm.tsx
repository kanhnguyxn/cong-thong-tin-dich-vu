"use client";

import React, { useEffect, useState } from "react";
import { InputLabel } from "@mui/material";

import { useAppSelector } from "@redux/hook";

import { createFormRequest } from "@apis/sinhVien/createFormRequest";

import FormMui from "@components/form/Form";
import { Container } from "@components/Container";
import { Notification } from "@components/Notification";
import ICONS from "@components/icons";

import { labelStyles } from "@styles/style_component";
import {
  customeLabelStyle,
  formControlStyle,
  typeClassNameMap,
  buttonStyles,
} from "./styles";

interface DonDangKyFormProps {
  maDonDangKy: string;
}

const labelRebder = (label: string | string[], description?: string) => {
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
  return (
    <div className="flex flex-col gap-2 w-full text-wrap">
      <InputLabel sx={{ ...labelStyles, ...customeLabelStyle }}>
        {label}
      </InputLabel>
      {description && (
        <span className="font-light pl-3 text-sm text-gray-600">
          {description}
        </span>
      )}
    </div>
  );
};

export default function DonDangKyForm({ maDonDangKy }: DonDangKyFormProps) {
  // lay du lieu tu redux
  const rawDonDangKy = useAppSelector((state) => state.donDangKy.donDangKyCB);
  const donDangKy = rawDonDangKy.find((item) => item.maDon === maDonDangKy);

  // Kiểm tra xem donDangKy có tồn tại không
  if (!donDangKy) {
    return (
      <Container
        className="size-fit px-8 py-6 mx-4 my-5 md:mx-0 md:min-w-[60%] lg:min-w-[50%] md:max-w-[80%]"
        shadow
      >
        <div className="text-center py-8">
          <h6 className="text-lg font-bold text-red-600">
            Không tìm thấy thông tin đơn đăng ký
          </h6>
          <p className="text-gray-600 mt-2">Mã đơn: {maDonDangKy}</p>
        </div>
      </Container>
    );
  }

  // hien thi thong tin chi tiet cua don
  let parsedFields = [];
  let hasLink = false;
  let linkUrl = "";

  try {
    const parsed = JSON.parse(donDangKy?.thongTinChiTiet || "[]");

    // Kiểm tra nếu thongTinChiTiet chứa link
    if (
      parsed &&
      typeof parsed === "object" &&
      !Array.isArray(parsed) &&
      (parsed as any).link
    ) {
      hasLink = true;
      linkUrl = (parsed as any).link;
    } else {
      parsedFields = parsed;
    }
  } catch (error) {
    console.error("Error parsing thongTinChiTiet:", error);
    parsedFields = [];
  }

  // Nếu có link thì chuyển hướng
  useEffect(() => {
    if (hasLink && linkUrl) {
      window.open(linkUrl, "_blank");
    }
  }, [hasLink, linkUrl]);

  // Nếu có link thì hiển thị thông báo đang chuyển hướng
  if (hasLink) {
    return (
      <Container
        className="size-fit px-8 py-6 mx-4 my-5 md:mx-0 md:min-w-[60%] lg:min-w-[50%] md:max-w-[80%]"
        shadow
      >
        <div className="text-center py-8">
          <h6 className="text-lg font-bold text-[var(--color-blue)]">
            Đang chuyển hướng...
          </h6>
          <p className="text-gray-600 mt-2">
            Bạn sẽ được chuyển tới: {linkUrl}
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Nếu không tự động chuyển hướng,
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              nhấn vào đây
            </a>
          </p>
        </div>
      </Container>
    );
  }

  if (parsedFields.length === 0) {
  }

  const inputSchema = parsedFields.map((item: any) => {
    // Debug: Log để kiểm tra dữ liệu
    if (item.type === "select") {
      console.log("Select field data:", item);
      console.log("Original selectOptions:", item.selectOptions);
    }

    const formattedSelectOptions = item.selectOptions
      ? Array.isArray(item.selectOptions)
        ? item.selectOptions.map((option: any) => {
            // Nếu option đã là object có display và value thì giữ nguyên
            if (
              typeof option === "object" &&
              option.display &&
              option.value !== undefined
            ) {
              return option;
            }
            // Nếu option là string thì convert thành object
            return {
              display: option,
              value: option,
            };
          })
        : []
      : [];

    if (item.type === "select") {
      console.log("Formatted selectOptions:", formattedSelectOptions);
    }

    return {
      ...item,
      label: labelRebder(item.label, item.description),
      formControlStyle,
      customeLabelStyle,
      className: `${
        typeClassNameMap[item.type] || ""
      } grid grid-cols-[5%_95%] gap-4 md:gap-1 text-left`,
      variant: "standard",
      // Đảm bảo selectOptions có đúng format cho SelectInput
      selectOptions: formattedSelectOptions,
    };
  });

  return (
    <>
      <Container
        className="size-fit px-8 py-6 mx-4 my-5 md:mx-0 md:min-w-[60%] lg:min-w-[50%] md:max-w-[80%]"
        shadow
      >
        <h6 className="w-full text-lg md:text-xl lg:text-2xl font-bold uppercase mb-4">
          {donDangKy?.tenDon || "Tên đơn chưa được cập nhật"}
        </h6>
        {parsedFields.length > 0 ? (
          <FormMui
            className="w-full flex flex-col text-left"
            inputSchema={inputSchema}
          />
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-600">
              Chưa có thông tin chi tiết cho đơn này
            </p>
          </div>
        )}
      </Container>
    </>
  );
}
