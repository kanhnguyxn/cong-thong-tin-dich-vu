"use client";
import React from "react";
import { Modal, Box } from "@mui/material";

import FormMui from "@components/form/Form";
import ICONS from "@components/icons";
import BasicModal from "@components/Modal";
import { Icon } from "@mui/material";

import ChangePasswordService from "../services/changePassword";
import changePassword from "../api/auth/changePassword";

export default function ChangePasswordForm(props: any) {
  const [error, setError] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const newPasswordId = "matKhauMoi";
  const formControlStyle = {
    // width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.5rem",
  };
  const customeLabelStyle = {
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
      formControlStyle: { ...formControlStyle },
      customeLabelStyle: { ...customeLabelStyle },
    },
    {
      name: newPasswordId,
      type: "text",
      placeholder: "Nhập mật khẩu mới",
      required: true,
      formControlStyle: { ...formControlStyle },
      customeLabelStyle: { ...customeLabelStyle },
      label: "Mật khẩu mới:",
    },
    {
      name: "nhapLaiMatKhau",
      type: "text",
      label: "Nhập lại mật khẩu:",
      placeholder: "Xác nhận mật khẩu mới",
      required: true,
      formControlStyle: { ...formControlStyle },
      customeLabelStyle: { ...customeLabelStyle },
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
            <span className="flex font-bold justify-center pb-2 text-sm md:text-base lg:text-lg items-end">
              <Icon>{ICONS.INFO}</Icon>
              <span className="ml-1">Quy định đặt mật khẩu</span>
            </span>
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
  const handleSubmit = async (formData: any) => {
    // const errorMess = ChangePasswordService(formData.matKhauHienTai);
    // setError(errorMess);
    // console.log("formData", formData);
    try {
      const success = changePassword({
        oldPassword: formData.matKhauHienTai,
        newPassword: formData.matKhauMoi,
        confirmNewPassword: formData.nhapLaiMatKhau,
      });
      if (success) {
        handleOpen();
      } else {
        setError("Có lỗi xảy ra, vui lòng thử lại sau");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
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
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              borderRadius: "10px",
              width: "fit-content",
              padding: "20px 20px 10px 20px",
              fontSize: {
                xs: "20px",
                sm: "22px",
                md: "24px",
              },
            }}
          >
            <span className="text-center uppercase font-bold">
              Đổi mật khẩu thành công
            </span>
            <Icon
              sx={{
                width: {
                  xs: "25px",
                  sm: "30px",
                  md: "40px",
                },
                height: {
                  xs: "25px",
                  sm: "30px",
                  md: "40px",
                },
              }}
            >
              {ICONS.SUCCESS}
            </Icon>
          </Box>
        </Modal>
      )}
    </>
  );
}
