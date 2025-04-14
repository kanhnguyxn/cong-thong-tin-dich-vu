import FormMui from "@components/form/Form";

import ICONS from "@components/icons";
import { IconButton, InputAdornment, InputLabel } from "@mui/material";
import React from "react";
import { PopUp } from "./popUp";
import { labelStyles } from "@styles/style_component";

const newPasswordId = "matKhauMoi";

export default function ResetPassword(props: any) {
  const [open, setOpen] = React.useState(false);
  const inputSchema = [
    {
      name: newPasswordId,
      type: "text",
      required: true,
      lableRender: () => (
        <InputLabel sx={{ ...labelStyles, color: "black", padding: "0px 0px 4px 4px" , }}>
          {"Nhập mật khẩu mới"}
          <IconButton
            sx={{
              color: "var(--color-blue)",
              fontSize: "1.5rem",
            }}
            onClick={() => setOpen(true)}
          >
            {ICONS.INFO}
          </IconButton>
        </InputLabel>
      ),
    },
    {
      name: "nhapLaiMatKhau",
      type: "text",
      label: "Nhập lại mật khẩu",
      sxLabel: { color: "black", padding: "0px 0px 4px 4px" },
      required: true,
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
  const sxButton = {
    width: "40%",
  };
  const buttons = [
    {
      label: "Tiếp tục",
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


  return (
    <FormMui
      inputSchema={inputSchema}
      onSubmit={() => {}}
      className="w-full max-w-sm flex flex-col gap-2 md:gap-3"
      buttons={buttons}
      buttonClassName="flex flex-row justify-around"
      {...props}
    />
  )
}
