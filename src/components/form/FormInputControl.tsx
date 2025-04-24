"use client";

import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { StyledTextField, labelStyles } from "@styles/style_component";
import PasswordInput from "./input/PasswordInput";
import SelectCheckboxInput from "./input/SelectCheckBox";

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
  sxLabel?: object;
  variant?: TextFieldVariant;
  sx?: object;
  onBlur: (value: any) => void;
  errMessage?: string;
  value?: any;
  formControlClassName?: string;
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
  sxLabel,
  variant,
  onBlur,
  errMessage = "",
  value,
  formControlClassName = "",
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
    <FormControl className={`w-full ${formControlClassName}`}>
      {lableRender ? (
        lableRender()
      ) : (
        <InputLabel sx={{ ...labelStyles, ...sxLabel }}>{label}</InputLabel>
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
        <FormControl className={`w-full ${formControlClassName}`}>
          <Select
            id={name}
            variant={variant}
            renderValue={renderValue}
            className={className}
            onChange={(e) => onChange(e.target.value)}
            displayEmpty
            IconComponent={IconComponent}
          >
            {value.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
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
        <FormControl className={`w-full ${formControlClassName}`}>
          {lableRender ? (
            lableRender()
          ) : (
            <InputLabel sx={{ ...labelStyles, ...sxLabel }}>{label}</InputLabel>
          )}
          <SelectCheckboxInput
            options={selectOptions}
            values={value}
            onChange={onChange}
          />
        </FormControl>
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
