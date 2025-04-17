"use client";
import DropDownList from "@components/DropDownList";
import ICONS from "@components/icons";


export default function DropDownLists(name: string) {
  const options = [
    "Văn bản Quy phạm pháp luật",
    "Văn bản Quy phạm nội bộ do DHDN ban hành",
    "Văn bản Quy phạm nội bộ do DHKT ban hành",
  ];
  const handleClickOption = (value: string) => {
    console.log(value);
  };
  const handleClickIcon = (name: string) => {
    console.log(name);
  };

  const classNameOption =
    "w-full hover:bg-[var(--color-gray-stroke)] hover:border-y  hover:border-black cursor-pointer p-1";

  const dropDownStyle = {
    border: "1px solid var(--color-blue)",
    paddingLeft: "3px",
  };

  return (
    <DropDownList
      options={options}
      iconComponent={ICONS.SELECT}
      name={name}
      dropDownStyle={dropDownStyle}
      classNameOption={classNameOption}
      onClickOption={handleClickOption}
      onClickIcon={handleClickIcon}
    />
  );
}
