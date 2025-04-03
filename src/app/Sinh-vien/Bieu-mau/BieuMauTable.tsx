'use client'

import CustomTable from "@components/Table";
// import dữ liệu từ file Data-bieu-mau.tsx

// thong tin các cột trong table
const columns =[
    {id: 'stt', label: 'STT', width: '5ch'},
    {id: 'bieumau', label: 'Tên Biểu mẫu'},
    {id: 'donVi', label: 'Đơn vị thực hiện', width: '18ch'},
    {id: 'taixuong', label: 'Tải xuống', width: '10ch'},
]

const BieuMauTable = ({ data }) => {
    // Format data to match the expected structure for CustomTable
    const formattedData = data.map((row, index) => ({
        stt: index + 1,
        bieumau: row.TenBM,
        donVi: row.TenPB,
        taixuong: (
            <a href={row.Lienket} download>
                <button className='color-black'>
                    <img src='/assets/icons/download.svg' alt="Tải xuống" width={25} height={25}/>
                </button>
            </a>
        )
    }));

    // Set the style to center align specific columns
    const tableCellStyles = {
        '&[data-column-id="stt"]': { textAlign: 'center' },
        '&[data-column-id="donVi"]': { textAlign: 'center' },
        '&[data-column-id="taixuong"]': { textAlign: 'center' }
    };

    return <CustomTable columns={columns} data={formattedData} tableCellStyles={tableCellStyles} />;
}

export default BieuMauTable;