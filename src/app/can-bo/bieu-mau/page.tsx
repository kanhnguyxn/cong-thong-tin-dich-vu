"use client";
import { useEffect, useState } from "react";

import { SearchBar } from "@components/SearchBar";
import { showModal } from "@components/modal/RootModal";
import { bieuMauForm } from "@constants/form";
import CustomButton from "@components/button";

import { useAppDispatch, useAppSelector } from "@redux/hook";
import { fetchBieuMau } from "@redux/features/bieuMauSlice";

import { deleteBieuMau } from "@apis/canBo/deleteBieuMau";

import Loading from "src/app/loading";

import { BieuMauTable } from "./BieuMauTable";

export default function BieuMauPage() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState([]);
  const { bieuMau, loading: loadingRedux } = useAppSelector(
    (state) => state.bieuMau
  );
  const selectedBieuMau = useAppSelector((state) => state.bieuMau.selected);
  // const [maBMList, setMaBMList] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchBieuMau());
  }, [dispatch]);
  useEffect(() => {
    if (bieuMau.length > 0) {
      setData(bieuMau);
    }
  }, [bieuMau]);

  const onSearch = (query: string) => {
    const filteredData = bieuMau.filter((item) =>
      item.tenBM.toLowerCase().includes(query.toLowerCase())
    );
    // console.log("onSearch");

    setData(filteredData);
    // console.log(filteredData, query);
  };

  const handleOpenModal = (mode: "add" | "delete" | string) => {
    showModal({
      title: mode === "add" ? "Thêm biểu mẫu" : "Xoá biểu mẫu",
      type: mode === "add" ? "form" : "alert",
      icon: mode === "delete" ? "warning" : null,
      inputs: mode !== "delete" ? bieuMauForm : null,
      formOrientation: "vertical",
      classContainer: "w-[25%]",
      handleAsyncSubmit:
        mode === "delete"
          ? null
          : async (formData: any) => {
              console.log("formData", formData);
            },
      preConfirm:
        mode === "delete"
          ? async () => {
              console.log("maBMList", selectedBieuMau);
              const res = await deleteBieuMau(selectedBieuMau as string[]);
              return res;
            }
          : null,
    }).then((res: any) => {
      if (res.confirm) {
        switch (mode) {
          case "add":
            if (res.data.status) {
              handleModalHelper("Thêm", "success");
              dispatch(fetchBieuMau());
            } else {
              handleModalHelper("Thêm", "error");
            }
            break;
          case "delete":
            if (res.data.status) {
              handleModalHelper("Xoá", "success");
              dispatch(fetchBieuMau());
            } else {
              handleModalHelper("Xoá", "error");
            }
            break;
        }
      }
    });
  };
  const handleModalHelper = (title, status: "success" | "error") => {
    showModal({
      title: `${title} ${status === "success" ? "thành công" : "thất bại"}`,
      icon: status,
      type: "notification",
      showNoButton: true,
    });
  };

  return (
    <>
      {loadingRedux ? (
        <div className="flex justify-center items-center w-full h-full">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col w-full items-center">
          <div className="border-b-2 border-b-[var(--color-gray-fill)] w-full p-3 flex justify-between sticky  top-[234px] md:top-[121px] bg-white z-40">
            <h3 className="text-xl md:text-3xl uppercase font-bold">
              Biểu mẫu
            </h3>
            <div className="flex flex-row gap-2">
              <SearchBar onSearch={onSearch}></SearchBar>
              <div className="grid grid-cols-2 gap-2">
                <CustomButton
                  label="Thêm"
                  variants="contained"
                  size="large"
                  type="button"
                  sx={{ width: "100%", backgroundColor: "var(--color-blue)" }}
                  onClick={() => {
                    handleOpenModal("add");
                  }}
                />
                <CustomButton
                  label="xoá"
                  variants="contained"
                  size="large"
                  type="button"
                  disabled={selectedBieuMau.length === 0}
                  sx={{ width: "100%", backgroundColor: "var(--color-blue)" }}
                  onClick={() => handleOpenModal("delete")}
                />
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:max-w-[90%] lg:max-w-[80%]">
            <BieuMauTable data={data} />
          </div>
        </div>
      )}
    </>
  );
}
