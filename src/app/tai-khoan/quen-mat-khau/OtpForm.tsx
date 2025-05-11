"use client";
import React from "react";
import FormMui from "@components/form/Form";
import { checkOtpRequest } from "@apis/auth/checkOtpAPI";

export default function OTPForm({ onNext, onBack, email }) {
  const [error, setError] = React.useState<string | null>(null);
  const inputSchema = [
    {
      name: "otp",
      type: "text",
      placeholder: "Mã OTP",
      label: "Nhập OTP",
      customeLabelStyle: { color: "black", padding: "0px 0px 4px 4px" },
      required: true,
    },
  ];
  const sxButton = {
    width: "40%",
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
      onClick: () => {
        setError(null);
        onBack();
      },
    },
    {
      label: "Xác nhận",
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
  const handleSubmit = async (data: any) => {
    setError(null);
    // try {
    //   const { otp } = data;
    //   const flag = validateOtp(otp, "123456");
    //   if (!flag) {
    //     setError("OTP không hợp lệ");
    //     return;
    //   } else {
    //     onNext();
    //   }
    // } catch (err) {
    //   setError("Xác thực OTP không thành công");
    // }
    try {
      const { otp } = data;
      const res = await checkOtpRequest(email, otp);
      if (res) {
        onNext();
      } else {
        setError("Xác thực OTP không thành công");
      }
    } catch (error) {
      console.log("error", error);
      setError(error.message);
    }
  };

  return (
    <FormMui
      inputSchema={inputSchema}
      onSubmit={handleSubmit}
      className="w-full max-w-sm flex flex-col gap-2 md:gap-3"
      buttons={buttons}
      buttonClassName="flex flex-row justify-around"
      formErrMsg={error}
    />
  );
}
