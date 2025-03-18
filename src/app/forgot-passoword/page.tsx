"use client";

import { useState } from "react";
import { Container } from "@components/Container";
import { Form, useForm } from "@components/FormInput";
import { TextInput } from "@components/TextInput";
import Button from "@components/button";
import "@/styles/colors.css";

type FormField = {
  name: string; // Định danh của trường
  label: string; // Nhãn hiển thị
  required: boolean; // Xác định trường có bắt buộc hay không
  type: string; // Loại input (text, password, v.v.)
  placeholder: string; // Văn bản gợi ý
};

type ForgotPasswordForm = {
  title: string;
  subtitle: string;
  email: FormField;
  opt: FormField;
  newPassword: FormField;
  confirmPassword: FormField;
};

const FORGOT_PASSWORD_FORM_CONFIG: ForgotPasswordForm = {
  title: "Cổng Thông tin-Dịch vụ",
  subtitle: "Lấy lại mật khẩu",
  email: {
    name: "email",
    label: "Nhập email",
    required: true,
    type: "email",
    placeholder: "Email",
  },
  opt: {
    name: "opt",
    label: "Nhập mã OTP",
    required: true,
    type: "text",
    placeholder: "Mã OTP",
  },
  newPassword: {
    name: "newPassword",
    label: "Nhập mật khẩu mới",
    required: true,
    type: "password",
    placeholder: "Nhập mật khẩu mới",
  },
  confirmPassword: {
    name: "confirmPassword",
    label: "Nhập lại mật khẩu",
    required: true,
    type: "password",
    placeholder: "Nhập lại mật khẩu",
  },
};

type FormStep = "email" | "otp" | "password";

export default function ForgotPasswordPage() {
  const [currentStep, setCurrentStep] = useState<FormStep>("email");
  const [showOtpSentPopup, setShowOtpSentPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const form = useForm();

  const handleCancel = () => {
    // On OTP step, go back to email form
    if (currentStep === "otp") {
      setCurrentStep("email");
    }
  };

  const handleEmailSubmit = (values: any) => {
    // Here you would make an API call to send the OTP
    console.log("Email submitted:", values.email);
    setShowOtpSentPopup(true);
  };

  const handleContinueAfterOtp = () => {
    setShowOtpSentPopup(false);
    setCurrentStep("otp");
  };

  const handleOtpSubmit = (values: any) => {
    // Here you would validate the OTP
    console.log("OTP submitted:", values.opt);
    setShowPasswordPopup(true);
  };

  const handlePasswordSubmit = (values: any) => {
    // Here you would submit the new password
    console.log("Password submitted:", values);
    alert("Mật khẩu đã được thay đổi thành công!");
    setShowPasswordPopup(false);
    setCurrentStep("email");
  };

  // Popup for OTP notification
  const OtpSentPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Thông báo</h2>
        <p className="mb-6">Chúng tôi đã gửi OTP đến email của bạn</p>
        <div className="flex justify-end">
          <Button onClick={handleContinueAfterOtp}>Tiếp tục</Button>
        </div>
      </div>
    </div>
  );

  // Popup for password reset
  const PasswordPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Đổi mật khẩu mới</h2>

        <Form onSubmit={handlePasswordSubmit} className="space-y-4">
          <TextInput
            name={FORGOT_PASSWORD_FORM_CONFIG.newPassword.name}
            label={FORGOT_PASSWORD_FORM_CONFIG.newPassword.label}
            type={FORGOT_PASSWORD_FORM_CONFIG.newPassword.type}
            placeholder={FORGOT_PASSWORD_FORM_CONFIG.newPassword.placeholder}
            required={FORGOT_PASSWORD_FORM_CONFIG.newPassword.required}
          />

          <TextInput
            name={FORGOT_PASSWORD_FORM_CONFIG.confirmPassword.name}
            label={FORGOT_PASSWORD_FORM_CONFIG.confirmPassword.label}
            type={FORGOT_PASSWORD_FORM_CONFIG.confirmPassword.type}
            placeholder={FORGOT_PASSWORD_FORM_CONFIG.confirmPassword.placeholder}
            required={FORGOT_PASSWORD_FORM_CONFIG.confirmPassword.required}
          />

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" onClick={() => setShowPasswordPopup(false)}>
              Hủy
            </Button>
            <Button type="submit">Xác nhận</Button>
          </div>
        </Form>
      </div>
    </div>
  );

  const pageContent = (
    <>
      <h1 className="text-2xl font-bold text-center mb-2">{FORGOT_PASSWORD_FORM_CONFIG.title}</h1>
      <h2 className="text-lg text-center mb-6">{FORGOT_PASSWORD_FORM_CONFIG.subtitle}</h2>

      {currentStep === "email" && (
        <Form onSubmit={handleEmailSubmit} className="space-y-4">
          <TextInput
            name={FORGOT_PASSWORD_FORM_CONFIG.email.name}
            label={FORGOT_PASSWORD_FORM_CONFIG.email.label}
            type={FORGOT_PASSWORD_FORM_CONFIG.email.type}
            placeholder={FORGOT_PASSWORD_FORM_CONFIG.email.placeholder}
            required={FORGOT_PASSWORD_FORM_CONFIG.email.required}
          />

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" onClick={() => handleCancel()}>
              Hủy
            </Button>
            <Button type="submit">Gửi</Button>
          </div>
        </Form>
      )}

      {currentStep === "otp" && (
        <Form onSubmit={handleOtpSubmit} className="space-y-4">
          <TextInput
            name={FORGOT_PASSWORD_FORM_CONFIG.opt.name}
            label={FORGOT_PASSWORD_FORM_CONFIG.opt.label}
            type={FORGOT_PASSWORD_FORM_CONFIG.opt.type}
            placeholder={FORGOT_PASSWORD_FORM_CONFIG.opt.placeholder}
            required={FORGOT_PASSWORD_FORM_CONFIG.opt.required}
          />

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" onClick={() => handleCancel()}>
              Hủy
            </Button>
            <Button type="submit">Xác nhận</Button>
          </div>
        </Form>
      )}

      {showOtpSentPopup && <OtpSentPopup />}
      {showPasswordPopup && <PasswordPopup />}
    </>
  );

  return <Container className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md" content={pageContent} />;
}
