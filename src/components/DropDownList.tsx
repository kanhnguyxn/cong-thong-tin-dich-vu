import { Box, IconButton } from "@mui/material";
import { useState, useRef, useEffect } from "react";

interface DropDownListsProps {
  name: string;
  options: string[];
  value: string;
  button: JSX.Element;
  dropDownStyle?:{};
  optionsStyle?:string;
  childrenStyle?:string;
  onChange: (value: string) => void;
}

export default function DropDownLists({
  name,
  options,
  value,
  onChange,
  button,
  dropDownStyle,
  optionsStyle,
  childrenStyle,
}: DropDownListsProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {

    setOpen((prev) => !prev);
  };

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative bg-white w-full">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          ...dropDownStyle
        }}
      >
        <span className={childrenStyle}>{value}</span>
        <IconButton size="small" onClick={toggleDropdown}>
         {button}
        </IconButton>
      </Box>

      {open && (
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "white",
            zIndex: 10,
            width: "100%",
         
          }}
        >
          {options.map((opt, idx) => (
            <p
              key={idx}
              onClick={() => handleSelect(opt)}
              className={optionsStyle}
            >
              {opt}
            </p>
          ))}
        </Box>
      )}
    </div>
  );
}
