import React from "react";
import FormMui from "@components/form/Form";

export default function OTPForm() {
  const [error, setError] = React.useState<string | null>(null);
  const inputSchema = [
    {
      name: "otp",
      type: "text",
      placeholder: "Mã OTP",
      label: "Nhập OTP",
      sxLabel: { color: "black", padding: "0px 0px 4px 4px" },
      required: true,
    },
  ];
  const sxButton = {
    width: "40%",
  };
  const buttons = [
    {
      label: "Hủy",
      type: "cancel",
      variants: "contained",
      size: "large",
      disabled: false,
      sx: {
        backgroundColor: "var(--color-light-blue)",
        ...sxButton,
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
    try {
      console.log("OTP submitted:", data.otp);
    } catch (err) {
      setError("Xác thực OTP không thành công");
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
