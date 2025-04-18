import { Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableContainer } from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';



interface CustomTableProps {
    columns: Array<{ id: string; label: string; width?: string }>;
    data: Array<{ [key: string]: any }> | undefined;
    tableCellStyles?: any;
}

export default function CustomTable ({columns, data,tableCellStyles}: CustomTableProps) {
    const theme = createTheme({
        components: {
          MuiTableCell: {
            styleOverrides: {
              root: ({ theme }) => ({
                [theme.breakpoints.down('sm')]: {
                  fontSize: '12px',
                },
                [theme.breakpoints.between('sm', 'md')]: {
                  fontSize: '14px',
                },
                [theme.breakpoints.up('md')]: {
                  fontSize: '16px',
                },
                fontWeight: 'bold',
                color: '#000000',
                border:'2px solid var(--color-blue)',
                padding: '5px'
              }),
            },
          },
          MuiTableContainer:{
           styleOverrides:{
            root: ({ theme }) => ({
              padding: '10px 0px',
              }),
           }
          }
        },
      });


    return(
        <ThemeProvider theme={theme}>
            <TableContainer sx={{
                width:'100%', 
                overflowX: { xs: 'auto', md: 'hidden' }
            }}>
                <Table sx={{ minWidth: { xs: '650px', md: '100%' } }}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell 
                                key={column.id} 
                                align="center" 
                                sx={{width: column?.width}}
                                className='uppercase'
                                >{column.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                {columns.map((column) => (
                                    <TableCell 
                                        key={column.id} 
                                        sx={tableCellStyles} 
                                        data-column-id={column.id}>
                                        {row[column.id]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    )
}
