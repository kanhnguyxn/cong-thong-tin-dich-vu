"use client";

import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Giới thiệu", path: "/gioi-thieu" },
    { label: "Đơn đăng ký", path: "/don-dang-ky" },
    { label: "Biểu mẫu", path: "/bieu-mau" },
    { label: "Quy định", path: "/quy-dinh" },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          {navItems.map(({ label, path }) => (
            <Button
              key={path}
              component={Link}
              href={path}
              sx={{
                color: pathname === path ? "yellow" : "white",
                textTransform: "none",
                fontWeight: pathname === path ? "bold" : "normal",
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
