"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@features/store";
import { Box } from "@mui/material";
import { Tooltip, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import styled from "styled-components";

import Logout from "./Logout";
import getToken from "@utils/getToken";
import { getUser } from "@apis/auth/getUser";
import { setUser } from "@features/authSlide";

const CustomMenuItem = styled(MenuItem)`
  font-size: 16px;
  @media (max-width: 900px) {
    font-size: 14px;
  }
  @media (max-width: 600px) {
    font-size: 12px;
  }
  font-weight: 600;
  text-align: center;
  color: var(--color-blue);
  &:hover {
    color: white;
    background-color: var(--color-gray-stroke);
  }
`;
function InitUser() {
  const dispatch = useDispatch();
  const userName = useSelector((state: any) => state.user.userName);
  const userType = useSelector((state: any) => state.user.userType);

  useEffect(() => {
    const init = async () => {
      if (typeof document === "undefined") return;

      const { access, refresh } = getToken();

      if ((!userName || !userType) && access && refresh) {
        try {
          const userInfo = await getUser();
          if (userInfo) {
            dispatch(
              setUser({
                userName: userInfo.userName,
                userType: userInfo.userType,
              })
            );
          }
        } catch (err) {
          console.error("Lỗi khi lấy thông tin người dùng:", err);
        }
      }
    };

    init();
  }, [dispatch, userName, userType]);

  return null;
}
export default function AvatarMenu() {
  const avatarImage = "/assets/icons/avatar.svg";
  // lay tu redux
  const user = useSelector((state: RootState) => state.user);
  const userName = user.userName;
  const userType = user.userType?.toLowerCase() || "student";
  const setting = {
    student: [
      {
        name: "Trang cá nhân",
        link: "/sinh-vien/trang-ca-nhan",
      },
      {
        name: "Đổi mật khẩu",
        link: "/doi-mat-khau",
      },
    ],
    staff: [{ name: "Đổi mật khẩu", link: "doi-mat-khau" }],
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box className="mr-3">
      <InitUser />
      <Tooltip title={userName}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {/* ở kích thước nhỏ hơm thì hình avatar đạt 70%w */}
          <Avatar
            sx={{
              width: { xs: "30px", sm: "35px", md: "40px" },
              height: "auto",
            }}
            alt="avatar"
            className="rounded-full"
            src={avatarImage}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: { xs: "30px", sm: "40px", md: "50px" } }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {setting[userType].map((item, index) => (
          <Link
            key={index}
            href={item.link}
            onClick={handleCloseUserMenu}
            className="fit-content"
          >
            <CustomMenuItem>{item.name}</CustomMenuItem>
          </Link>
        ))}
        <CustomMenuItem>
          <Logout />
        </CustomMenuItem>
      </Menu>
    </Box>
  );
}
