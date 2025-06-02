import { useMemo, useState } from "react";

import CustomButton from "@components/button";
import { quyDinhForm } from "@constants/form";
import { Container } from "@components/Container";
import FormMui from "@components/form/Form";
import { Box, Typography } from "@mui/material";
import { titleStyles } from "@styles/style_component";

export default function AddQuyDinh() {
  const [open, setOpen] = useState(false);
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
        setOpen(false);
        // Logic to close the form or reset fields
      },
    },
  ];

  const inputSchema = useMemo(() => {
    return quyDinhForm;
  });
  const handleSubmit = (data) => {
    // Logic to handle form submission
    console.log("Form submitted with data:", data);
    // Reset form or close modal after submission
  };
  return (
    <>
      <CustomButton
        label="Thêm"
        type="button"
        variants="contained"
        size="large"
        onClick={() => {
          setOpen(true);
          // Logic to open the form or modal
        }}
        sx={{ backgroundColor: "var(--color-blue)", width: "100%" }}
      />
      {open && (
        <div className="fixed inset-0 z-50 bg-[var(--color-gray-light)] w-full">
          <Container
            className="w-[90%]"
            children={
              <>
                <Box className="flex flex-col">
                  <Typography variant="h6" {...titleStyles} sx={{ color: "black" }}>
                    {"Thêm quy định"}
                  </Typography>
                  <FormMui
                    inputSchema={inputSchema}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-2 md:gap-3"
                    buttons={buttons}
                    buttonClassName="flex flex-row justify-around"
                  />
                </Box>
              </>
            }
          />
        </div>
      )}
    </>
  );
}
