"use client";
import React from "react";

import { Box, Typography } from "@mui/material";
import { titleStyles } from "@styles/style_component";
import EmailForm from "./EmailForm";
import OtpForm from "./OtpForm";
import ResetPassword from "./ResetPasswordForm";
import { isEmailExisted } from "src/app/services/otpService";
import Noti from "./noti";



export default function LoginPage() {
  const [step, setStep] = React.useState(1);
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep(1);


  return (
    <Box className="flex flex-col">
      <Typography variant="h6" {...titleStyles}>
        {"Lấy lại mật khẩu"}
      </Typography>
      <div>
      {step === 1 && <EmailForm onNext={handleNext} />}
      {step === 2 && <Noti onNext={handleNext} />}
      {step === 3 && <OtpForm  onNext={handleNext} onBack={handleBack}/>}
      {step === 4 && <ResetPassword onNext={handleNext} />}
    </div>
    </Box>
  );
}
