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

  const handleSubmit = (formData) => {
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="flex flex-col items-center">
      <FormMui
        inputSchema={inputSchema}
        onSubmit={handleSubmit}
        buttonLabel="Login"
        buttonClassName="bg-blue-500 text-white py-2 px-4 rounded"
        className="w-full max-w-sm"
      />
    </div>
  );
}