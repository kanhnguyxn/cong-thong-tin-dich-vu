"use client";

import { useState } from "react";

import { StyledTextField } from "@styles/style_component";
import ICONS from "@components/icons";
import { InputAdornment } from "@mui/material";

export default function PasswordInput({ ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <StyledTextField
      type={showPassword ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment
              component={"button"}
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              position="end"
            >
              {showPassword ? ICONS.VISUALITY_ON : ICONS.VISUALITY_OFF}
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
}
