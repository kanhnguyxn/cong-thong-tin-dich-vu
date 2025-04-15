import React from "react";
import { Icon, InputLabel } from "@mui/material";



import FormMui from "@components/form/Form";
import ICONS from "@components/icons";
import BasicModal from "@components/Modal";
import { labelStyles } from "@styles/style_component";
import zIndex from "@mui/material/styles/zIndex";

const newPasswordId = "matKhauMoi";

export default function ResetPassword(props: any) {
  const inputSchema = [
    {
      name: newPasswordId,
      type: "text",
      required: true,
      lableRender: () => (
        <div className="flex items-center">
        <InputLabel sx={{ ...labelStyles, color: "black", padding: "0px 0px 4px 4px" , }}>
          {"Nhập mật khẩu mới"}
        </InputLabel>
        <BasicModal 
        button={ICONS.INFO}
        buttonClassName={{
          color: "var(--color-blue)",
          fontSize: "1.5rem",
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
