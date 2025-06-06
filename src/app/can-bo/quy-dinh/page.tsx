"use client";

import CustomButton from "@components/button";
import { showModal } from "@components/modal/RootModal";
import { quyDinhForm } from "@constants/form";
import { fetchQuyDinhCanBo } from "@redux/features/quyDinhSlice";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { useEffect, useState } from "react";
import NavBar from "./Navbar";
import QuyDinhTable from "./QuyDinhTable";

export default function QuyDinhPage() {
  const dispatch = useAppDispatch();
  const { quyDinh, loading: loadingRedux } = useAppSelector(
    (state) => state.quyDinh
  );
  const selected = useAppSelector((state) => state.quyDinh.selected);

  const [department, setDepartment] = useState("");
  const [option, setOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(fetchQuyDinhCanBo());
    // neu loadingRedux la true thi khong can setLoading nua
    // setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    // if (!department || !option || !quyDinh?.length) {
    //   setFilteredData([]);
    //   return;
    // }
    if (!option || !quyDinh?.length) {
      setFilteredData([]);
      return;
    }
    // Filter quy dinh based on department and option
    const filtered = quyDinh.filter(
      (item) => item.maPB === department || item.loaiVanBan === option
    );
    setFilteredData(
      searchQuery
        ? filtered.filter((item) =>
            item.tenQD.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : filtered
    );
  }, [quyDinh, department, option, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleOpenModal = (
    mode: "add" | "edit" | "delete" | string,
    data?: any
  ) => {
    const editData = data ? quyDinh.find((item) => item.maQD === data) : null;
    showModal({
      title:
        mode === "add"
          ? "Thêm Quy Định"
          : mode === "edit"
          ? "Sửa Quy Định"
          : "Xác nhận xóa quy định?",
      type: mode === "delete" ? "alert" : "form",
      icon: mode === "delete" ? "warning" : null,
      inputs: mode !== "delete" ? quyDinhForm : null, // Assuming you have a form schema for adding/editing
      editData: editData || null,
      handleAsyncSubmit:
        mode === "delete"
          ? null
          : async (data: any) => {
              // Handle the form submission logic here
              // mode === "add" ? add api : edit api
              console.log("Submitted data:", data);
              return new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate an API call
            },
      preConfirm:
        mode === "delete"
          ? async () => {
              // Simulate an API call for deletion confirmation
              return new Promise((resolve) => setTimeout(resolve, 2000));
            }
          : null,
    }).then((res: any) => {
      if (res.confirm) {
        // Handle the success case
        switch (mode) {
          case "add":
            handleModalHelper("Thêm ", "success");
            break;
          case "edit":
            handleModalHelper("Sửa ", "success");
            break;
          default:
            handleModalHelper("Xóa", "success");
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

  const handleSelectionsChange = (
    selectedDepartment: string,
    selectedOption: string
  ) => {
    setDepartment(selectedDepartment);
    setOption(selectedOption);
  };

  const isEmpty =
    (!department && !option && !searchQuery.trim()) ||
    filteredData.length === 0;

  return (
    // <>
    //   {loadingRedux ? (
    //     <div className="flex justify-center items-center w-full h-full">
    //       <Loading />
    //     </div>
    //   ) : (
    <div className="flex flex-col w-full relative">
      {/* Header */}
      <div className="border-b-2 border-b-[var(--color-gray-fill)] w-full p-3 flex justify-between sticky top-[234px] md:top-[121px] bg-white z-40">
        <h3 className="text-xl md:text-3xl uppercase font-bold">
          Tra cứu Quy định
        </h3>
        {/* <SearchBar onSearch={handleSearch} /> */}
        <div className="grid grid-cols-3 gap-2">
          <CustomButton
            label="Thêm"
            variants="contained"
            size="large"
            type="button"
            sx={{ width: "100%", backgroundColor: "var(--color-blue)" }}
            onClick={() => {
              handleOpenModal("add");
            }}
          />{" "}
          <CustomButton
            label="Chỉnh sửa"
            variants="contained"
            size="large"
            type="button"
            disabled={selected.length !== 1}
            sx={{ width: "100%", backgroundColor: "var(--color-blue)" }}
            onClick={async () => {
              handleOpenModal("edit", selected[0]);
            }}
          />
          <CustomButton
            label="Xóa"
            variants="contained"
            size="large"
            type="button"
            disabled={selected.length !== 1}
            sx={{ width: "100%", backgroundColor: "var(--color-blue)" }}
            onClick={() => {
              handleOpenModal("delete", selected[0]);

              // Call delete API or dispatch action to delete quy dinh
              //
            }}
          />
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-col md:flex-row w-full md:h-full">
        {/* Sidebar */}
        <div className="w-full md:w-[25%] lg:w-[20%] p-2 md:fixed md:top-[200px] md:left-0 md:h-[calc(100vh-250px)] bg-white z-30">
          <NavBar onSelectionsChange={handleSelectionsChange} />
        </div>

        {/* Content */}
        <div className="w-full md:ml-[25%] lg:ml-[20%] px-4 pt-4">
          {option && (
            <h5 className="w-full text-center uppercase font-semibold text-[var(--color-blue)] text-lg md:text-2xl mb-2">
              {option}
            </h5>
          )}

          {isEmpty ? (
            <div className="flex justify-center items-center w-full h-full">
              <p className="uppercase font-light text-lg md:text-2xl text-[var(--color-gray)] text-center">
                Trống
              </p>
            </div>
          ) : (
            <QuyDinhTable data={filteredData} />
          )}
        </div>
      </div>
    </div>
    //   )}
    // </>
  );
}
