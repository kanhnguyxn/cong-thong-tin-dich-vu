"use client";

import { FormControl, Grid, InputLabel } from "@mui/material";
import { StyledTextField, labelStyles } from "@styles/style_component";
import React from "react";
import FileInput from "./input/fileInput";
import PasswordInput from "./input/PasswordInput";
import SelectCheckboxInput from "./input/SelectCheckBox";
import SelectInput from "./input/selectInput";

type TextFieldVariant = "filled" | "outlined" | "standard";

interface FormInputControlProps {
  // Define the type of field based on your schema
  onChange: (value: string | any[] | File | null) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  name: string;
  label: string;
  lableRender?: () => JSX.Element;
  customeLabelStyle?: object;
  variant?: TextFieldVariant;
  sx?: object;
  onBlur: (value: any) => void;
  errMessage?: string;
  value?: any;
  formControlStyle?: object;
  renderValue?: (value: any) => JSX.Element;
  IconComponent?: React.ElementType;
  selectOptions?: any[];
  orientation?: "horizontal" | "vertical";
}

export default function FormInputControl({
  onChange,
  placeholder,
  type,
  className,
  name,
  label,
  lableRender,
  customeLabelStyle,
  variant,
  onBlur,
  errMessage = "",
  value,
  formControlStyle = {},
  renderValue,
  selectOptions,
  IconComponent,
  orientation = "vertical",
}: FormInputControlProps) {
  const error = errMessage.length > 0 && (
    <div className="text-red-500 text-start px-2 mt-1 italic text-xs">
      {errMessage}
    </div>
  );
  let inputEle = (
    <div className="flex flex-col w-full">
      <StyledTextField
        id={name}
        variant={variant}
        placeholder={placeholder}
        className={className}
        value={value}
        onBlur={(e) => onBlur(e.target.value)}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
    /* <StyledTextField
        id={name}
        variant={variant}
        placeholder={placeholder}
        className={className}
        value={value}
        onBlur={(e) => onBlur(e.target.value)}
        onChange={(e) => onChange(e.target.value)}
      />
      {error} */
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
          onBlur={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => onBlur(e.target.value)}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => onChange(e.target.value)}
        />
      );
      break;
    case "select":
      inputEle = (
        <div className="flex flex-col">
          <SelectInput
            value={value}
            className={className}
            onChange={onChange}
            onBlur={onBlur}
            options={selectOptions}
          />
          {error}
        </div>
      );
      break;
    case "file":
      inputEle = (
        <FileInput
          id={name}
          variant={variant}
          placeholder={placeholder}
          className={className}
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
            onBlur?.(e.target.files?.[0] || null)
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange?.(e.target.files?.[0] || null)
          }
        />
      );
      break;
    // case "checkbox": {
    //   inputEle = (
    //     <FormControl className={`w-full ${formControlClassName}`}>
    //       <label>
    //         <input
    //           type="checkbox"
    //           className={className}
    //           name={name}
    //           value={value}
    //           onChange={(e) => {
    //             const checkboxValue = e.target.value;
    //             const checked = e.target.checked;
    //             if (checked) {
    //               onChange(checkboxValue);
    //             }
    //           }}
    //         />
    //         {value}
    //       </label>
    //     </FormControl>
    //   );
    // }
    case "checkbox-group":
      inputEle = (
        <SelectCheckboxInput
          options={selectOptions}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={className}
        />
      );
      break;
    case "radio":
      inputEle = (
        <>
          {selectOptions.map((option, index) => (
            <div key={index} className={`flex items-center gap-2 ${className}`}>
              <input
                className="appearance-none w-5 h-5 border-2 border-[var(--color-blue)] checked:appearance-auto rounded-full"
                name={name}
                type="radio"
                value={option}
                onChange={(e) => onChange(e.target.value)}
                onBlur={(e) => onChange(e.target.value)}
              />
              <label>{option}</label>
            </div>
          ))}
        </>
      );
      break;

    default:
      break;
  }
  return (
    <FormControl sx={{ width: "100%", ...formControlStyle }}>
      <Grid container sx={{ width: "100%", alignItems: "center" }}>
        <Grid size={orientation === "horizontal" ? 4 : 12}>
          {lableRender ? (
            lableRender()
          ) : (
            <InputLabel sx={{ ...labelStyles, ...customeLabelStyle }}>
              {label}
            </InputLabel>
          )}
        </Grid>
        <Grid size={orientation === "horizontal" ? 8 : 12}>
          {inputEle} {error}
        </Grid>
      </Grid>
    </FormControl>
  );
  // <Box >
  //   {inputEle}
  //   {/* {error} */}
  // </Box>
  // return (
  //   <div>
  //     {/* <label htmlFor={name}>{label}</label> */}
  //     {inputEle}
  //     {/* {isError && <span className="error-message">{errors[name]}</span>} */}
  //   </div>
  // );
}
