"use client";

import { useState } from "react";

import { StyledTextField } from "@styles/style_component";
import ICONS from "@components/icons";
import { IconButton, InputAdornment } from "@mui/material";

export default function PasswordInput({ ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <StyledTextField
      type={showPassword ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end" sx={{ marginRight: "10px" }}>
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
                tabIndex={-1} // khong focus vao button
              >
                {showPassword ? ICONS.VISUALITY_ON : ICONS.VISUALITY_OFF}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
}
