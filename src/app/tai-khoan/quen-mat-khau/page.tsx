"use client";
import React, { useMemo, useState } from "react";

import { Box, Typography } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { customTheme, titleStyles } from "@styles/style_component";

import EmailForm from "./EmailForm";
import OtpForm from "./OtpForm";
import ResetPassword from "./ResetPasswordForm";
import Noti from "./noti";

export default function LoginPage() {
  const outerTheme = useTheme();
  const theme = useMemo(() => customTheme(outerTheme), [outerTheme]);

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep(1);

  const handleEmail = (email: string) => {
    setEmail(email); // Lưu email vào state để sử dụng trong các bước tiếp theo
    console.log("email", email);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="flex flex-col">
        <Typography variant="h6" {...titleStyles}>
          {"Lấy lại mật khẩu"}
        </Typography>
        <div>
          {step === 1 && (
            <EmailForm onNext={handleNext} handleEmail={handleEmail} />
          )}
          {step === 2 && <Noti onNext={handleNext} />}
          {step === 3 && (
            <OtpForm onNext={handleNext} onBack={handleBack} email={email} />
          )}
          {step === 4 && <ResetPassword onNext={handleNext} />}
        </div>
      </Box>
    </ThemeProvider>
  );
}
