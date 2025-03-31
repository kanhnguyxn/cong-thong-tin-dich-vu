import BieuMauTable from "./Bieu-mau-table";

export default function BieuMauPage() {
    return(
        <div className="flex flex-col w-full justify-center items-center ">
            <div className="flex justify-between mb-4 border-b-2 border-b-[var(--color-gray-fill)] w-full p-3">
                <h1 className='text-xl md:text-3xl uppercase font-bold'>Tra cứu biểu mẫu</h1>
                <h1>tìm kiếm</h1>
            </div>
            <BieuMauTable/>
        </div>
       
    )
}