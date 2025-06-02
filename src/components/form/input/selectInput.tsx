import { useEffect, useState } from "react";

interface SelectInputProps {
  value?: any; // có du lieu san hoac mac dich
  onChange: (value: any) => void; // function to handle change
  options?: [
    {
      display: string; // label to display
      value: any;
    } // value to use in the select
  ]; // options to select from
  className?: string; // class name for styling
  onBlur?: (value: any) => void; // function to handle blur event
}

export default function SelectInput({ value, onChange, onBlur, options, className = "", ...props }: SelectInputProps) {
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

    setSelectedValue(selectedOption.display);
  }, [value]);

  return (
    <select
      value={selectedValue}
      onChange={(e) => {
        setSelectedValue(e.target.value);
        const selectedOption = options?.find((option) => option.display === e.target.value);
        onChange(selectedOption.value);
      }}
      className={className}
      onBlur={(e) => {
        if (onBlur) {
          onBlur(e.target.value);
        }
      }}
      {...props}
    >
      <option value="">---Chọn---</option>
      {options.map((option, index) => (
        <option key={index} value={option.display}>
          {option.display}
        </option>
      ))}
    </select>
  );
}
