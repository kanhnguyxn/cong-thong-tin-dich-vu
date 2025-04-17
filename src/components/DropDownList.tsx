"use client";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

interface DropDownListProps {
  options: string[];
  iconComponent?: React.ReactNode;
  label?: string;
  dropDownStyle?: {};
  classNameOption?: string;
  name?: string;
  onClickOption?: (value: string) => void;
  onClickIcon?: (value: string) => void;
}

export default function DropDownList({
  options,
  iconComponent,
  label,
  dropDownStyle,
  classNameOption,
  name,
  onClickOption,
  onClickIcon,
}: DropDownListProps) {
  const [value, setValue] = React.useState<string | null>(name);
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
    if (onClickIcon && open) {
      setValue(name);
      onClickIcon(value);
    }
  };

  const onClick = (value: string) => {
    setValue(value);
    if (onClickOption) {
      onClickOption(value);
    }
  };
  return (
    <div className="bg-white relative">
      {label && <p className="text-black">{label}</p>}
      <Box
        sx={{
          
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid",
          ...dropDownStyle
        }}
      >
        <p>{value}</p>
        <IconButton onClick={handleClick}>{iconComponent}</IconButton>
      </Box>
      {open && (
        <Box 
        sx={{
          display:'flex',
          flexDirection:'column',
          border: "1px solid",
          position: "absolute",
          width: "100%",
          backgroundColor: "white",
          marginTop:'2px'

        }}>
          {options.map((option, index) => (
            <p className={classNameOption} key={index} onClick={() => onClick(option)}>
              {option}
            </p>
          ))}
        </Box>
      )}
    </div>
  );
}
