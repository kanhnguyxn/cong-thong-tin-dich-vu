"use client";
import { useState } from "react";
import CustomButton from "./button";
import { Icon, Typography } from "@mui/material";
import { titleStyles } from "@styles/style_component";
import { Notification } from "./Notification";
import ICONS from "./icons";
import { Container } from "./Container";

interface DeleteButtonProps {
  title?: string;
  handleDelete?: () => Promise<
    { status: boolean; message: string } | undefined
  >;
  successEffect?: () => void;
  failEffect?: () => void;
  disable?: boolean;
}

export default function DeleteButton({
  title,
  handleDelete,
  successEffect,
  failEffect,
  disable = false,

  ...props
}: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await handleDelete?.();
    if (response?.status) {
      setSuccess(true);
      // setOpen(true);
    } else {
      setSuccess(false);
    }
    setLoading(false);
    setOpen(true);
  };

  const buttons: ButtonFormItem[] = [
    {
      label: "Xác nhận",
      type: "submit",
      variants: "contained",
      size: "large",
      loading: loading,
      sx: {
        backgroundColor: "var(--color-blue)",
        width: "40%",
      },
      onClick: () => {
        handleSubmit();
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
      },
    },
  ];

  return (
    <>
      <CustomButton
        label="Xóa"
        type="button"
        variants="contained"
        size="large"
        onClick={() => {
          setOpen(true);
        }}
        sx={{ backgroundColor: "var(--color-blue)", width: "100%" }}
        disabled={disable}
      />
      {open && (
        <div className="fixed top-0 left-0 min-w-full min-h-full bg-[var(--color-gray-light)] z-50 flex justify-center items-center">
          <Container className="flex flex-col justify-center items-center w-[80%] mx-2 md:w-[35%] xl:w-[25%] lg:w-[30%]">
            <Icon
              sx={{
                width: {
                  xs: "25px",
                  sm: "30px",
                  md: "40px",
                },
                height: {
                  xs: "25px",
                  sm: "30px",
                  md: "40px",
                },
              }}
            >
              {ICONS.WARNING}
            </Icon>
            <Typography
              variant="h6"
              {...titleStyles}
              sx={{
                color: "black",
                margin: {
                  xs: "8px 0px",
                  md: "12px 0px",
                },
              }}
            >
              {title}
            </Typography>
            <div className="flex flex-row justify-around w-full">
              {buttons.map((button, index) => (
                <CustomButton
                  key={index}
                  label={button.label}
                  type={button.type}
                  variants={button.variants}
                  size={button.size}
                  onClick={button.onClick}
                  sx={button.sx}
                />
              ))}
            </div>
          </Container>
        </div>
      )}
      {success !== null && (
        <Notification
          success={success}
          message={{
            success: "Xóa thành công",
            fail: "Xóa thất bại",
          }}
          icon={{
            success: ICONS.SUCCESS,
            fail: ICONS.FAIL,
          }}
          onClose={() => {
            if (success) {
              successEffect && successEffect?.();
            } else {
              failEffect && failEffect?.();
            }
            setSuccess(null);
          }}
        />
      )}
    </>
  );
}
