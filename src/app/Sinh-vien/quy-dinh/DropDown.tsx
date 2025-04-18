'use client';
import { Box } from "@mui/material";
import DropDownLists from "@components/DropDownList";
import { useState } from "react";
import ICONS from "@components/icons";

interface DropDownProps {
  onSelectionsChange?: ( department: string, option: string ) => void;
}

// Danh sách phòng ban và options cố định
const departments = [
  "Đào tạo",
  "Công tác sinh viên",
  "Kế Hoạch - Tài Chính",
  "Khảo thí & ĐBCLGDH",
];

const options = [
  "Văn bản Quy phạm pháp luật",
  "Văn bản Quy phạm nội bộ do DHDN ban hành",
  "Văn bản Quy phạm nội bộ do DHKT ban hành",
];

// Style cố định
const dropDownStyle = {
  border: "1px solid var(--color-blue)",
  paddingLeft: "3px",
  fontSize:{
    xs:'14px',
    sm:'16px',
    md:'18px'
  },
  textAlign: "left",
};

const classNameOption =
  "w-full hover:bg-[var(--color-gray-stroke)] hover:border-y hover:border-black cursor-pointer p-1 text-left";

const departmentStyle = "font-bold text-black pl-2 ";
const optionsStyle = "text-[var(--color-blue)] pl-2";

export default function DropDown({ onSelectionsChange }: DropDownProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([...departments]);

  const handleSelect = (index: number, value: string) => {
    const updated = departments.map((item, i) => (i === index ? value : item));
    setSelectedValues(updated);
    
    if (onSelectionsChange) {
      onSelectionsChange(departments[index], value);
    }
  };

  return (
    <Box>
      {departments.map((department, index) => {
        const isDefault = selectedValues[index] === department;
        const currentChildrenStyle = isDefault ? departmentStyle : optionsStyle;

        return (
          <DropDownLists
            key={index}
            name={department}
            options={options}
            value={selectedValues[index]}
            onChange={(value) => handleSelect(index, value)}
            button={ICONS.SELECT}
            dropDownStyle={dropDownStyle}
            optionsStyle={classNameOption}
            childrenStyle={currentChildrenStyle}
          />
        );
      })}
    </Box>
  );
}
