import ICONS from "@components/icons";
import { Box, Icon, Typography } from "@mui/material";
import { titleStyles } from "@styles/style_component";
import React from "react";

const icons = {
  warning: ICONS.WARNING,
};

export interface AlertModalProps {
  title: string;
  text: string;
  icon?: React.ReactNode;
}

export default function AlertModal({ title, text, icon }: AlertModalProps) {
  if (!open) return null;

  return (
    <Box className="flex flex-col items-center justify-center ">
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
        {icon}
      </Icon>
      <Typography
        variant="h5"
        align="center"
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
      <Typography
        variant="subtitle1"
        align="center"
        sx={{
          color: "black",
          margin: {
            xs: "8px 0px",
            md: "12px 0px",
          },
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

{
  /* <Box className="flex flex-row justify-around w-full"> */
}
//           <CustomButton
//             label={customConfirmText}
//             type={"button"}
//             variants={"contained"}
//             size={"large"}
//             onClick={onConfirm}
//             loading={loading}
//             sx={{
//               backgroundColor: "var(--color-blue)",
//               width: "40%",
//             }}
//           />
//           <CustomButton
//             label={customCancelText}
//             type={"button"}
//             variants={"contained"}
//             size={"large"}
//             onClick={onCancel}
//             sx={{
//               width: "40%",
//               borderColor: "var(--color-blue)",
//             }}
//           />
//         </Box>
