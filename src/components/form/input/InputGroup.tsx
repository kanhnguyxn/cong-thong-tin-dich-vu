"use client";

import { FormControl, Grid } from "@mui/material";
import { StyledTextField } from "@styles/style_component";
import { useEffect, useRef, useState } from "react";
import SelectInput from "./selectInput";

interface InputGroupProps {
  onChange: (values: any) => void; // Function to handle changes in input values
  inputSchema?: any[];
  onBlur?: (values: any) => void; // Function to handle blur event
}

export default function InputGroup({ onChange, inputSchema, onBlur }) {
  const [values, setValues] = useState({});
  const wrapperRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (isFocused && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        // Execute your outside click logic here
        onBlur && onBlur(values);
        setIsFocused(false);
        // If you want to expose this functionality:
        // if (onClickOutside) onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFocused]);

  // Add focus handlers to each input in the render section
  const handleFocusIn = () => {
    setIsFocused(true);
  };
  useEffect(() => {
    // Khi giá trị thay đổi, gọi hàm onChange với giá trị mới
    onChange(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <Grid
      onFocus={handleFocusIn}
      ref={wrapperRef}
      alignItems={"stretch"}
      container
      sx={{ width: "100%", alignItems: "center" }}
      spacing={2}
    >
      {inputSchema.map((input, index) => (
        <Grid key={`inputgroup-${input.name}-${index}`} size={input.size}>
          <FormControl sx={{ width: "100%" }}>
            {input.type === "text" && (
              <StyledTextField
                name={input.name}
                placeholder={input.placeholder}
                className={input.className}
                value={values[input.name] || ""}
                multiline={input.rows ? true : false}
                rows={input.rows}
                onChange={(e) => setValues((prev) => ({ ...prev, [input.name]: e.target.value }))}
              />
            )}
            {input.type === "select" && (
              <SelectInput
                name={input.name}
                placeholder={input.placeholder}
                value={values[input.name] || ""}
                className={input.className}
                onChange={(data) => {
                  setValues((prev) => ({ ...prev, [input.name]: data }));
                }}
                options={input.selectOptions}
              />
            )}
          </FormControl>
        </Grid>
      ))}
    </Grid>
  );
}
