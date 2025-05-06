import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./Logo";
import AvatarMenu from "./Avatar";
import Navbar from "./Navbar";
import "@styles/globals.css";
import "@styles/colors.css";

const infoHeader = {
  logo: "/assets/icons/logo_truong.svg",
  unit: "Trường Đại học Kinh Tế - Đại học Đà Nẵng",
  system: "Cổng thông tin - dich vụ",
  background_image: "/assets/images/background_header.svg",
  avatarUrl: "/assets/icons/avatar.svg",
};

const Header = (userType: { userType: string }) => {
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
          <AvatarMenu avatarUrl={infoHeader.avatarUrl} />
        </Box>
        <Navbar />
      </Toolbar>
    </AppBar>
  );
};
export default Header;
