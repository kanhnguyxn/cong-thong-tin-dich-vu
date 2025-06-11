"use client";

import CustomButton from "@components/button";
import { showModal } from "@components/modal/RootModal";
import { usePathname, useRouter } from "next/navigation";
import createForm from "@apis/canBo/createForm";

export default function DonDangKyHeader({}) {
  const pathName = usePathname().split("/");
  const router = useRouter();
  const isAdd = pathName[pathName.length - 1] === "tao-moi";

  return (
    <div className="border-b-2 border-b-[var(--color-gray-fill)] w-full p-3 grid grid-cols-6 sticky  top-[234px] md:top-[121px] bg-white z-40">
      <h3 className="text-xl md:text-3xl uppercase font-bold">Đơn Đăng Ký</h3>
      <div
        className={`col-end-7 ${
          !isAdd ? "" : "w-[50%] place-self-end"
        } flex flex-row gap-2`}
      >
        {!isAdd && (
          <CustomButton
            label={"Thêm"}
            sx={{ width: "100%", backgroundColor: "var(--color-blue)" }}
            onClick={() => {
              if (!isAdd) {
                showModal({
                  title: "Thêm đơn đăng ký",
                  icon: "warning",
                  type: "form",
                  classContainer: "w-[25%]",
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
                          const dataSubMit = {
                            tenDon: data.tendonDangKy,
                            thongTinChiTiet: JSON.stringify({
                              link: data.link,
                            }),
                          };
                          const res = await createForm(dataSubMit);
                          return res;
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
                      }).then((res: any) => {
                        if (res.confirm) {
                          if (res.data.status) {
                            showModal({
                              title: "Thêm đơn thành công",
                              icon: "success",
                              type: "notification",
                              showNoButton: true,
                            }).then(() => {
                              // refresh trang
                              console.log("refresh");
                              window.location.reload();
                              // router.refresh();
                            });
                            //  load lai trang
                          } else {
                            showModal({
                              title: "Thêm đơn thất bại",
                              icon: "error",
                              type: "notification",
                              showNoButton: true,
                            });
                          }
                        }
                      });
                    }
                  }
                });
              }
            }}
          />
        )}

        <CustomButton
          label={isAdd ? "Hủy" : "Xóa"}
          sx={{ width: "100%", backgroundColor: "var(--color-blue)" }}
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
