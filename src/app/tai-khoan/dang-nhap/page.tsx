"use client";
import React from "react";

import LoginForm from "./LoginForm";
import { Box, Typography } from "@mui/material";

export default function LoginPage() {
  return (
    <Box className="flex flex-col">
      <Typography
        variant="h6"
        fontWeight={500}
        className="uppercase text-[var(--color-blue)]"
        sx={{
          fontSize: {
            xs: "14px", // ~text-base
            sm: "16px", // ~text-xl
            md: "18px", // ~text-2xl
            lg: "20px", // ~text-3xl
          },
        }}
      >
        {"Đăng Nhập"}
      </Typography>
      <LoginForm />
    </Box>
  );
}
