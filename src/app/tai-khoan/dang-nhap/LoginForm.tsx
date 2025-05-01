"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@features/authSlide";
import type { AppDispatch } from "@features/store";

import FormMui from "@components/form/Form";
import { loginRequest } from "../../services/auth";

export default function LoginForm() {
  const navigate = useRouter().push;
  const dispatch = useDispatch<AppDispatch>();
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
      href: "tai-khoan/quen-mat-khau",
      onClick: () => console.log("Quên mật khẩu"),
      sx: {
        textAlign: "start",
        textTransform: "capitalize",
        placeSelf: "start",
        color: "var(--color-blue)",
        fontWeight: 500,
      },
    },
    {
      label: "Đăng nhập",
      type: "submit",
      variants: "contained",
      size: "large",
      sx: {
        backgroundColor: "var(--color-blue)",
        color: "white",
      },
    },
  ];

  const handleSubmit = async (formData: Record<string, string>) => {
    setError(null);
    const { username, password } = formData;

    try {
      const data = await loginRequest(username, password);

      dispatch(login(data.accessToken));

      const userType = data.userType?.trim().toLowerCase();

      const redirectMap: Record<string, string> = {
        student: "/sinh-vien/gioi-thieu",
        staff: "/can-bo/gioi-thieu",
        manager: "/admin/gioi-thieu",
      };

      if (userType && redirectMap[userType]) {
        navigate(redirectMap[userType]);
      } else {
        setError("Vai trò người dùng không hợp lệ.");
      }
    } catch (err: any) {
      console.error("Lỗi khi gọi API login:", err);
      setError(err.message || "Lỗi kết nối đến máy chủ");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <FormMui
        inputSchema={inputSchema}
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-2 md:gap-3"
        buttons={buttons}
        buttonClassName="flex flex-col w-full justify-center items-center mt-[-10px]"
        formErrMsg={error}
      />
    </div>
  );
}
