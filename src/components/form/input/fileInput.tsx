"use client";
import { StyledTextField } from "@styles/style_component";

export default function FileInput({ ...props }) {
  return (
    <StyledTextField
      type="file"
      inputProps={{
        accept: ".pdf, .doc, .docx, .ppt, .pptx",
      }}
      {...props}
    />
  );
}
