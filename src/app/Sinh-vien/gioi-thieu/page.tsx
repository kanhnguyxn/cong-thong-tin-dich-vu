"use client";
import { getGioiThieu } from "@apis/sinhVien/getGioiThieu";
import ICONS from "@components/icons";
import { useEffect, useState } from "react";
import Loading from "src/app/loading";

// ftech duwx lieu
interface infoGioiThieu {
  tieuDe: string;
  noiDung: string;
  hinhAnh: string;
  thongTinLienHe: {
    department: string;
    phones: string[];
    email: string;
  }[];
}

const ContactItem = ({ department, phones, email }) => (
  <div className="flex flex-col">
    <h4 className="font-medium">{department}</h4>
    <div className="flex flex-col gap-2 h-full md:pl-4 pt-2 break-all text-left border-t-2 border-[var(--color-gray-stroke)] border-r-2">
      {phones.map((phone, idx) => (
        <div key={idx} className="flex items-center gap-2 px-2">
          {ICONS.PHONE}
          <span>{phone}</span>
        </div>
      ))}
      <div className="flex items-center gap-2 px-2">
        {ICONS.EMAIL}
        <span className="underline">{email}</span>
      </div>
    </div>
  </div>
);

export default function GioiThieuPage() {
  const [infoGioiThieu, setInfoGioiThieu] = useState<infoGioiThieu | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await getGioiThieu();
        if (!data || data[0].thongTinLienHe.length === 0) {
          setInfoGioiThieu(null);
          return;
        }
        setInfoGioiThieu(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu giới thiệu:", error);
      }
    };
    fetchData();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        infoGioiThieu && (
          <main className="text-center w-full flex flex-col min-h-[calc(100vh-var(--header-height,122px)-var(--footer-height,43px))]">
            {/* Nội dung chính có flex-1 để chiếm toàn bộ không gian trống */}
            <div className="flex-1 px-4 md:px-10 lg:items-center lg:justify-center flex flex-col">
              <h1 className="uppercase text-[var(--color-blue)] font-bold text-lg md:text-xl lg:text-2xl pt-3">
                {infoGioiThieu.tieuDe}
              </h1>
              <div className="flex items-start flex-col md:flex-row text-justify indent-10 w-full gap-2 py-4 md:py-0 md:pt-3">
                <p className="w-full md:w-[60%] lg:w-[70%] md:pr-3 lg:pr-6 xl:pr-16 xl:leading-10">
                  {infoGioiThieu.noiDung}
                </p>
                <img
                  src={infoGioiThieu.hinhAnh}
                  alt="Giới thiệu"
                  className="w-full h-auto md:w-[40%] lg:w-[30%]"
                />
              </div>
            </div>

            {/* Phần liên hệ nằm ở đáy */}
            <div className="mt-auto">
              <h3 className="text-sm md:text-lg lg:text-xl text-left font-semibold pb-2 px-8">
                Thông tin liên hệ
              </h3>
              <div className="grid grid-cols-2 gap-y-3 md:grid-cols-4 w-full text-wrap">
                {infoGioiThieu.thongTinLienHe.map((contact, index) => (
                  <ContactItem key={index} {...contact} />
                ))}
              </div>
            </div>
          </main>
        )
      )}
    </>
  );
}
