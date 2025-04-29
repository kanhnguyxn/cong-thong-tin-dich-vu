"use client";

import React from "react";
import { FormControl, InputLabel } from "@mui/material";
import { StyledTextField, labelStyles } from "@styles/style_component";
import PasswordInput from "./input/PasswordInput";
import SelectCheckboxInput from "./input/SelectCheckBox";
import SelectInput from "./input/selectInput";

type TextFieldVariant = "filled" | "outlined" | "standard";

interface FormInputControlProps {
  // Define the type of field based on your schema
  onChange: (value: string | any[]) => void;
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
}: FormInputControlProps) {
  const error = errMessage.length > 0 && (
    <div className="text-red-500 text-start px-2 mt-1 italic text-xs">
      {errMessage}
    </div>
  );

  let inputEle = (
    <FormControl sx={{ width: "100%", ...formControlStyle }}>
      {lableRender ? (
        lableRender()
      ) : (
        <InputLabel sx={{ ...labelStyles, ...customeLabelStyle }}>
          {label}
        </InputLabel>
      )}
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
        {error}
      </div>
      {/* <StyledTextField
        id={name}
        variant={variant}
        placeholder={placeholder}
        className={className}
        value={value}
        onBlur={(e) => onBlur(e.target.value)}
        onChange={(e) => onChange(e.target.value)}
      />
      {error} */}
    </FormControl>
  );

  switch (type) {
    case "password":
      inputEle = (
        <>
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
          {error}
        </>
      );
      break;
    case "select":
      inputEle = (
        <FormControl sx={{ width: "100%", ...formControlStyle }}>
          {lableRender ? (
            lableRender()
          ) : (
            <InputLabel sx={{ ...labelStyles, ...customeLabelStyle }}>
              {label}
            </InputLabel>
          )}
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
        </FormControl>
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
        <>
          <FormControl sx={{ width: "100%", ...formControlStyle }}>
            {lableRender ? (
              lableRender()
            ) : (
              <InputLabel sx={{ ...labelStyles, ...customeLabelStyle }}>
                {label}
              </InputLabel>
            )}
            <SelectCheckboxInput
              options={selectOptions}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              className={className}
            />
          </FormControl>
          {error}
        </>
      );
      break;
    case "radio":
      inputEle = (
        <>
          <FormControl sx={{ width: "100%", ...formControlStyle }}>
            {lableRender ? (
              lableRender()
            ) : (
              <InputLabel sx={{ ...labelStyles, ...customeLabelStyle }}>
                {label}
              </InputLabel>
            )}
            {selectOptions.map((option, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 ${className}`}
              >
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
          </FormControl>
          {error}
        </>
      );
      break;

    default:
      break;
  }
  return <>{inputEle}</>;
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
