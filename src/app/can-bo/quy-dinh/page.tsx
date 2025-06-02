"use client";

import FormModal from "@components/modal/FormModal";
import { quyDinhForm } from "@constants/form";
import { fetchQuyDinhCanBo } from "@redux/features/quyDinhSlice";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { useEffect, useState } from "react";
import NavBar from "./Navbar";
import QuyDinhTable from "./QuyDinhTable";
export default function QuyDinhPage() {
  const dispatch = useAppDispatch();
  const { quyDinh, loading: loadingRedux } = useAppSelector((state) => state.quyDinh);
  const selected = useAppSelector((state) => state.quyDinh.selected);

  const [department, setDepartment] = useState("");
  const [option, setOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(fetchQuyDinhCanBo());
    // neu loadingRedux la true thi khong can setLoading nua
    if (!loadingRedux) {
    }
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
    const filtered = quyDinh.filter((item) => item.maPB === department || item.loaiVanBan === option);
    setFilteredData(
      searchQuery ? filtered.filter((item) => item.tenQD.toLowerCase().includes(searchQuery.toLowerCase())) : filtered
    );
  }, [quyDinh, department, option, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectionsChange = (selectedDepartment: string, selectedOption: string) => {
    setDepartment(selectedDepartment);
    setOption(selectedOption);
  };

  const isEmpty = (!department && !option && !searchQuery.trim()) || filteredData.length === 0;

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
        <h3 className="text-xl md:text-3xl uppercase font-bold">Tra cứu Quy định</h3>
        {/* <SearchBar onSearch={handleSearch} /> */}
        <div className="grid grid-cols-3 gap-2">
          <FormModal
            title={"Thêm quy định"}
            buttonLabel="Thêm"
            variant="contained"
            buttonSize="large"
            inputSchema={quyDinhForm}
            buttons={[
              {
                label: "Thêm",
                type: "submit",
                variants: "contained",
                size: "large",
                sx: {
                  backgroundColor: "var(--color-blue)",
                  width: "40%",
                },
              },
            ]}
            customCancelButton={{
              label: "Hủy",
              type: "button",
              variants: "contained",
              size: "large",
              sx: {
                backgroundColor: "var(--color-blue)",
                width: "40%",
              },
            }}
            handleSubmit={() => {}}
          />
          <FormModal
            editData={selected.length === 1 ? quyDinh.find((item) => item.maQD === selected[0]) : null}
            disabled={selected.length > 1 || selected.length === 0}
            title={"sửa quy định"}
            buttonLabel="Chỉnh sửa"
            variant="contained"
            buttonSize="large"
            inputSchema={quyDinhForm}
            buttons={[
              {
                label: "Thêm",
                type: "submit",
                variants: "contained",
                size: "large",
                sx: {
                  backgroundColor: "var(--color-blue)",
                  width: "40%",
                },
              },
            ]}
            customCancelButton={{
              label: "Hủy",
              type: "button",
              variants: "contained",
              size: "large",
              sx: {
                backgroundColor: "var(--color-blue)",
                width: "40%",
              },
            }}
            handleSubmit={() => {}}
          />
          <p>Xoa</p>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-col md:flex-row w-full md:h-full">
        {/* Sidebar */}
        <div className="w-full md:w-[25%] lg:w-[20%] p-4 md:fixed md:top-[200px] md:left-0 md:h-[calc(100vh-250px)] bg-white z-30">
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
              <p className="uppercase font-light text-lg md:text-2xl text-[var(--color-gray)] text-center">Trống</p>
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
