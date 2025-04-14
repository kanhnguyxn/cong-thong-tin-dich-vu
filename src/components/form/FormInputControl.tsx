"use client";

import styled from "styled-components";

import { Box, FormControl, InputLabel, TextField } from "@mui/material";
import { StyledTextField, labelStyles } from "@styles/style_component";
import PasswordInput from "./input/PasswordInput";

type TextFieldVariant = "filled" | "outlined" | "standard";

interface FormInputControlProps {
  // Define the type of field based on your schema
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  name: string;
  label: string;
  lableRender?: () => JSX.Element;
  sxLabel?: object;
  variant?: TextFieldVariant;
  sx?: object;
  onBlur: (value: any) => void;
  errMessage?: string;
  value?: any;
  formControlClassName?: string;
}

export default function FormInputControl({
  onChange,
  placeholder,
  type,
  className,
  name,
  label,
  lableRender,
  sxLabel,
  variant,
  onBlur,
  errMessage = "",
  value,
  formControlClassName,
}: FormInputControlProps) {
  let inputEle = (
    <FormControl className={`w-full ${formControlClassName}`} >
      {lableRender?  lableRender(): (<InputLabel sx={{...labelStyles, ...sxLabel}}>{label}</InputLabel>)}
      <StyledTextField
        id={name}
        variant={variant}
        placeholder={placeholder}
        className={className}
        value={value}
        onBlur={(e) => onBlur(e.target.value)}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );

  switch (type) {
    case "password":
      inputEle = (
        <PasswordInput
          id={name}
          label={label}
          variant={variant}
          placeholder={placeholder}
          value={value}
          className={className}
          onBlur={(e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onBlur(e.target.value)}
          onChange={(e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
        />
      );
      break;
    default:
      break;
  }
  return (
    <Box>
      {inputEle}
      {errMessage.length > 0 && <div className="text-red-500 text-start px-2 mt-1 italic text-xs">{errMessage}</div>}
    </Box>
  );
  // return (
  //   <div>
  //     {/* <label htmlFor={name}>{label}</label> */}
  //     {inputEle}
  //     {/* {isError && <span className="error-message">{errors[name]}</span>} */}
  //   </div>
  // );
}
