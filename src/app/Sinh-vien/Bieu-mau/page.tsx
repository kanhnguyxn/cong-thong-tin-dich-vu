"use client";
import { useState } from "react";

import { SearchBar } from "@components/SearchBar";
import BieuMauTable from "./BieuMauTable";
import dataBieuMau from "../../services/Data-bieu-mau"; 


export default function BieuMauPage() {

    const [data, setData] = useState([]);

    const onSearch = (query:string) => {
        if(!query|| query.trim() === "") return setData(dataBieuMau); // Nếu không có từ khóa tìm kiếm, hiển thị tất cả dữ liệu
        const filteredData = dataBieuMau.filter((item) => item.TenBM.toLowerCase().includes(query.toLowerCase()));
        setData(filteredData);
        console.log(filteredData, query);
    }

    return(
        <div className="flex flex-col w-full items-center">

            <div className="flex justify-between border-b-2 border-b-[var(--color-gray-fill)] w-full p-3 ">
                <h3 className='text-xl md:text-3xl uppercase font-bold'>Tra cứu biểu mẫu</h3>
                <SearchBar onSearch={onSearch}></SearchBar>
            </div>
            <BieuMauTable data={data}/>
        </div>
    )
}