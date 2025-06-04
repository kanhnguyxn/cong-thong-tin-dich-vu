import { useState } from "react";
import { Box, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@redux/hook";
import { fetchBieuMau } from "@redux/features/bieuMauSlice";

import { addBieuMau } from "@apis/canBo/addBieuMau";

import CustomButton from "@components/button";
import { Container } from "@components/Container";
import FormMui from "@components/form/Form";
import ICONS from "@components/icons";
import { Notification } from "@components/Notification";

import { titleStyles } from "@styles/style_component";

export default function AddButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    const response = await addBieuMau({
      tenBM: formData.tenBM,
      lienKet: formData.lienKet,
    });

    if (response.status) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
    setOpen(false);
    setLoading(false);
  };

  const buttons: ButtonFormItem[] = [
    {
      label: "Xác nhận",
      type: "submit",
      variants: "contained",
      size: "large",
      sx: {
        backgroundColor: "var(--color-blue)",
        width: "40%",
      },
      loading: loading,
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
      },
    },
  ];

  const inputSchema = [
    {
      name: "uploadFile",
      type: "file",
      label: "Chọn biểu mẫu",
      required: true,
      customeLabelStyle: { color: "black", padding: "0px 0px 4px 4px" },
    },
  ];

  return (
    <>
      <CustomButton
        label="Thêm"
        type="button"
        variants="contained"
        size="large"
        onClick={() => {
          setOpen(true);
        }}
        sx={{ backgroundColor: "var(--color-blue)", width: "100%" }}
      />
      {open && (
        <div className="fixed top-0 left-0 min-w-full min-h-full bg-[var(--color-gray-light)] z-50 flex justify-center items-center">
          <Container
            children={
              <>
                <Box className="flex flex-col">
                  <Typography
                    variant="h6"
                    {...titleStyles}
                    sx={{ color: "black" }}
                  >
                    {"Thêm biểu mẫu"}
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
      )}
      {success !== null && (
        <Notification
          success={success}
          message={{
            success: "Thêm biểu mẫu thành công",
            fail: "Thêm biểu mẫu thất bại",
          }}
          icon={{
            success: ICONS.SUCCESS,
            fail: ICONS.FAIL,
          }}
          onClose={() => {
            if (success) {
              dispatch(fetchBieuMau()); // Assuming you want to refresh the data after adding
            }
            setSuccess(null);
          }}
        />
      )}
    </>
  );
}
