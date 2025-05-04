"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@features/authSlide";
import type { AppDispatch } from "@features/store";
import Link from "next/link";
import { ThemeProvider } from "@mui/material/styles";

import FormMui from "@components/form/Form";
import { loginRequest } from "../../api/authAPI";
import { customTheme } from "@styles/style_component";

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
      label: "Đăng nhập",
      type: "submit",
      variants: "contained",
      size: "large",
      sx: {
        backgroundColor: "var(--color-blue)",
        color: "white",
        width: "40%",
        paddingTop: "5px",
      },
    },
  ];

  const handleSubmit = async (formData: Record<string, string>) => {
    setError(null);
    const { username, password } = formData;
    console.log("formData", formData);

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
  const link = () => (
    <Link
      href="./quen-mat-khau"
      className="text-left text-[var(--color-blue)] text-xs md:text-sm"
    >
      Quên mật khẩu?
    </Link>
  );

  return (
    <ThemeProvider theme={customTheme()}>
      <FormMui
        inputSchema={inputSchema}
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-2 md:gap-3"
        buttons={buttons}
        buttonClassName="flex flex-col w-full justify-center items-center mt-[-10px]"
        formErrMsg={error}
        renderLink={link}
      />
    </ThemeProvider>
  );
}
