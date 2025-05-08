"use client";
import React from "react";

import FormMui from "@components/form/Form";
import { emailRequest } from "src/app/api/auth/emailAPI";
import { isEmailExisted } from "src/app/services/otpService";

export default function EmailForm({ onNext }) {
  const [error, setError] = React.useState<string | null>(null);
  const inputSchema = [
    {
      name: "email",
      type: "text",
      placeholder: "email",
      label: "Nhập email",
      customeLabelStyle: { color: "black", padding: "0px 0px 4px 4px" },
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
  const handleSubmit = async (formData: any) => {
    setError(null);
    // try {
    //   const { email } = formData;
    //   console.log("email", email);
    //   const isExisted = isEmailExisted(email);
    //   if (isExisted) {
    //     onNext();
    //   } else {
    //     setError("Email không tồn tại");
    //   }
    // } catch (error) {
    //   console.log("error", error);
    //   setError("Có lỗi xảy ra, vui lòng thử lại sau");
    // }
    try {
      const { email } = formData;
      const status = await emailRequest(email);
      if (status === true) {
        onNext();
      }
    } catch (error) {
      console.log("error", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <FormMui
        inputSchema={inputSchema}
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-2 md:gap-3"
        buttons={buttons}
        buttonClassName="flex flex-row justify-around"
        formErrMsg={error}
      />
    </div>
  );
}
