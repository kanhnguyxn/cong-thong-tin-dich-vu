"use client";

import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import DropDownLists from "@components/DropDownList";
import ICONS from "@components/icons";
import { useAppSelector } from "@redux/hook";

interface DropDownProps {
  onSelectionsChange?: (maPB: string, option: string) => void;
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
  // luu trữ giá trị đã chọn cho từng phòng ban
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {}
  );
  const { quyDinh, loading } = useAppSelector((state) => state.quyDinh);

  const departments = useMemo(() => {
    if (loading || !quyDinh || !Array.isArray(quyDinh)) return [];
    const uniqueMap = new Map();
    for (const item of quyDinh) {
      if (!uniqueMap.has(item.maPB)) {
        uniqueMap.set(item.maPB, item.tenPB);
        // uniqueMap.set("Dao Tao", "Dao Tao");
      }
    }
    return Array.from(uniqueMap.entries()).map(([maPB, tenPB]) => ({
      maPB,
      tenPB,
    }));
  }, [quyDinh, loading]);

  const handleSelectChange = (maPB: string, newValue: string) => {
    setSelectedValues({ [maPB]: newValue });

    if (onSelectionsChange) {
      onSelectionsChange(maPB, newValue);
    }
  };

  return (
    <Box>
      {departments.map((dept) => {
        // Lấy ra giá trị mà người dùng đã chọn cho maPB hiện tại từ state selectedValues
        const selectedValue = selectedValues[dept.maPB] || "";
        const textStyle =
          selectedValue && selectedValue !== dept.tenPB
            ? OPTION_TEXT_STYLE
            : DEPT_TEXT_STYLE;

        return (
          <DropDownLists
            key={dept.maPB}
            name={dept.tenPB}
            options={DROPDOWN_OPTIONS}
            value={selectedValue}
            onChange={(value) => handleSelectChange(dept.maPB, value)}
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
