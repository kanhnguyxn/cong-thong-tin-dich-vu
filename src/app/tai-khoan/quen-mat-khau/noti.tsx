"use client";
import React from "react";
import { Typography } from "@mui/material";
import Link from "next/link";

import CustomButton from "@components/button";

// import { generateOtp } from "../../services/otpService";

export default function Noti({ onNext }) {
  const onclick = () => {
    // generateOtp();
    onNext();
  };

  return (
    <>
      <Typography
        fontSize={{ xs: "0.8rem", md: "1rem" }}
        sx={{ padding: "3px 0px" }}
        className="text-center"
      >
        Chúng tôi đã gửi mã OTP đến email của bạn
      </Typography>
      <div className="flex justify-between gap-4 w-full items-center">
        <Link
          className="text-blue-500 hover:underline text-xs md:text-sm"
          href="./dang-nhap"
        >
          Đăng nhập bằng mật khẩu
        </Link>
        <CustomButton
          label="Tiếp tục"
          variants="contained"
          size="large"
          disabled={false}
          sx={{
            backgroundColor: "var(--color-blue)",
            color: "white",
            width: "40%",
            paddingTop: "5px",
          }}
          type="button"
          onClick={onclick}
        />
      </div>
    </>
  );
}
