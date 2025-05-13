import { Box, Icon, Modal } from "@mui/material";
import { useState } from "react";

interface NotificationProps {
  success: boolean;
  message?: {
    success: string;
    fail: string;
  };
  onClose?: () => void;
  icon?: {
    success: JSX.Element;
    fail: JSX.Element;
  };
}

export const Notification = ({
  success,
  message,
  onClose,
  icon,
}: NotificationProps) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    onClose?.();
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
          {success ? message?.success : message?.fail}
        </span>
        <Box
          sx={{
            mt: 2,
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
          {success ? icon?.success : icon?.fail}
        </Box>
      </Box>
    </Modal>
  );
};
