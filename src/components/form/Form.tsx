"use client";

import { useState } from "react";

import FormInputControl from "./FormInputControl";

interface FormProps {
  className?: string;
  inputSchema: Array<any>;
  onSubmit: (formData: Object) => void;
  buttonLabel?: string;
  buttonClassName?: string;
}

export default function FormMui({
  inputSchema,
  onSubmit,
  buttonLabel = "Submit",
  buttonClassName,
  className,
}) {
  const [formData, setFormData] = useState({});

  const handleChange = (name:string, value:any) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={className} onSubmit={handleSubmit}>
      {inputSchema.map((field, index) => {
        const { name, type, placeholder, label, className, ...rest } = field;
        return (
          <FormInputControl
            key={index}
            field={field}
            onChange={() => handleChange(name, field.value)}
            placeholder={placeholder}
            type={type}
            name={name}
            className={className}
            label={label}
            {...rest}
          />
        );
      })}
      <button type="submit" className={buttonClassName}>
        {buttonLabel}
      </button>
    </div>
  );
}
