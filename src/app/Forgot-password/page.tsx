"use client";
import React from "react";

// Import các component tùy chỉnh từ ứng dụng
import { Form } from "@components/input/FormInput";
import { Container } from "@components/Container";

// Import từ các file đã tách
import { FORGOT_PASSWORD_FORM_CONFIG } from "./config";
import { STYLES } from "./styles";
import { PopupNoti } from "./EnhancedInput";
import { useForgotPassword } from "./useForgotPassword";

// Import các component đã tách
import EmailForm from "./forms/EmailForm";
import OtpForm from "./forms/OtpForm";
import ResetPasswordForm from "./forms/ResetPasswordForm";

export default function ForgotPassword() {
  const {
    formStep,
    isSubmitting,
    error,
    showOtpNotification,
    handleSubmit,
    handleCancel,
    handleOtpClose,
    handleOtpContinue,
    handleNavigateToLogin
  } = useForgotPassword();

  // Render form based on current step
  const renderForm = () => {
    switch(formStep) {
      case "email":
        return <EmailForm onCancel={handleCancel} isSubmitting={isSubmitting} />;
      case "otp":
        return <OtpForm onCancel={handleCancel} isSubmitting={isSubmitting} />;
      case "password":
        return <ResetPasswordForm isSubmitting={isSubmitting} />;
      default:
        return null;
    }
  };

  return (
    <>
      {showOtpNotification && (
        <PopupNoti
          message={FORGOT_PASSWORD_FORM_CONFIG.popups.message}
          onClose={handleOtpClose}
          onContinue={handleOtpContinue}
          navigateToLogin={handleNavigateToLogin}
        />
      )}
      
      {!showOtpNotification && (
        <Container 
          className="w-full my-8 px-4 sm:w-[60%] mx-[20px] md:w-[50%] lg:w-[40%] xl:w-[30%]"
          content={
            <Form
              onSubmit={handleSubmit}
              key={formStep}
            >
              <h1 className={STYLES.title}>{FORGOT_PASSWORD_FORM_CONFIG.title}</h1>
              <h2 className={STYLES.subtitle}>
                {FORGOT_PASSWORD_FORM_CONFIG.subtitle}
              </h2>
              
              {error && <div className={STYLES.errorStyle}>{error}</div>}
              
              {renderForm()}
            </Form>
          }
        />
      )}
    </>
  );
}
