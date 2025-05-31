"use client";
import ICONS from "@components/icons";
import { useEffect, useState } from "react";
// import Loading from "src/app/loading";
import { fetchGioiThieu } from "@redux/features/gioiThieuSlice";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { info } from "console";

const ContactItem = ({ department, phones, email }) => (
  <div className="flex flex-col">
    <h4 className="font-medium">{department}</h4>
    <div className="flex flex-col gap-2 h-full md:pl-4 pt-2 break-all text-left border-t-2 border-[var(--color-gray-stroke)] border-r-2">
      {phones?.map((phone, idx) => (
        <div key={idx} className="flex items-center gap-2 px-2">
          {ICONS.PHONE}
          <span>{phone}</span>
        </div>
      ))}
      {email && (
        <div className="flex items-center gap-2 px-2">
          {ICONS.EMAIL}
          <span className="underline">{email}</span>
        </div>
      )}
    </div>
  </div>
);

export default function GioiThieuPage() {
  const dispatch = useAppDispatch();
  const [infoGioiThieu, setInfoGioiThieu] = useState({
    tieuDe: "",
    noiDung: "",
    hinhAnh: "",
    thongTinLienHe: [],
  });

  useEffect(() => {
    dispatch(fetchGioiThieu());
  }, []);

  const gioiThieu = useAppSelector((state) => state.gioiThieu.gioiThieu);

  useEffect(() => {
    if (gioiThieu) {
      setInfoGioiThieu(gioiThieu);
      console.log("Gioi thieu data:", gioiThieu);
    }
  }, [gioiThieu]);

  return (
    <>
      {infoGioiThieu.tieuDe === "" ? (
        <div className="flex items-center justify-center min-h-screen w-full text-center">
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <main className="text-center w-full flex flex-col min-h-[calc(100vh-var(--header-height,122px)-var(--footer-height,43px))]">
          <div className="flex-1 px-4 md:px-10 lg:items-center lg:justify-center flex flex-col">
            <h1 className="uppercase text-[var(--color-blue)] font-bold text-lg md:text-xl lg:text-2xl pt-3">
              {infoGioiThieu.tieuDe}
            </h1>
            <div className="flex items-start flex-col md:flex-row text-justify indent-10 w-full gap-2 py-4 md:py-0 md:pt-3">
              <p className="w-full md:w-[60%] lg:w-[70%] md:pr-3 lg:pr-6 xl:pr-16 xl:leading-10">
                {infoGioiThieu.noiDung}
              </p>
              {infoGioiThieu.hinhAnh && (
                <img
                  src={infoGioiThieu.hinhAnh}
                  alt="Giới thiệu"
                  className="w-full h-auto md:w-[40%] lg:w-[30%]"
                />
              )}
            </div>
          </div>
          {infoGioiThieu.thongTinLienHe.length > 0 && (
            <div className="mt-auto w-full px-8 pb-6">
              <h3 className="text-sm md:text-lg lg:text-xl text-left font-semibold pb-2">
                Thông tin liên hệ
              </h3>
              <div className="grid grid-cols-2 gap-y-3 md:grid-cols-4 text-wrap">
                {infoGioiThieu.thongTinLienHe.map((contact, index) => (
                  <ContactItem key={index} {...contact} />
                ))}
              </div>
            </div>
          )}
        </main>
      )}
    </>
  );
}
