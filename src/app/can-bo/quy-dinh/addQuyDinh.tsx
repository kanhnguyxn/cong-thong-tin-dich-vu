import CustomButton from "@components/button";

import { Container } from "@components/Container";
import FormMui from "@components/form/Form";
import { Box, Typography } from "@mui/material";
import { titleStyles } from "@styles/style_component";

export default function AddQuyDinh() {
  const buttons: ButtonFormItem[] = [
    {
      label: "Thêm",
      type: "submit",
      variants: "contained",
      size: "large",
      sx: {
        backgroundColor: "var(--color-blue)",
        width: "40%",
      },
    },
    {
      label: "Hủy",
      type: "button",
      variants: "contained",
      size: "large",
      sx: {
        backgroundColor: "var(--color-blue)",
        width: "40%",
      },
      onClick: () => {
        // Logic to close the form or reset fields
      },
    },
  ];

  const inputSchema = [
    {
      name: "soKyHieu",
      type: "text",
      label: "Số ký hiệu",
      required: true,
      placeholder: "Nhập số ký hiệu",
      customeLabelStyle: { color: "black", padding: "0px 0px 4px 4px" },
    },
    {
      name: "tenQuyDinh",
      type: "text",
      label: "Tên quy định",
      required: true,
      placeholder: "Nhập tên quy định",
      customeLabelStyle: { color: "black", padding: "0px 0px 4px 4px" },
    },
    {
      name: "noiBanHanh",
      type: "text",
      label: "Nơi ban hành",
      required: true,
      placeholder: "Nhập nơi ban hành",
      customeLabelStyle: { color: "black", padding: "0px 0px 4px 4px" },
    },
    {
      name: "ngayBanHanh",
      type: "date",
      label: "Ngày ban hành",
      required: true,
      customeLabelStyle: { color: "black", padding: "0px 0px 4px 4px" },
    },
    {
      name: "ngayCoHieuLuc",
      type: "date",
      label: "Ngày có hiệu lực",
      required: true,
      customeLabelStyle: { color: "black", padding: "0px 0px 4px 4px" },
    },
    {
      name: "hieuLuc",
      type: "select",
      label: "Hiệu lực",
      required: false,
      selectOptions: ["Có", "Không"],
      customeLabelStyle: { color: "black", padding: "0px 0px 4px 4px" },
      className: "rounded-none !mb-0 !px-2 !py-2",
    },
  ];
  const handleSubmit = (data) => {
    // Logic to handle form submission
    console.log("Form submitted with data:", data);
    // Reset form or close modal after submission
  };
  return (
    <div className="fixed top-0 left-0 min-w-full min-h-full bg-[var(--color-gray-light)] z-50 flex justify-center items-center">
      <Container
        children={
          <>
            <Box className="flex flex-col">
              <Typography variant="h6" {...titleStyles} sx={{ color: "black" }}>
                {"Thêm quy định"}
              </Typography>
              <FormMui
                inputSchema={inputSchema}
                onSubmit={handleSubmit}
                className="w-full max-w-sm flex flex-col gap-2 md:gap-3"
                buttons={buttons}
                buttonClassName="flex flex-row justify-around"
              />
            </Box>
          </>
        }
      />
    </div>
  );
}
