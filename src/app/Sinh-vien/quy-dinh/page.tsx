import DropDownLists from "./dropDownLists"
export default function QuyDinhPage() {
    return (
        <div className="flex flex-col w-full justify-center items-center ">
            <div className="flex justify-between mb-4 border-b-2 border-b-[var(--color-gray-fill)] w-full p-3">
                <h3 className='text-xl md:text-3xl uppercase font-bold'>Quy định</h3>
            </div>
            
            <DropDownLists/>
            <div className="flex flex-col w-full p-4 gap-4">
                <p className="text-lg">Đang cập nhật...</p>
            </div>
        </div>
    )
}