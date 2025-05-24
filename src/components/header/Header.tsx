"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { fetchUser } from "@redux/features/auth/authSlide";
import Logo from "./Logo";
import AvatarMenu from "./Avatar";
import Navbar from "./Navbar";
import "@styles/globals.css";
import "@styles/colors.css";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { useEffect } from "react";

const infoHeader = {
  logo: "/assets/icons/logo_truong.svg",
  unit: "Trường Đại học Kinh Tế - Đại học Đà Nẵng",
  system: "Cổng thông tin - dich vụ",
  background_image: "/assets/images/background_header.svg",
};

const Header = () => {
  // lay tu redux
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [user]);
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Toolbar
        disableGutters
        className="flex flex-col text-sm md:text-md lg:text-lg xl:text-xl"
      >
        <Box
          className="flex w-full justify-between items-center py-3 md:py-0"
          sx={{
            backgroundImage: `url(${infoHeader.background_image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Logo
            title={infoHeader.system}
            subTitle={infoHeader.unit}
            logo={infoHeader.logo}
            className="text-md md:text-lg lg:text-2xl text-[var(--color-orange)]"
          />
          {/* nếu chưa đăng nhập sẽ không hiện avtar */}
          <AvatarMenu />
        </Box>
        <Navbar />
      </Toolbar>
    </AppBar>
  );
};
export default Header;
