"use client";

import CustomButton from "@components/button";
import { showModal } from "@components/modal/RootModal";
import { usePathname, useRouter } from "next/navigation";

export default function DonDangKyHeader({}) {
  const pathName = usePathname().split("/");
  const router = useRouter();
  const isAdd = pathName[pathName.length - 1] === "tao-moi";

  return (
    <div className="border-b-2 border-b-[var(--color-gray-fill)] w-full p-3 flex justify-between sticky  top-[234px] md:top-[121px] bg-white z-40">
      <h3 className="text-xl md:text-3xl uppercase font-bold">Đơn Đăng Ký</h3>
      <div className="flex flex-end gap-2">
        <CustomButton
          label={isAdd ? "Xác nhận" : "Thêm"}
          className="w-full"
          onClick={() => {
            if (!isAdd) {
              showModal({
                title: "Thêm đơn đăng ký",
                icon: "warning",
                type: "form",
                inputs: [
                  {
                    name: "loaiDonDangKy",
                    label: "",
                    type: "radio-group",
                    required: true,
                    selectOptions: [
                      { display: "Liên kết", value: "link" },
                      { display: "Đơn mới", value: "form" },
                    ],
                  },
                ],
              }).then((res: any) => {
                if (res.data) {
                  if (res.data.loaiDonDangKy === "form") {
                    router.push("/can-bo/don-dang-ky/tao-moi");
                  } else {
                    showModal({
                      title: "Liên kết",
                      type: "form",
                      formOrientation: "vertical",
                      handleAsyncSubmit: async (data: any) => {
                        // Handle the form submission logic here
                        console.log("Submitted data:", data);
                        return;
                      },
                      inputs: [
                        {
                          name: "link",
                          label: "Thêm liên kết đơn đăng ký",
                          type: "text",
                          required: true,
                          placeholder: "Nhập liên kết",
                        },
                        {
                          name: "tendonDangKy",
                          label: "Tên đơn",
                          type: "text",
                          required: true,
                          placeholder: "Nhập tên đơn",
                        },
                      ],
                    });
                  }
                }
              });
            }
          }}
        />
        <CustomButton
          label={isAdd ? "Hủy" : "Xóa"}
          className="flex"
          onClick={() => {
            if (isAdd) {
              router.back();
            }
          }}
        />
      </div>
    </div>
  );
}
