import { TextField } from "@mui/material";

type TextFieldVariant = "filled" | "outlined" | "standard";

interface FormInputControlProps {
  // Define the type of field based on your schema
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  name: string;
  label: string;
  variant?: TextFieldVariant;
}

export default function FormInputControl({
  onChange,
  placeholder,
  type,
  className,
  name,
  label,
  variant,
}) {
  let inputEle = (
    <TextField
      id={name}
      label={label}
      variant={variant}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );

  switch (type) {
    default:
      break;
  }

  return (
    <div className={className}>
      {/* <label htmlFor={name}>{label}</label> */}
      {inputEle}
      {/* {isError && <span className="error-message">{errors[name]}</span>} */}
    </div>
  );
}
