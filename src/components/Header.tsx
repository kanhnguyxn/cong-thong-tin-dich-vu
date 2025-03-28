import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/colors.css";

export const metadata: Metadata = {
  title: "Cổng thông tin dịch vụ",
  description: "Cổng thông tin dịch vụ công",
};

const infor ={
  logo: '/assets/icons/logo_truong.svg', 
  school: 'Đại học Đà Nẵng',
  unit:'Trường Đại học Kinh Tế',
  system:'Cổng thông tin dich vụ',
  background_image:"/assets/images/background_header.svg",
  avatarUrl :'/assets/icons/avatar.svg',
}

interface HeaderProps {
  isLoggedIn?: boolean;
}

export default function Header({ 
  isLoggedIn = false, 
}: HeaderProps) {
  return (
        <header className="h-[10%] min-h-[80px] md:min-h-[100px] relative z-10 flex items-center transition-all duration-300 ease-in-out text-fira-sans" style={isLoggedIn ? { backgroundImage: `url(${infor.background_image})`, backgroundAttachment: 'fixed', backgroundRepeat:'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
          <div className="w-full px-4 md:py-3 lg:py-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <img src={infor.logo} alt="logo" className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] lg:h-[90px] lg:w-[90px] transition-all duration-300 ease-in-out" />
              <div className="font-bold text-md md:text-lg lg:text-xl transition-all duration-300 ease-in-out">
                <h1 className={`text-[var(--color-orange)] ${isLoggedIn ? 'text-md md:text-lg lg:text-2xl' : ''}`}>{isLoggedIn ? infor.system : infor.school}</h1>
                <h2 className="text-[var(--color-blue)]">{infor.unit}</h2>
              </div>
            </div>
            {isLoggedIn && (
              <div className="flex justify-end mx-1 md:mx-2 lg:mx-4">
                <img 
                  src={infor.avatarUrl} 
                  alt="User Avatar" 
                  className="w-10 h-10 border-black"
                />
              </div>
            )}
          </div>
        </header>
  );
}
