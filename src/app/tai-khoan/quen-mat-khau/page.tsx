"use client";
import React from "react";

import { Box, Typography } from "@mui/material";
import { titleStyles } from "@styles/style_component";
import EmailForm from "./EmailForm";
import OtpForm from "./OtpForm";
import ResetPassword from "./ResetPasswordForm";
import { PopUp } from "./popUp";


export default function LoginPage() {

  

  return (
    <Box className="flex flex-col">
      <Typography variant="h6" {...titleStyles}>
        {"Lấy lại mật khẩu"}
      </Typography>
      <ResetPassword />
    </Box>
  );
}
