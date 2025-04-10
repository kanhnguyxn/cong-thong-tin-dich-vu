"use client";
import React from "react";

import FormMui from "@components/form/Form";
import { loginUser } from "src/app/services/auth";

export default function LoginForm() {
  const [error, setError] = React.useState<string | null>(null);
  const inputSchema = [
    {
      name: "username",
      type: "text",
      placeholder: "username",
      required: true,
      
    },
    {
      name: "password",
      type: "password",
      placeholder: "password",
      required: true,
    },
  ];

  const handleSubmit = (formData:any) => {
    loginUser(formData.username, formData.password)
    .then ((response) => {
      if (response.status === 200){
        // Xử lý khi đăng nhập thành công
        console.log("Đăng nhập thành công:", response.message);
      }
      else {
        setError(response.message);
      }
    })

    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="flex flex-col items-center">
      <FormMui
        inputSchema={inputSchema}
        onSubmit={handleSubmit}
        buttonLabel="Đăng nhập"
        buttonClassName="bg-[var(--color-blue)] text-white py-2 px-4 rounded-full w-fit place-self-center text-sm md:text-md lg:text-lg"
        className="w-full max-w-sm flex flex-col gap-2 md:gap-4"
        formErrMsg={error} 
      />
    </div>
  );
}
