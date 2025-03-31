'use client'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableContainer } from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';

// import dữ liệu từ file Data-bieu-mau.tsx
import dataBieuMau from "../../services/Data-bieu-mau"; 


// thong tin các cột trong table
const columns =[
    {id: 'stt', label: 'STT', width: '5%'},
    {id: 'bieumau', label: 'Tên Biểu mẫu', width: '60%'},
    {id: 'donVi', label: 'Đơn vị thực hiện', width: '25%'},
    {id: 'taixuong', label: 'Tải xuống', width: '10%'},
]


const theme = createTheme({
    components: {
      // Name of the component
      MuiTableCell: {
        styleOverrides: {
          // Name of the slot
          root: ({ theme }) => ({
            // ở màn hình nhỏ thì là 12px, tiêp là 16px và sau đó là 18px
            [theme.breakpoints.down('sm')]: {
              fontSize: '12px',
            },
            [theme.breakpoints.between('sm', 'md')]: {
              fontSize: '14px',
            },
            [theme.breakpoints.up('md')]: {
              fontSize: '16px',
            },
            // chữ đậm
            fontWeight: 'bold',
            // màu chữ
            color: '#000000',
            border:'2px solid var(--color-blue)',
            // size small
            padding: '5px'
          }),
        },
      },
    },
  });

const BieuMauTable =()=> {

    return(
        <ThemeProvider theme={theme}>
        <TableContainer sx={{
            width:'90%', 
            overflowX: { xs: 'auto', md: 'hidden' }
        }}>
            <Table sx={{ minWidth: { xs: '650px', md: '100%' } }}>
                <TableHead>
                    <TableRow>
                        {/* tạo header cho bảng */}
                        {columns.map((column)=>(<TableCell 
                        key={column.id} 
                        style={{width: column.width}} 
                        align= 'center'
                        className='uppercase'
                        >{column.label} </TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataBieuMau.map((row)=>(
                        <TableRow 
                        key={row.TenBM}>
                            {/* them 1 cột stt là tự tạo */}
                            <TableCell align='center'>{dataBieuMau.indexOf(row) + 1}</TableCell>
                            <TableCell>{row.TenBM}</TableCell>
                            <TableCell align="center">{row.TenPB}</TableCell>
                            <TableCell align="center">
                                {/* Tạo nút tải xuống cho mỗi biểu mẫu */}
                                <a href={row.Lienket} download>
                                    <button className='color-black'>
                                        <img src='/assets/icons/download.svg' alt="Tải xuống" width={25} height={25}/>
                                    </button>
                                </a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </ThemeProvider>
    )
}

export default BieuMauTable;