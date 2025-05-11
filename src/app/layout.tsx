"use client";
import React, { useEffect } from "react";
import "@styles/globals.css";

import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../features/store";
import { setUser } from "@features/authSlide"; // Adjust the path based on your actual file structure

import { getUser } from "@apis/auth/getUser";
import getToken from "@utils/getToken";

function InitUser() {
  const dispatch = useDispatch();
  const userName = useSelector((state: any) => state.userName);
  const userType = useSelector((state: any) => state.userType);

  useEffect(() => {
    const fetchUserInfo = async () => {
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

    fetchUserInfo();
  }, [dispatch, userName, userType]);

  return null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen max-w-full">
        <Provider store={store}>
          <InitUser />
          {children}
        </Provider>
      </body>
    </html>
  );
}
