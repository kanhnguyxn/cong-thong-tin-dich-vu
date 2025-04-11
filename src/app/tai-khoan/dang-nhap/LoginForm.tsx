"use client";
import React from "react";

import FormMui from "@components/form/Form";
import { loginUser } from "src/app/services/auth";

export default function LoginForm() {
  const [error, setError] = React.useState<string | null>(null);
  const inputSchema = [
    {
      name: "username",
      type: "text",
      placeholder: "username",
      required: true,
      
    },
    {
      name: "password",
      type: "password",
      placeholder: "password",
      required: true,
    },
  ];

  const buttons = [
    {
      label: "Quên mật khẩu?",
      type: "button",
      variants: "text",
      size: "small",
      disabled: false,
      href: "tai-khoan/quen-mat-khau",
      onClick: () => {
        console.log("Quên mật khẩu");
      },
      sx:{
        textAlign: "start",
        textTransform: "capitalize",
        placeSelf: "start",
        color: "var(--color-blue)",
        fontWeight:'500',
      }
    },
    {
      label: "Đăng nhập",
      type: "submit",
      variants: "contained",
      size: "large",
      disabled: false,
      sx:{
        backgroundColor: 'var(--color-blue)',
        color: 'white',
      }
    },
  ];

  const handleSubmit = (formData:any) => {
    loginUser(formData.username, formData.password)
    .then ((response) => {
      if (response.status === 200){
        // Xử lý khi đăng nhập thành công
        console.log("Đăng nhập thành công:", response.message);
      }
      else {
        setError(response.message);
      }
    })

    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="flex flex-col items-center">
      <FormMui
        inputSchema={inputSchema}
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-2 md:gap-3"
        buttons={buttons}
        buttonClassName='flex flex-col w-full justify-center items-center mt-[-10px]'
        formErrMsg={error} 
      />
    </div>
  );
}
