"use client";

import FormMui from "@components/form/Form";

export default function LoginForm() {
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
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="flex flex-col items-center mt-2">
      <FormMui
        inputSchema={inputSchema}
        onSubmit={handleSubmit}
        buttonLabel="Đăng nhập"
        buttonClassName="bg-[var(--color-blue)] text-white py-2 px-4 rounded-full w-fit place-self-center text-sm"
        className="w-full max-w-sm flex flex-col gap-4"
      />
    </div>
  );
}
