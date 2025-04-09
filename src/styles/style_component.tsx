import { TextField } from "@mui/material";
import styled from "styled-components";

export const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    width: "100%" /* w-full */,
    border: "1px solid #e5e7eb" /* border (default Tailwind border color) */,
    // outline: "none", /* outline-none */
    transition: "all 0.2s" /* transition-all duration-200 */,
    fontSize: "0.875rem",
    borderRadius: "1rem", //* text-sm */
  },
  "& .MuiInputBase-input": {
    padding: "0.5rem 1rem" /* px-4 py-2 */,
  },
});
