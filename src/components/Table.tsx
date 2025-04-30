import { Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableContainer } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface CustomTableProps {
  columns: Array<{ id: string; label: string; width?: string }>;
  data?: Array<{ [key: string]: any }>;
  tableCellStyles?: (columnId: string, row: any) => any | any;
  tableHeaderStyles?: any | ((columnId: string) => any);
  tableBodyStyles?: any | ((row: any) => any);
}

export default function CustomTable({
  columns,
  data,
  tableCellStyles,
  tableHeaderStyles,
  tableBodyStyles,
}: CustomTableProps) {
  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: ({ theme }) => ({
            [theme.breakpoints.down("sm")]: {
              fontSize: "12px",
            },
            [theme.breakpoints.between("sm", "md")]: {
              fontSize: "14px",
            },
            [theme.breakpoints.up("md")]: {
              fontSize: "16px",
            },
            fontWeight: "bold",
            color: "#000000",
            border: "2px solid var(--color-blue)",
            padding: "5px",
          }),
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: ({ theme }) => ({
            padding: "10px 0px",
          }),
        },
      },
    },
  });

  // Handle dynamic styles for table cell, header, and body
  const getTableCellStyles = (columnId: string, row: any) => {
    if (typeof tableCellStyles === "function") {
      return tableCellStyles(columnId, row);
    }
    return tableCellStyles || {};
  };

  const getTableHeaderStyles = (columnId: string) => {
    if (typeof tableHeaderStyles === "function") {
      return tableHeaderStyles(columnId);
    }
    return tableHeaderStyles || {};
  };

  const getTableBodyStyles = (row: any) => {
    if (typeof tableBodyStyles === "function") {
      return tableBodyStyles(row);
    }
    return tableBodyStyles || {};
  };

  return (
    <ThemeProvider theme={theme}>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: { xs: "auto", md: "hidden" },
        }}
      >
        <Table sx={{ minWidth: { xs: "650px", md: "100%" } }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  sx={{
                    width: column?.width,
                    ...getTableHeaderStyles(column.id),
                  }}
                  className="uppercase"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <TableRow key={row.id || index} sx={getTableBodyStyles(row)}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={getTableCellStyles(column.id, row)}
                  >
                    {row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
