import { Box, IconButton } from "@mui/material";
import { useState, useRef, useEffect } from "react";

interface DropDownListsProps {
  name: string; // Tên hiển thị cho dropdown (không dùng trực tiếp ở đây)
  options: string[]; // Danh sách tùy chọn để hiển thị
  value: string; // Giá trị được chọn hiện tại
  button: JSX.Element; // Icon/Component dùng làm nút mở dropdown
  dropDownStyle?: {}; // Style tùy chỉnh cho box chính
  optionsStyle?: string; // Class style cho từng option
  childrenStyle?: string; // Class style cho giá trị hiển thị hiện tại
  onChange: (value: string) => void; // Callback khi người dùng chọn option
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
  const [open, setOpen] = useState(false); // Kiểm soát trạng thái dropdown mở/đóng
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref để xử lý click ngoài

  const toggleDropdown = () => {
    setOpen((prev) => !prev); // Đảo ngược trạng thái mở/đóng
  };

  const handleSelect = (val: string) => {
    onChange(val); // Gọi callback truyền về giá trị đã chọn
    setOpen(false); // Đóng dropdown sau khi chọn
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false); // Đóng nếu click bên ngoài vùng dropdown
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
          ...dropDownStyle,
        }}
      >
        <span className={childrenStyle}>
          {value && value !== name ? value : name}
        </span>
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
            border: "1px solid var(--color-blue)",
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
