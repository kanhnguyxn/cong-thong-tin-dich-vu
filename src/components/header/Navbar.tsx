"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@mui/material";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Giới thiệu", path: "gioi-thieu" },
    { label: "Đơn đăng ký", path: "don-dang-ky" },
    { label: "Biểu mẫu", path: "bieu-mau" },
    { label: "Quy định", path: "quy-dinh" },
  ];

  return (
    <Box className="w-full p-4 grid grid-cols-1 grid-rows-4 gap-[2px] md:grid-cols-4 md:grid-rows-1 md:gap-2 md:p-0 md:w-full bg-white">
      {navItems.map(({ label, path }) => (
        <Button
          key={path}
          component={Link}
          href={`/sinh-vien/${path}`}
          sx={{
            color: pathname
              ?.toLowerCase()
              .includes(`/sinh-vien/${path.toLowerCase()}`)
              ? "white"
              : "var(--color-gray-stroke)",
            fontSize: { xs: "12px", sm: "14px", md: "18px" },
            fontWeight: "bold",
            placeItems: "center",
            backgroundColor: "var(--color-blue)",
            borderRadius: "0px",
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
}
