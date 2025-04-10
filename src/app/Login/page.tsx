import React from "react";

import LoginForm from "./LoginForm";
import { Box, Typography } from "@mui/material";

export default function LoginPage() {
  return (
    <Box className="flex flex-col gap-2">
      <Typography
        variant="h6"
        fontWeight={500}
        className="uppercase text-[var(--color-blue)]"
      >
        {"Đăng Nhập"}
      </Typography>
      <LoginForm />
    </Box>
  );
}
