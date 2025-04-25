"use client";
import FormMui from "@components/form/Form";

export default function LoaiDonForm() {
  const inputSchema = [
    {
      name: "loaiDon",
      label: "Loại đơn:",
      type: "select",
      selectOptions: [
        "Đơn xin nghỉ học",
        "Đơn xin bảo lưu",
        "Đơn xin thôi học",
        "Đơn đăng ký xác nhận sinh viên",
      ],
      required: true,
      formControlStyle: {
        display: "flex ",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
      },
      customeLabelStyle: {
        color: "black",
        display: "contents",
        fontWeight: 500,
      },
      className: "rounded-none mb-0 !px-2 !py-2 ",
    },
  ];
  const buttons = [
    {
      label: "Tiếp tục",
      type: "submit",
      variants: "contained",
      size: "large",
      sx: {
        backgroundColor: "var(--color-blue)",
        color: "white",
        width: "40%",
      },
    },
  ];
  return (
    <FormMui
      className="flex flex-col gap-4 justify-center items-center md:w-[50%] lg:w-[30%]"
      inputSchema={inputSchema}
      onSubmit={(formData) => {
        console.log("formData", formData);
      }}
      buttons={buttons}
      buttonClassName="flex flex-col w-full items-center "
    ></FormMui>
  );
}
