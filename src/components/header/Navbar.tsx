"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "src/lib/store";

export default function Navbar() {
  const pathname = usePathname();
  const useType =
    useSelector((state: RootState) => state.auth.userType)?.toLowerCase() ||
    "student";
  const navItems = {
    student: [
      { label: "Giới thiệu", path: "/sinh-vien/gioi-thieu" },
      { label: "Đơn đăng ký", path: "/sinh-vien/don-dang-ky" },
      { label: "Biểu mẫu", path: "/sinh-vien/bieu-mau" },
      { label: "Quy định", path: "/sinh-vien/quy-dinh" },
    ],
    staff: [
      { label: "Xử lý đơn", path: "/can-bo/xu-ly-don" },
      { label: "Đơn đăng ký", path: "/can-bo/don-dang-ky" },
      { label: "Biểu mẫu", path: "/can-bo/bieu-mau" },
      { label: "Quy định", path: "/can-bo/quy-dinh" },
    ],
    manager: [
      {
        label: "Giới thiệu",
        path: "/quan-ly/gioi-thieu",
      },
      { label: "Cán bộ", path: "/quan-ly/can-bo" },
      { label: "Báo cáo", path: "/quan-ly/bao-cao" },
    ],
  };
  return (
    <Box className="w-full p-4 flex flex-col gap-[2px] md:flex-row md:gap-2 md:p-0  bg-white">
      {navItems[useType].map(({ label, path }) => (
        <Button
          key={path}
          component={Link}
          href={path}
          sx={{
            color: pathname?.toLowerCase().includes(path.toLowerCase())
              ? "white"
              : "var(--color-gray-stroke)",
            fontSize: { xs: "12px", sm: "14px", md: "18px" },
            fontWeight: "bold",
            placeItems: "center",
            backgroundColor: "var(--color-blue)",
            borderRadius: "0px",
            width: "100%",
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
}
