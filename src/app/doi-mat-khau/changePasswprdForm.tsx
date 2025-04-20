"use client";
import FormMui from "@components/form/Form";
import ICONS from "@components/icons";
import BasicModal from "@components/Modal";
import { colors, formControlClasses, Icon, InputLabel } from "@mui/material";
import { labelStyles } from "@styles/style_component";
import React from "react";
import ChangePasswordService from "../services/changePassword";

export default function ChangePasswordForm(props: any) {
  const [error, setError] = React.useState<string | null>(null);
  const newPasswordId = "matKhauMoi";
  const formControlClassame = {
    // width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.5rem",
  };
  const sxLabel = {
    color: "black",
    display: "contents",
    maxWidth: "60%",
  };
  const inputSchema = [
    {
      name: "matKhauHienTai",
      type: "text",
      label: "Mật khẩu hiện tại:",
      placeholder: "Nhập mật khẩu hiện tại",
      required: true,
      formControlClassName: { ...formControlClassame },
      sxLabel: { ...sxLabel },
    },
    {
      name: newPasswordId,
      type: "text",
      placeholder: "Nhập mật khẩu mới",
      required: true,
      formControlClassName: { ...formControlClassame },
      sxLabel: { ...sxLabel },
      label: "Mật khẩu mới:",
    },
    {
      name: "nhapLaiMatKhau",
      type: "text",
      label: "Nhập lại mật khẩu:",
      placeholder: "Xác nhận mật khẩu mới",
      required: true,
      formControlClassName: { ...formControlClassame },
      sxLabel: { ...sxLabel },
      validations: [
        {
          rule: (value: string, formData: any) =>
            value &&
            formData[newPasswordId] &&
            value === formData[newPasswordId],
          errMessage: "Mật khẩu không khớp",
        },
      ],
    },
  ];

  const buttons = [
    {
      label: "Đổi mật khẩu",
      type: "submit",
      variants: "contained",
      size: "large",
      disabled: false,
      sx: {
        backgroundColor: "var(--color-blue)",
        color: "white",
        padding: "5px 10px",
        borderRadius: "5px",
        // width: "40%",
      },
    },
  ];
  const IconComponent = (
    <div className="pb-10">
      <BasicModal
        button={ICONS.INFO}
        buttonClassName={{
          color: "var(--color-blue)",
          fontSize: "1.5rem",
          paddingLeft: 0,
          width: "fit-content",
        }}
        children={
          <>
            <p className="flex font-bold justify-center pb-2 text-sm md:text-base lg:text-lg items-end">
              <Icon>{ICONS.INFO}</Icon>
              <span className="ml-1">Quy định đặt mật khẩu</span>
            </p>
            <ol className="list-disc pl-5">
              <li>Phải có ít nhất một chữ cái viết hoa</li>
              <li>Phải có ít nhất một chữ cái viết thường</li>
              <li>Phải chứa ký tự đặc biệt (!, @, #, %)</li>
              <li>Phải có ít nhất một số</li>
              <li>Độ dài tối thiểu: 8 ký tự</li>
            </ol>
          </>
        }
      />
    </div>
  );
  const handleSubmit = (formData: any) => {
    const errorMess = ChangePasswordService(formData.matKhauHienTai);
    setError(errorMess);
    console.log("formData", formData);
  };
  return (
    <div className="flex flex-row items-center justify-center">
      <FormMui
        inputSchema={inputSchema}
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-2 md:gap-3 items-center max-w-xl justify-between"
        buttons={buttons}
        buttonClassName="flex flex-row justify-around "
        formErrMsg={error}
        {...props}
      />
      {IconComponent}
    </div>
  );
}
