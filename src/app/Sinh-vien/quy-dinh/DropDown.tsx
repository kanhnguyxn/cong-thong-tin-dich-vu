"use client";

import { Box } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import DropDownLists from "@components/DropDownList";
import ICONS from "@components/icons";
import { useAppSelector } from "@lib/hook";

interface DropDownProps {
  onSelectionsChange?: (department: string, option: string) => void;
}

const DROPDOWN_OPTIONS = [
  "Văn bản Quy phạm pháp luật",
  "Văn bản Quy phạm nội bộ do DHDN ban hành",
  "Văn bản Quy phạm nội bộ do DHKT ban hành",
];

const DROPDOWN_STYLE = {
  border: "1px solid var(--color-blue)",
  paddingLeft: "3px",
  fontSize: {
    xs: "14px",
    sm: "16px",
    md: "18px",
  },
  textAlign: "left",
};

const OPTION_CLASSNAME =
  "w-full hover:bg-[var(--color-gray-stroke)] hover:border-y hover:border-black cursor-pointer p-1 text-left";

const DEPT_TEXT_STYLE = "font-bold text-black pl-2";
const OPTION_TEXT_STYLE = "text-[var(--color-blue)] pl-2";

export default function DropDown({ onSelectionsChange }: DropDownProps) {
  const { quyDinh, loading } = useAppSelector((state) => state.quyDinh);

  const departments = useMemo(() => {
    if (loading || !quyDinh) return [];
    return Array.from(new Set(quyDinh.map((item) => item.maPB)));
  }, [quyDinh, loading]);

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    setSelectedValues(departments);
  }, [departments]);

  const handleSelectChange = (index: number, newValue: string) => {
    const updatedValues = [...selectedValues];
    updatedValues[index] = newValue;
    setSelectedValues(updatedValues);

    if (onSelectionsChange) {
      onSelectionsChange(departments[index], newValue);
    }
  };

  return (
    <Box>
      {departments.map((dept, index) => {
        const isDefault = selectedValues[index] === dept;
        const textStyle = isDefault ? DEPT_TEXT_STYLE : OPTION_TEXT_STYLE;

        return (
          <DropDownLists
            key={dept}
            name={dept}
            options={DROPDOWN_OPTIONS}
            value={selectedValues[index]}
            onChange={(value) => handleSelectChange(index, value)}
            button={ICONS.SELECT}
            dropDownStyle={DROPDOWN_STYLE}
            optionsStyle={OPTION_CLASSNAME}
            childrenStyle={textStyle}
          />
        );
      })}
    </Box>
  );
}
