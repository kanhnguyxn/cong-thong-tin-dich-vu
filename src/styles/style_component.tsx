import { TextField, Theme } from "@mui/material";
import styled from "styled-components";

export const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    width: "100%", // w-full
    border: "1px solid #e5e7eb", // border-gray-200
    transition: "all 0.2s", // transition-all duration-200
    borderRadius: "1rem", // rounded-2xl
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
