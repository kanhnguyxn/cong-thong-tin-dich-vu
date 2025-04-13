"use client";
import React from "react";

import FormMui from "@components/form/Form";
import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function EmailForm() {
  const [error, setError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const inputSchema = [
    {
      name: "email",
      type: "text",
      placeholder: "email",
      label: "Nhập email",
      sxLabel: { color: "black", padding: "0px 0px 4px 4px" },
      required: true,
      validations: [
        {
          rule: (value: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
          },
          errMessage: "Email không hợp lệ",
        },
        {
          rule: (value: string) => value.length <= 255,
          errMessage: "Email không được dài quá 255 ký tự",
        },
      ],
    },
  ];
  const sxButton = {
    color: "white",
    width: "40%",
    paddingTop: "5px",
  };
  const buttons = [
    {
      label: "Hủy",
      type: "button",
      variants: "contained",
      size: "large",
      disabled: false,
      sx: {
        backgroundColor: "var(--color-light-blue)",
        ...sxButton,
      },
      href: "/tai-khoan/dang-nhap",
    },
    {
      label: "Gửi",
      type: "submit",
      variants: "contained",
      size: "large",
      disabled: false,
      sx: {
        backgroundColor: "var(--color-blue)",
        ...sxButton,
      },
    },
  ];
  const handleSubmit = (formData: any) => {
    let flag = true;
    if (!flag) setError("EMAIL KHÔNG TỒN TẠI");
    else {
      setIsSuccess(true);
    }
  };
  return (
    <div className="flex flex-col items-center gap-2">
      {isSuccess ? (
        <>
          <Typography fontSize={"1rem"} className="text-center my-4">
            Chúng tôi đã gửi mã OTP đến email của bạn
          </Typography>
          <div className="flex justify-between gap-4">
            <Link
              className="text-blue-500 hover:underline text-sm"
              href="./dang-nhap"
            >
              Đăng nhập bằng mật khẩu
            </Link>
            <Button
              className="uppercase rounded-lg"
              variant="contained"
              color="primary"
            >
              Tiếp tục
            </Button>
          </div>
        </>
      ) : (
        <FormMui
          inputSchema={inputSchema}
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col gap-2 md:gap-3"
          buttons={buttons}
          buttonClassName="flex flex-row justify-around"
          formErrMsg={error}
        />
      )}
    </div>
  );
}
