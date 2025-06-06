import { Box, Typography } from "@mui/material";
import React from "react";

export interface NotiModalProps {
  title: string;
  icon: React.ReactNode;
}

export default function NotiModal({ title, icon }: NotiModalProps) {
  return (
    <Box
      className="flex flex-col items-center justify-center"
      // sx={{ fontSize: { xs: "20px", sm: "22px", md: "24px" } }}
    >
      <Typography
        textAlign={"center"}
        fontWeight={"bold"}
        className="uppercase text-[var(--color-black)] "
        sx={{
          fontSize: { xs: "20px", sm: "22px", md: "24px" },
        }}
      >
        {title}
      </Typography>
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
        {icon}
      </Box>
    </Box>
  );
}
