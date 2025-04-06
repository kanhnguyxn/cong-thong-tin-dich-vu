import React, { useState } from "react";

import { Box, Typography } from "@mui/material";
import { Container } from "@components/Container";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box className="flex w-full justify-center items-center">
      <Container className="p-8 gap-2" shadow={true}>
        <Typography variant="h5" fontWeight={500} className="text-[var(--color-orange)]">
          Cổng Thông Tin - Dịch Vụ
        </Typography>{" "}
        {children}
      </Container>
    </Box>
  );
}
