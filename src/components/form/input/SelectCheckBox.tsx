"use client";
import React, { useEffect, useState } from "react";

interface SelectCheckboxInputProps {
  values?: any[]; // selected values
  onChange: (value: any[]) => void; // function to handle change
  options?: any[]; // options to select from
  className?: string; // class name for styling
}

export default function SelectCheckboxInput({
  values,
  onChange,
  options = [],
  className = "",
  ...props
}: SelectCheckboxInputProps) {
  const [selectedValues, setSelectedValues] = useState(values || []);

  useEffect(() => {
    // Khi giá trị được chọn thay đổi, gọi hàm onChange với giá trị mới
    onChange(selectedValues);
  }, [selectedValues]);

  return (
    <>
      {options.map((option: any, index: number) => (
        <div key={index} className={`flex items-center gap-2 ${className}`}>
          <input
            className="appearance-none w-5 h-5 border-2 border-[var(--color-blue)] rounded-md checked:appearance-auto"
            type="checkbox"
            value={option}
            checked={selectedValues.includes(option)}
            onChange={(e) => {
              const checkboxValue = e.target.value;
              const checked = e.target.checked;
              if (checked) {
                // Nếu được chọn → thêm vào danh sách
                setSelectedValues((prev: any) => [...prev, checkboxValue]);
              } else {
                // Nếu bỏ chọn → loại khỏi danh sách
                setSelectedValues((prev) =>
                  prev.filter((item: any) => item !== checkboxValue)
                );
              }
            }}
          ></input>
          <label key={index}>{option}</label>
        </div>
      ))}
    </>
  );
}
