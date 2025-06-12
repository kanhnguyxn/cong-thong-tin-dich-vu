"use client";
import React, { useEffect, useState, useRef } from "react";

interface SelectCheckboxInputProps {
  value?: any[]; // selected values
  onChange: (value: any[]) => void; // function to handle change
  onBlur?: (value: any[]) => void; // function to handle blur event
  options?: any[]; // options to select from
  className?: string; // class name for styling
}

export default function SelectCheckboxInput({
  value,
  onChange,
  onBlur,
  options = [],
  className = "",
  ...props
}: SelectCheckboxInputProps) {
  const [selectedValues, setSelectedValues] = useState(value || []);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    onChange(selectedValues);
  }, [selectedValues]);

  return (
    <div
      className="w-full"
      ref={containerRef}
      tabIndex={-1}
      onBlur={() => {
        if (onBlur) onBlur(selectedValues);
      }}
    >
      {options.map((option: any, index: number) => {
        // Xử lý cả trường hợp option là object {display, value} và string
        const displayText =
          option?.display || option?.value || option || `Option ${index + 1}`;
        const optionValue = option?.value !== undefined ? option.value : option;

        return (
          <div key={index} className={`flex items-center gap-2 ${className}`}>
            <input
              className="appearance-none w-5 h-5 border-2 border-[var(--color-blue)] rounded-md checked:appearance-auto"
              type="checkbox"
              value={optionValue}
              checked={selectedValues.includes(optionValue)}
              onChange={(e) => {
                const checkboxValue = e.target.value;
                const checked = e.target.checked;
                if (checked) {
                  setSelectedValues((prev: any) => [...prev, checkboxValue]);
                } else {
                  setSelectedValues((prev) =>
                    prev.filter((item: any) => item !== checkboxValue)
                  );
                }
              }}
              {...props}
            />
            <label>{displayText}</label>
          </div>
        );
      })}
    </div>
  );
}
