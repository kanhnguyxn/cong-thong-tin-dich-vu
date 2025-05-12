"use client";
import { useState, useEffect } from "react";
import CustomButton from "./button";
import { Box, Icon, Modal, Typography } from "@mui/material";
import { titleStyles } from "@styles/style_component";
import ICONS from "./icons";
import { Container } from "./Container";

interface DeleteButtonProps {
  title?: string;
  data?: any;
}

export default function DeleteButton({
  title,
  data,
  ...props
}: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Gọi API xóa dữ liệu ở đây
      // await deleteData(data);
      console.log("Xóa dữ liệu:", data);
      setSuccess(true);
    } catch (error) {
      console.error("Lỗi khi xóa dữ liệu:", error);
      setSuccess(false);
    } finally {
      setLoading(false);
      setOpen(false);
    }
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
        sx={{ backgroundColor: "var(--color-blue)" }}
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
      {success !== null && <Notification success={success} />}
    </>
  );
}

interface NotificationProps {
  success: boolean;
}

const Notification = ({ success }: NotificationProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (success !== null) {
      setOpen(true);
    }
  }, [success]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: "10px",
          width: "fit-content",
          padding: "20px 20px 10px 20px",
          fontSize: {
            xs: "20px",
            sm: "22px",
            md: "24px",
          },
        }}
      >
        <span className="text-center uppercase font-bold">
          {success ? "Xóa thành công" : "Xóa thất bại"}
        </span>
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
          {success ? ICONS.SUCCESS : ICONS.FAIL}
        </Icon>
      </Box>
    </Modal>
  );
};
