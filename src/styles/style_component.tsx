import { TextField, Theme } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import styled from "styled-components";

export const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    width: "100%", // w-full
    // border: "1px solid #e5e7eb", // border-gray-200
    transition: "all 0.2s", // transition-all duration-200
    // borderRadius: "1rem", // rounded-2xl
    fontSize: "12px", // default: text-sm
    "@media (min-width: 600px)": {
      fontSize: "14px", // sm
    },
    "@media (min-width: 900px)": {
      fontSize: "15px", // md
    },
    "@media (min-width: 1200px)": {
      fontSize: "16px", // lg
    },
  },
  "& .MuiInputBase-input": {
    padding: "0.5rem 1rem", // px-4 py-2
  },
});
export const customTheme = (outerTheme: Theme) => {
  return createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "1rem", // rounded-2xl
          },
        },
      },
    },
  });
};

export const titleStyles = {
  fontWeight: 700,
  className: "uppercase text-[var(--color-blue)]",
  sx: {
    fontSize: {
      xs: "20px",
      sm: "22px",
      md: "24px",
      lg: "26px",
    },
  },
};

export const labelStyles = {
  // không mat chu
  whiteSpace: "nowrap", // đúng là "nowrap", không phải "no-wrap"
  overflow: "visible",
  position: "static",
  textAlign: "left",
  transform: "scale(1)",
  fontSize: {
    xs: "10px",
    sm: "12px",
    md: "14px",
    lg: "16px",
  },
};
