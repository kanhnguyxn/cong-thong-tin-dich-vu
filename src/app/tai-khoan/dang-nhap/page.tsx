"use client";
import React, { useMemo } from "react";

import LoginForm from "./LoginForm";
import { Box, Typography } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { customTheme } from "@styles/style_component";

export default function LoginPage() {
  const outerTheme = useTheme();

  const theme = useMemo(() => customTheme(outerTheme), [outerTheme]);
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
