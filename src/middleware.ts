// import { withAuth } from "next-auth/middleware";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req : NextRequest) {
  // 1. Xác đinh đường dẫn cần đăng nhập ( ko có thì bỏ qua )  =
  // 2. Gọi hàm kiểm tra token ( refresh token và access token )
  const cookiesObj = await cookies();
  const acesssToken =  (cookiesObj).get("access")?.value;
  const refreshToken = (cookiesObj).get("refresh")?.value;

  // Extract pathname from request URL
  const pathname = new URL(req.url).pathname;
  
  // goi usertype tu cookies
  const userType = cookiesObj.get("userType")?.value;
  // console.log("acesssToken", acesssToken);
  // console.log("refreshToken", refreshToken);
 
  // 2.1. Nếu thiếu token chuyển về trang đăng nhập.
  if(!refreshToken || userType === "unknown") {
    return NextResponse.redirect(new URL("/tai-khoan/dang-nhap", req.url));
  }
  if(userType === "student" && pathname.startsWith('/can-bo')){
    return new Response("Not found", { status: 404 });
  }
  if(userType === "staff" && pathname.startsWith('/sinh-vien')){
    return new Response("Not found", { status: 404 });
  }
  // 2.2. Nếu có token cho phép truy cập vào trang.
  return NextResponse.next();
}

// Middleware sẽ không chạy trên các đường dẫn sau:
export const config = {
  matcher: ['/((?!_next/static|_next/image|api|tai-khoan|assets|styles).*)'],
}
