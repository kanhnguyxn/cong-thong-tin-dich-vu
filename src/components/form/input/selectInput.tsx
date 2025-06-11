import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

interface SelectInputProps {
  name: string; // name of the select input
  value?: any; // có du lieu san hoac mac dich
  onChange: (value: any) => void; // function to handle change
  options: {
    display: string; // label to display
    value: any;
  }[]; // options to select from
  className?: string; // class name for styling
  onBlur?: (value: any) => void;
  label?: string;
  placeholder?: string; // function to handle blur event
  sx?: {}; // additional styles
}

export default function SelectInput({
  value,
  onChange,
  onBlur,
  options = [],
  className = "",
  name,
  label,
  placeholder = "---Chọn---",
  sx = {},
  ...props
}: SelectInputProps) {
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    // Khi component được mount hoặc giá trị value thay đổi, cập nhật selectedValue
    if (!options) {
      setSelectedValue("");
      return;
    }
    const selectedOption = options.find((option) => option.value === value);
    if (!selectedOption) {
      setSelectedValue("");
      return;
    }

    setSelectedValue(selectedOption.value);
  }, [value]);

  const handleSelectChange = (e: SelectChangeEvent) => {
    const selectedValue = e.target.value;
    // Handle the default "---Chọn---" option
    onChange && onChange(selectedValue);
    setSelectedValue(selectedValue);
  };

  return (
    <Select
      // variant="standard"
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={selectedValue}
      label={label}
      displayEmpty={true}
      onChange={handleSelectChange}
      className={`w-full ${className}`}
      onBlur={(e) => {
        if (onBlur) {
          onBlur(e.target.value);
        }
      }}
      inputProps={{ size: "small" }}
      sx={sx}
    >
      <MenuItem value="" disabled>
        <span className="text-gray-400">{placeholder}</span>
      </MenuItem>
      {options &&
        options.length > 0 &&
        options.map((option, index) => (
          <MenuItem key={`${name}-radio-${index}`} value={option.value}>
            {option.display}
          </MenuItem>
        ))}
    </Select>
  );
}
