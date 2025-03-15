"use client";
import React, { useEffect } from "react";

import { Form, useForm } from "@components/FormInput";
import { TextInput } from "@components/TextInput";
import { Container } from "@components/Container";

// Types for form configuration
type FormField = {
  name: string;
  required: boolean;
  type: string;
  placeholder: string;
};

type LoginFormConfig = {
  title: string;
  subtitle: string;
  username: FormField;
  password: FormField;
  validation: ((value: string) => string | null)[];
};

// Form configuration
const LOGIN_FORM_CONFIG: LoginFormConfig = {
  title: "Cổng Thông tin-Dịch vụ",
  subtitle: "Đăng nhập",
  username: {
    name: "username",
    required: true,
    type: "text",
    placeholder: "username",
  },
  password: {
    name: "password",
    required: true,
    type: "password",
    placeholder: "password",
  },
  validation: [
    (value: string) => {
      if (!value) return "Không thể để trống";
      return null;
    }
  ]
};

// CSS classes with hover and error states
const STYLES = {
  input: "w-full px-4 py-2 border rounded-full mb-4 outline-none transition-all duration-200 hover:outline hover:outline-2 hover:outline-blue-500 focus:outline focus:outline-2 focus:outline-blue-500 text-sm md:text-lg",
  inputError: "outline outline-2 outline-red-500 border-red-500",
  button: "w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4",
  title: "text-[var(--color-orange)] text-lg md:text-xl lg:text-2xl font-bold mb-2",
  subtitle: "text-[var(--color-blue)] uppercase font-bold mb-4 text-sm md:text-lg lg:text-xl",
  errorMessage: "text-red-500 text-xs mt-1 mb-2"
};

// FormField component with enhanced error handling
function EnhancedInput({ field, className }: { field: FormField, className: string }) {
  const { values, errors, touched } = useForm();
  const error = touched[field.name] ? errors[field.name] : null;
  
  // Combine input classes based on error state
  const inputClass = `${className} ${error ? STYLES.inputError : ''}`;
  
  return (
    <div>
      <TextInput
        id={field.name}
        name={field.name}
        required={field.required}
        type={field.type}
        placeholder={field.placeholder}
        inputClassName={inputClass}
      />
      {error && <span className={STYLES.errorMessage}>{error}</span>}
    </div>
  );
}

export default function LoginPage() {
  const handleSubmit = (values: Record<string, string>) => {
    console.log('Form submitted with:', values);
    // Add your authentication logic here
  };
  
  return (
    <Container
      className="w-full mx-auto my-8 px-4 md:w-[60%] lg:w-[25%]"
      content={
        <Form onSubmit={handleSubmit}>
          <h1 className={STYLES.title}>{LOGIN_FORM_CONFIG.title}</h1>
          <h2 className={STYLES.subtitle}>{LOGIN_FORM_CONFIG.subtitle}</h2>
          
          <EnhancedInput 
            field={LOGIN_FORM_CONFIG.username} 
            className={STYLES.input}
          />
          
          <EnhancedInput 
            field={LOGIN_FORM_CONFIG.password} 
            className={STYLES.input}
          />
          
          <div className="text-left w-full">
            <a className="text-blue-500 text-sm" href="#">Quên mật khẩu?</a>
          </div>
          
          <button 
            type="submit"
            className={STYLES.button}
          >
            Đăng nhập
          </button>
        </Form>
      }
    />
  );
}





