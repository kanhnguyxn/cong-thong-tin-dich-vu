import { useEffect, useState } from "react";

interface SelectInputProps {
  value?: string; // có du lieu san hoac mac dich
  onChange: (value: any) => void; // function to handle change
  options?: any[]; // options to select from
  className?: string; // class name for styling
  onBlur?: (value: any) => void; // function to handle blur event
}

export default function SelectInput({
  value,
  onChange,
  onBlur,
  options = [],
  className = "",
  ...props
}: SelectInputProps) {
  const [selectedValue, setSelectedValue] = useState(value || "");
  // console.log("value", value);

  useEffect(() => {
    // Khi giá trị được chọn thay đổi, gọi hàm onChange với giá trị mới
    // console.log("selectedValues", selectedValue);
    onChange(selectedValue);
  }, [selectedValue]);
  return (
    <select
      value={selectedValue}
      onChange={(e) => {
        setSelectedValue(e.target.value);
      }}
      className={className}
      onBlur={(e) => {
        if (onBlur) {
          onBlur(e.target.value);
        }
      }}
      {...props}
    >
      <option>---Chọn--- </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
