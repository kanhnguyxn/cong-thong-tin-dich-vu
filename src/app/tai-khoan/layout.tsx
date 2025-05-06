// "use client";
// import React, { ReactNode } from "react";
// import "@styles/globals.css";

// import { AppBar, Toolbar, Typography } from "@mui/material";
// import { Container } from "@components/Container";
// import Footer from "@components/Footer";
// import Logo from "@components/header/Logo";

// const inforHeader = {
//   logo: "/assets/icons/logo_truong.svg",
//   school: "Đại học Đà Nẵng",
//   unit: "Trường Đại học Kinh Tế",
//   backGround_image: "/assets/images/background.svg",
// };

// interface LayoutProps {
//   children: ReactNode;
// }

// export default function Layout({ children }: LayoutProps) {
//   return (
//     <div
//       className="flex flex-col min-h-screen w-full"
//       style={{
//         backgroundImage: `url(${inforHeader.backGround_image})`,
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <AppBar
//         position="static"
//         className="top-0 z-50 w-full items-start"
//         sx={{
//           backgroundColor: "transparent",
//           boxShadow: "none",
//         }}
//       >
//         <Toolbar className="flex flex-col text-sm md:text-base lg:text-lg xl:text-xl py-3 md:py-0">
//           <Logo
//             title={inforHeader.school}
//             subTitle={inforHeader.unit}
//             logo={inforHeader.logo}
//             className="text-md md:text-lg lg:text-2xl"
//           />
//         </Toolbar>
//       </AppBar>
//       <main className="flex flex-1 w-full justify-center items-center">
//         <Container className="px-8 py-4 gap-2" shadow={true}>
//           <Typography
//             variant="h5"
//             fontWeight={500}
//             className="text-[var(--color-orange)] px-3"
//             sx={{
//               fontSize: {
//                 xs: "18px",
//                 sm: "20px",
//                 md: "22px",
//                 lg: "24px",
//               },
//             }}
//           >
//             Cổng Thông Tin - Dịch Vụ
//           </Typography>
//           {children}
//         </Container>
//       </main>

//       <Footer />
//     </div>
//   );
// }

"use client";

import Header from "@components/header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Header />;
}
