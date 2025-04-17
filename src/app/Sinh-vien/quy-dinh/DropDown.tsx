'use client';
import { Box } from "@mui/material";
import DropDownLists from "@components/DropDownList";
import { useState } from "react";
import ICONS from "@components/icons";

type SelectedItem = {
  department: string;
  option: string | null;
};

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
};

const classNameOption =
  "w-full hover:bg-[var(--color-gray-stroke)] hover:border-y hover:border-black cursor-pointer p-1 text-[var(--color-blue)] p-2";

const departmentStyle = "font-bold text-black pl-2";
const optionsStyle = "text-[var(--color-blue)] pl-2";

export default function Navbar() {
  const [selectedValues, setSelectedValues] = useState<SelectedItem[]>(
    departments.map((dept) => ({
      department: dept,
      option: null, 
    }))
  );

  const handleSelect = (index: number, newOption: string) => {
    const updated = [...selectedValues];
    updated[index].option = newOption;
    setSelectedValues(updated);
    console.log("Đã chọn:", updated); // In ra để kiểm tra
  };

  return (
    <Box>
      {departments.map((department, index) => {
        const isDefault = selectedValues[index].department === department;
        const currentChildrenStyle = isDefault ? departmentStyle : optionsStyle;

        return (
          <DropDownLists
            key={index}
            name={department}
            options={options}
            value={selectedValues[index].option || ''}
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
