import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateMockupOtp } from "../../services/otpService";
import { FORGOT_PASSWORD_FORM_CONFIG } from "./config";

export const useForgotPassword = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState("email");
  const [showOtpNotification, setShowOtpNotification] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mockOtp, setMockOtp] = useState<string>("");

  // Xử lý email submission
  const handleEmailStep = () => {
    const generatedOtp = generateMockupOtp();
    setMockOtp(generatedOtp);
    setShowOtpNotification(true);
    console.log("Email submitted, showing OTP notification");
  };

  // Xử lý OTP submission
  const handleOtpStep = (values: any) => {
    const otpFieldName = FORGOT_PASSWORD_FORM_CONFIG.otp.name;
    const inputOtp = String(values[otpFieldName] || "").trim();
    const expectedOtp = String(mockOtp).trim();
    
    console.log("Normalized input OTP:", inputOtp);
    console.log("Normalized expected OTP:", expectedOtp);
    
    if (inputOtp === expectedOtp) {
      setFormStep("password");
      console.log("OTP validated successfully");
      return true;
    } else {
      setError(FORGOT_PASSWORD_FORM_CONFIG.errorMessages.OTPIncorrect);
      console.log("OTP validation failed");
      return false;
    }
  };

  // Xử lý reset password submission
  const handlePasswordStep = (values: any) => {
    if (values.newPassword === values.confirmPassword) {
      router.push('/Login');
      // hiện 1 alert thay đổi mật khẩu thành công
      alert(FORGOT_PASSWORD_FORM_CONFIG.alert.changePassWordSuccess);
      console.log("Password reset successfully");
      return true;
    } else {
      setError(FORGOT_PASSWORD_FORM_CONFIG.errorMessages.passwordNotMatch);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log("Form values:", values);
      
      let success = false;
      
      if (formStep === "email") {
        handleEmailStep();
        success = true;
      } else if (formStep === "otp") {
        success = handleOtpStep(values);
      } else if (formStep === "password") {
        success = handlePasswordStep(values);
      }
      
      return success;
    } catch (error) {
      console.error("Error:", error);
      setError(FORGOT_PASSWORD_FORM_CONFIG.errorMessages.generalError);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    if (formStep === "otp" || formStep === "password") {
      setFormStep("email");
      setShowOtpNotification(false);
      setError(null);
    } else {
      router.push('/Login');
    }
  };

  const handleOtpClose = () => {
    setShowOtpNotification(false);
  };

  const handleOtpContinue = () => {
    setShowOtpNotification(false);
    setFormStep("otp");
  };

  const handleNavigateToLogin = () => {
    router.push('/Login');
  };

  return {
    formStep,
    isSubmitting,
    error,
    showOtpNotification,
    handleSubmit,
    handleCancel,
    handleOtpClose,
    handleOtpContinue,
    handleNavigateToLogin
  };
};
