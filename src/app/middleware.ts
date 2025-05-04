import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
      signIn: "/auth/login", // Trang đăng nhập
    },
    callbacks: {
      authorized: ({ token }) => {
        // Chỉ cho phép truy cập nếu đã đăng nhập
        return !!token;
      },
    },
  });
export const config = {
    matcher: [
      "/sinh-vien/:path*", 
      "/can-bo/:path*",
      "/admin/:path*",
      '/doi-mat-khau'
    ],}