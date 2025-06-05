"use client";

import React, { useEffect } from "react";

import FormMui from "@components/form/Form";
import ICONS from "@components/icons";
import BasicModal from "@components/Modal";
import { Icon } from "@mui/material";

import { changePassword } from "@apis/auth/changePassword";
import { Notification } from "@components/Notification";

export default function ChangePasswordForm(props: any) {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState<boolean | null>(null);
  const [flag, setFlag] = React.useState(false);

  const newPasswordId = "matKhauMoi";

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
      customeLabelStyle: { ...customeLabelStyle },
    },
    {
      name: newPasswordId,
      type: "text",
      placeholder: "Nhập mật khẩu mới",
      required: true,
      customeLabelStyle: { ...customeLabelStyle },
      label: "Mật khẩu mới:",
    },
    {
      name: "nhapLaiMatKhau",
      type: "text",
      label: "Nhập lại mật khẩu:",
      placeholder: "Xác nhận mật khẩu mới",
      required: true,
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
      loading: loading,
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
    setLoading(true);
    setError(null);
    const response = await changePassword({
      oldPassword: formData.matKhauHienTai,
      newPassword: formData.matKhauMoi,
      confirmNewPassword: formData.nhapLaiMatKhau,
    });
    if (response && typeof response === "object" && response.status === true) {
      setSuccess(true);
    } else {
      setSuccess(false);
      setError(
        response && typeof response === "object" && "message" in response
          ? response.message
          : "An error occurred"
      );
    }
    setLoading(false);
    setFlag(true);
    // if (typeof data === 'object' && data.status === 200) {
    //   flag = true;
    // }
    // handleOpen();
  };
  // tu dong tat doi mk sau 3s
  useEffect(() => {
    if (flag) {
      const timer = setTimeout(() => {
        setFlag(false);
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  });

  const onCloseNotification = () => {
    setFlag(false);
  };
  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <FormMui
          inputSchema={inputSchema}
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-2 md:gap-3 items-center max-w-xl justify-between"
          buttons={buttons}
          orientation="horizontal"
          buttonClassName="flex flex-row justify-around "
          formErrMsg={error}
          {...props}
        />
        {IconComponent}
      </div>
      {flag && (
        <Notification
          success={success}
          message={{
            success: "Đổi mật khẩu thành công",
            fail: "Đổi mật khẩu thất bại",
          }}
          icon={{
            success: ICONS.SUCCESS,
            fail: ICONS.FAIL,
          }}
          onClose={onCloseNotification}
        />
      )}
    </>
  );
}
