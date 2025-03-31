"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useRouter, usePathname } from "next/navigation";
import Link from 'next/link';
import { backdropClasses } from '@mui/material';


const isLoggedIn = false; // Replace with your authentication logic

const infoHeader = {
  logo: '/assets/icons/logo_truong.svg', 
  school: 'Đại học Đà Nẵng',
  unit:'Trường Đại học Kinh Tế',
  system:'Cổng thông tin dich vụ',
  background_image:"/assets/images/background_header.svg",
  avatarUrl :'/assets/icons/avatar.svg',
}

export const Logo = ({isLoggedIn:flase})=>{
    return(
        <Box className='flex font-bold text-md md:text-lg lg:text-xl transition-all duration-300 ease-in-out items-center justify-center'>
            <img src={infoHeader.logo}
            alt='logo' className='hidden md:inline-block max-w-20'></img>
            <Box className='ml-3 md:ml-0'>
            <h1 className={`text-[var(--color-orange)] ${isLoggedIn ? 'text-md md:text-lg lg:text-2xl' : ''}`}>{isLoggedIn ? infoHeader.system : infoHeader.school}</h1>
            <h2 className="text-[var(--color-blue)]">{infoHeader.unit}</h2>
            </Box>
        </Box>
    )
}




export const AvatarMenu = () => {
    const settings = ['Trang cá nhân','Đổi mật khẩu','Đăng xuất']

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return(
        <Box className= 'mr-3'>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* ở kích thước nhỏ hơm thì hình avatar đạt 70%w */}
                <Avatar sx={{ width: { xs: '30px', sm: '35px', md: '40px' } , height:'auto'}} alt="avatar" className='rounded-full' src={infoHeader.avatarUrl}/>
              </IconButton>
            </Tooltip>
            <Menu
             sx={{mt:{xs:'30px', sm:'40px', md:'50px'}}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu} className='fit-content'>
                  {/* ở kích thước nhỏ sẽ là text-sm còn ở các kích thước lớn hơn sẽ có font-size là 16px */}
                  <Typography sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }} textAlign="center">
                    {setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
        </Box>
    )
}


const Navbar =()=>{
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { label: "Giới thiệu", path: "/gioi-thieu" },
        { label: "Đơn đăng ký", path: "/don-dang-ky" },
        { label: "Biểu mẫu", path: "/bieu-mau" },
        { label: "Quy định", path: "/quy-dinh" },
      ];

    return (
        <Box className = 'w-[90%] grid grid-cols-1 grid-rows-4 gap-[2px] m-4 md:grid-cols-4 md:grid-rows-1 md:gap-2 md:m-0 md:w-full bg-white'>
           {navItems.map(({ label, path }) => (
            <Button
              key={path}
              component={Link}
              href={path}
              sx={{
                color: pathname === path ? "white" : "var(--color-gray-stroke)",
                fontSize: { xs: '10px', sm: '14px', md: '18px' },
                fontWeight:'bold',
                placeItems: 'center',
                backgroundColor:"var(--color-blue)",
                borderRadius: '0px',
              }}
            >
              {label}
            </Button>
          ))} 
        </Box>
    )
}


const Header = ({isLoggedIn = false}) => {
  return (
    <AppBar position="static" sx={{backgroundColor: 'transparent', boxShadow:'none'}} >
        <Toolbar disableGutters className='flex flex-col text-sm md:text-md lg:text-lg xl:text-xl'>
          <Box className='flex w-full justify-between items-center py-3 md:py-0' sx={isLoggedIn ? { backgroundImage: `url(${infoHeader.background_image})`, backgroundSize: 'cover', backgroundRepeat:'no-repeat'} : {backgroundColor: 'transparent'}}>
          <Logo isLoggedIn/>
          {/* nếu chưa đăng nhập sẽ không hiện avtar */}
          {isLoggedIn && <AvatarMenu/>}
          </Box>
          {isLoggedIn && <Navbar/>}
        </Toolbar>
    </AppBar>
  );
};
export default Header;