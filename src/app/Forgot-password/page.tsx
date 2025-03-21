"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Import các component tùy chỉnh từ ứng dụng
import { Form } from "@components/FormInput";
import { Container } from "@components/Container";
import Button from "@components/Button";

// Import từ các file đã tách
import { FORGOT_PASSWORD_FORM_CONFIG } from "./config";
import { STYLES } from "./styles";
import { EnhancedInput } from "./EnhancedInput";

export default function ForgotPassword() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState("email"); // "email" or "otp"
  const [showOtpNotification, setShowOtpNotification] = useState(false);
  const [error, setError] = useState<string | null>(null); // Lưu trữ thông báo lỗi

  // Handle form submission
  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    setError(null); // Reset any previous errors
    
    try {
      if (formStep === "email") {
        // Show OTP notification and ensure any previous submission state is reset
        setShowOtpNotification(true);
        console.log("Email submitted, showing OTP notification"); // Debugging log
      } else if (formStep === "otp") {
        // Redirect to reset password page or show success
        router.push('/reset-password');
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    if (formStep === "otp") {
      // When cancelling from OTP form, ensure notification state is reset
      setFormStep("email");
      setShowOtpNotification(false);
    } else {
      router.push('/Login');
    }
  };

  return (
    <Container 
      className="w-full my-8 px-4 sm:w-[60%] mx-[20px] md:w-[50%] lg:w-[40%] xl:w-[30%]"
      content={
        <Form
          onSubmit={handleSubmit}
          key={formStep} // Add a key to force re-render of the form when step changes
        >
          <h1 className={STYLES.title}>{FORGOT_PASSWORD_FORM_CONFIG.title}</h1>
          <h2 className={STYLES.subtitle}>{FORGOT_PASSWORD_FORM_CONFIG.subtitle}</h2>
          
          {showOtpNotification && (
            <div className={STYLES.notification}>
              <div className={STYLES.noti_mess}>
              {FORGOT_PASSWORD_FORM_CONFIG.popups.message}
              </div>
             
              <div className={STYLES.footer}>
              <a 
                  href="#" 
                  className={STYLES.linkClassName}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('/Login');
                  }}
                >
                  {FORGOT_PASSWORD_FORM_CONFIG.links.loginWithPassword}
                </a>
                <Button
                  type="button"
                  className={`${STYLES.button} ${STYLES.button_confirm}`}
                  onClick={() => {
                    setShowOtpNotification(false);
                    setFormStep("otp");
                  }}
                >
                  {FORGOT_PASSWORD_FORM_CONFIG.buttons.continue}
                </Button>
                
              </div>
            </div>
          )}
          
          {!showOtpNotification && (
            <>
              {formStep === "email" && (
                <>
                  <EnhancedInput
                    field={FORGOT_PASSWORD_FORM_CONFIG.email}
                    className={STYLES.input}
                  />
                  
                  <div className={STYLES.footer}>
                    <Button
                      type="button"
                      className={` ${STYLES.button} ${STYLES.button_cancel}`}
                      onClick={handleCancel}
                    >
                      {FORGOT_PASSWORD_FORM_CONFIG.buttons.cancel}
                    </Button>
                    <Button
                      type="submit"
                      className={` ${STYLES.button} ${STYLES.button_confirm} `}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? FORGOT_PASSWORD_FORM_CONFIG.buttons.loading : FORGOT_PASSWORD_FORM_CONFIG.buttons.submit}
                    </Button>
                  </div>
                </>
              )}
              
              {formStep === "otp" && (
                <>
                  <EnhancedInput
                    field={FORGOT_PASSWORD_FORM_CONFIG.otp}
                    className={STYLES.input}
                  />
                  
                  <div className={STYLES.footer}>
                    <Button
                      type="button"
                      className={` ${STYLES.button} ${STYLES.button_cancel}`}
                      onClick={handleCancel}
                    >
                      {FORGOT_PASSWORD_FORM_CONFIG.buttons.cancel}
                    </Button>
                    <Button
                      type="submit"
                      className={` ${STYLES.button} ${STYLES.button_confirm} `}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? FORGOT_PASSWORD_FORM_CONFIG.buttons.loading : FORGOT_PASSWORD_FORM_CONFIG.buttons.confirm}
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
          
          {/* Display error if any */}
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </Form>
      }
    />
  );
}
