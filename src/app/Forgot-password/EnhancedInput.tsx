"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "@components/input/FormInput";
import { TextInput } from "@components/input/TextInput";
import { TextFieldProps } from "@components/input/TextInput";
import PopUp from "@components/PopUp";
import Button from "@components/Button";

import { STYLES } from "./styles";
import { FORGOT_PASSWORD_FORM_CONFIG } from "./config";

interface EnhancedInputProps {
  field: TextFieldProps;
  className: string;
  
}

export function EnhancedInput({ field, className}: EnhancedInputProps) {
  const { errors, touched, values } = useForm(); // Lấy giá trị từ context form
  const [localError, setLocalError] = useState<string | null>(null);
  
  // Kiểm tra nếu input có giá trị thì áp dụng style inputFilled
  const hasValue = values[field.name] ? true : false;
  
  // chuyển đổi giữ email và OTP
  const inputType = field.type === 'email' ? 'email' : 'text';
  const validationRules = field.type === 'email' 
    ? FORGOT_PASSWORD_FORM_CONFIG.email.validation 
    : FORGOT_PASSWORD_FORM_CONFIG.otp.validation;
  
  // Tự động kiểm tra validation khi giá trị thay đổi
  useEffect(() => {
    if (hasValue) {
      let errorMessage = null;
      
      for (const rule in validationRules) {
        if (rule === 'pattern' && values[field.name]) {
          // Kiểm tra pattern
          if (!validationRules[rule].value.test(values[field.name])) {
            errorMessage = validationRules[rule].message;
            break;
          }
        }
      }
      
      setLocalError(errorMessage);
    } else {
      setLocalError(null);
    }
  }, [values[field.name], hasValue, field.name]);

  // Kiểm tra lỗi: hiển thị lỗi nếu trường đã chạm vào hoặc trường đã có giá trị
  let error = (touched[field.name] || hasValue) ? (errors[field.name] || localError) : null;

  // Kết hợp các lớp input dựa trên trạng thái lỗi và có giá trị hay không
  const inputClass = `${className} ${error ? STYLES.inputError : ''} ${hasValue ? STYLES.inputFilled : ''}`;

  return (
    <div className="w-full">
      <TextInput
        id={field.name}
        name={field.name}
        label={field.label}
        required={field.required}
        type={inputType}
        placeholder={field.placeholder}
        inputClassName={`${inputClass} ${error ? STYLES.errorPlaceholder : ""}`}
        labelClassName={STYLES.label}
        wrapperClassName={STYLES.wrapper}
      />
    </div>
  );
}

interface PopupNotiProps {
  message?: string;
  onClose: () => void;
  onContinue: () => void;
  navigateToLogin: () => void;
}

export function PopupNoti({ message, onClose, onContinue, navigateToLogin }: PopupNotiProps) {
  return (
    <PopUp
      header={
        <>
          <h1 className={STYLES.title}>{FORGOT_PASSWORD_FORM_CONFIG.title}</h1>
          <h2 className={STYLES.subtitle}>{FORGOT_PASSWORD_FORM_CONFIG.subtitle}</h2>
        </>
      }
      content={
        <div className={STYLES.noti_mess}>
          {message || FORGOT_PASSWORD_FORM_CONFIG.popups.message}
        </div>
      }
      footer={
        <div className={STYLES.footer}>
          <a 
            href="#" 
            className={STYLES.linkClassName}
            onClick={(e) => {
              e.preventDefault();
              navigateToLogin();
            }}
          >
            {FORGOT_PASSWORD_FORM_CONFIG.links.loginWithPassword}
          </a>
          <Button
            type="button"
            className={`${STYLES.button} ${STYLES.button_confirm}`}
            onClick={onContinue}
          >
            {FORGOT_PASSWORD_FORM_CONFIG.buttons.continue}
          </Button>
        </div>
      }
      showOverlay={true}
      onClose={onClose}
    />
  );
}

