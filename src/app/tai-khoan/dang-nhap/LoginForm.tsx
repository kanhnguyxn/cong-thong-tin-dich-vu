"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// import { login } from "@features/authSlide";

import Link from "next/link";

import FormMui from "@components/form/Form";
import { loginRequest } from "../../services/auth";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useRouter().push;

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
      loading: loading,
      sx: {
        backgroundColor: "var(--color-blue)",
        color: "white",
        width: "45%",
        paddingTop: "5px",
      },
    },
  ];

  const handleSubmit = async (formData: Record<string, string>) => {
    setError(null);
    setLoading(true);
    const { username, password } = formData;

    try {
      const data = await loginRequest(username, password);

      console.log("data", data);
      //  luu vao cookie
      const { accessToken, refreshToken } = data;
      // Lưu accessToken sống 2 giờ
      document.cookie = `access=${accessToken}; path=/; max-age=7200`;

      // Lưu refreshToken sống 7 ngày (604800 giây)
      document.cookie = `refresh=${refreshToken}; path=/; max-age=604800`;

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
    setLoading(false);
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
    <FormMui
      inputSchema={inputSchema}
      onSubmit={handleSubmit}
      className="w-full max-w-sm flex flex-col gap-2 md:gap-3"
      buttons={buttons}
      buttonClassName="flex flex-col w-full justify-center items-center mt-[-10px]"
      formErrMsg={error}
      renderLink={link}
    />
  );
}
