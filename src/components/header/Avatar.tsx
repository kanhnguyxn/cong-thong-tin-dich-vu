"use client"
import { Box } from "@mui/material";
import {Tooltip, IconButton, Avatar, Menu, MenuItem, Typography} from '@mui/material'
import React from "react";


interface AvatarMenuProps {
    avatarUrl?: string
}

export default function AvatarMenu ({avatarUrl}: AvatarMenuProps) {
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
                <Avatar sx={{ width: { xs: '30px', sm: '35px', md: '40px' } , height:'auto'}} alt="avatar" className='rounded-full' src={avatarUrl}/>
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
