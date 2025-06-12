"use client";

import CustomButton from "@components/button";
import { showModal } from "@components/modal/RootModal";
import { quyDinhForm } from "@constants/form";
import { fetchQuyDinhCanBo } from "@redux/features/quyDinhSlice";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { useEffect, useState } from "react";
import NavBar from "./Navbar";
import QuyDinhTable from "./QuyDinhTable";
import Loading from "src/app/loading";
import { deleteQuyDinh } from "@apis/canBo/deleteQuyDinh";
import { addQuyDinh } from "@apis/canBo/addQuyDinh";
import { updateQuyDinh } from "@apis/canBo/updateQuyDinh";
import { useDispatch } from "react-redux";

// ham lay tg hien tai
async function formated_dateTime(tg) {
  try {
    console.log("formated_dateTime input:", tg);

    if (!tg) {
      console.error("formated_dateTime: tg is null or undefined");
      return new Date().toISOString();
    }

    // Nếu tg đã là ISO string thì return luôn
    if (typeof tg === "string" && tg.includes("T") && tg.includes("Z")) {
      console.log("formated_dateTime: already ISO format");
      return tg;
    }

    const currentDate = new Date();
    let date_time = tg + " " + currentDate.toLocaleTimeString();
    // console.log("formated_dateTime combined:", date_time);

    // chuyen thanh string
    const dateObject = new Date(date_time);
    // console.log("formated_dateTime dateObject:", dateObject);

    if (isNaN(dateObject.getTime())) {
      // console.error("formated_dateTime: Invalid date created:", date_time);
      // Thử parse chỉ ngày
      const dateOnly = new Date(tg);
      if (!isNaN(dateOnly.getTime())) {
        // console.log("formated_dateTime: Using date only");
        return dateOnly.toISOString();
      }
      // Fallback to current date
      return new Date().toISOString();
    }

    const result = dateObject.toISOString();
    // console.log("formated_dateTime result:", result);
    return result;
  } catch (error) {
    // console.error("formated_dateTime error:", error);
    return new Date().toISOString();
  }
}

export default function QuyDinhPage() {
  const dispatch = useAppDispatch();
  const { quyDinh, loading: loadingRedux } = useAppSelector(
    (state) => state.quyDinh
  );
  const selected = useAppSelector((state) => state.quyDinh.selected);
  const user = useAppSelector((state) => state.auth.user);
  const userName = user?.username || "Người dùng";

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
      (item) =>
        (!department || item.maPB === department) && item.loaiVanBan === option
    );
    setFilteredData(
      searchQuery
        ? filtered.filter((item) =>
            item.tenQD.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : filtered
    );
  }, [quyDinh, department, option, searchQuery]);

  // Hàm format ngày tháng từ ISO format sang DD/MM/YYYY format cho editData
  const formatDateForEdit = (isoDate: string | Date): string => {
    if (!isoDate) return "";

    try {
      const date = isoDate instanceof Date ? isoDate : new Date(isoDate);

      // Kiểm tra xem date có hợp lệ không
      if (isNaN(date.getTime())) {
        return typeof isoDate === "string" ? isoDate : ""; // Trả về chuỗi gốc nếu không parse được
      }

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`; // Output: "01/01/2024"
    } catch (error) {
      console.error("Error formatting date:", error);
      return typeof isoDate === "string" ? isoDate : ""; // Trả về chuỗi gốc nếu có lỗi
    }
  };

  const handleOpenModal = (
    mode: "add" | "edit" | "delete" | string,
    data?: any
  ) => {
    console.log("handleOpenModal called with mode:", mode, "and data:", data);

    const rawEditData = data
      ? quyDinh.find((item) => item.maQD === data)
      : null;

    console.log("rawEditData found:", rawEditData);

    // Format dữ liệu ngày tháng cho editData nếu là mode edit
    let editData = null;
    if (rawEditData && mode === "edit") {
      editData = {
        ...rawEditData,
        ngayBanHanh: formatDateForEdit(rawEditData.ngayBanHanh),
        ngayCoHieuLuc: formatDateForEdit(rawEditData.ngayCoHieuLuc),
      };
    }

    console.log("editData created:", editData);

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
          : mode === "add"
          ? async (data: any) => {
              console.log("Add mode - formData:", data);
              if (data.hieuLuc === "còn") data.hieuLuc = true;
              else if (data.hieuLuc === "hết") data.hieuLuc = false;
              data.ngayBanHanh = await formated_dateTime(data.ngayBanHanh);
              data.ngayCoHieuLuc = await formated_dateTime(data.ngayCoHieuLuc);
              const res = await addQuyDinh(data);
              // console.log("Add mode - res:", res);
              return res;
            }
          : async (data: any) => {
              // console.log("Edit mode - formData:", data);
              // console.log("Edit mode - editData:", editData);

              // console.log("Edit mode - Processing hieuLuc...");
              if (data.hieuLuc === "còn") data.hieuLuc = true;
              else if (data.hieuLuc === "hết") data.hieuLuc = false;
              // console.log("Edit mode - hieuLuc processed:", data.hieuLuc);

              // console.log("Edit mode - Processing dates...");
              const ngayBanHanh = await formated_dateTime(data.ngayBanHanh);
              // console.log("Edit mode - ngayBanHanh formatted:", ngayBanHanh);

              const ngayCoHieuLuc = await formated_dateTime(data.ngayCoHieuLuc);
              // console.log(
              //   "Edit mode - ngayCoHieuLuc formatted:",
              //   ngayCoHieuLuc
              // );

              const thoiGianDang = await formated_dateTime(
                new Date().toLocaleDateString("vi-VN")
              );
              // console.log(
              //   "Edit mode - thoiGianDang formatted:",
              //   thoiGianDang
              // );

              const dataUpdate = {
                ...data,
                maCB: userName,
                ngayBanHanh: ngayBanHanh,
                ngayCoHieuLuc: ngayCoHieuLuc,
                thoiGianDang: thoiGianDang,
              };
              // console.log("Edit mode - dataUpdate:", dataUpdate);

              const maQD = editData.maQD; // Lấy mã quy định từ editData
              // console.log("Edit mode - maQD:", maQD);
              // console.log("Edit mode - About to call updateQuyDinh...");

              const res = await updateQuyDinh(maQD, dataUpdate);

              return res;
            },
      preConfirm:
        mode === "delete"
          ? async () => {
              const res = await deleteQuyDinh(selected as string[]);
              return res;
            }
          : null,
    }).then((res: any) => {
      if (res.confirm) {
        // Handle the success case
        switch (mode) {
          case "add":
            if (res.data.status) {
              handleModalHelper("Thêm", "success");
              dispatch(fetchQuyDinhCanBo());
            } else {
              handleModalHelper("Thêm", "error");
            }
            break;
          case "edit":
            if (res.data.status) {
              handleModalHelper("Sửa", "success");
              dispatch(fetchQuyDinhCanBo());
            } else {
              handleModalHelper("Sửa", "error");
            }

            break;
          default:
            if (res.data.status) {
              handleModalHelper("Xóa", "success");
              dispatch(fetchQuyDinhCanBo());
            } else handleModalHelper("Xóa", "error");
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
    <>
      {loadingRedux ? (
        <div className="flex justify-center items-center w-full h-full">
          <Loading />
        </div>
      ) : (
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
                disabled={selected.length === 0}
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
      )}
    </>
  );
}
