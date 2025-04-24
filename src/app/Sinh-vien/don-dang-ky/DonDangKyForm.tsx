"use client";
import FormMui from "@components/form/Form";

export default function DonDangKyForm() {
  const inputSchema = [
    {
      name: "field1",
      label: "Học kỳ",
      type: "checkbox-group",
      selectOptions: ["Học kỳ 1", "Học kỳ 2", "Toàn khóa"],
    },
  ];

  return (
    <FormMui
      inputSchema={inputSchema}
      onSubmit={(formData) => {
        // console.log("formData", formData);
      }}
      buttons={[{ label: "Đăng Ký", type: "submit" }]}
      //   onChange={handleChange}
    ></FormMui>
  );
}
