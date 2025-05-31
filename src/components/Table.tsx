"use client";

// tuong tac voi du lieu chon ( tim trong displayData )
// 1. xu ly du lieu duoc tick chon ( oke )
// 2. dua du lieu len redux ( oke )
// 3. goi du lieu tu redux de dua vo ham xu ly ( them, xoa , sua )

import { Checkbox, Table, TableContainer } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";

interface CustomTableProps {
  columns: Array<{ id: string; label: string; width?: string }>;
  data?: Array<{ [key: string]: any }>;
  tableCellStyles?: (columnId: string, row: any) => any | any;
  tableHeaderStyles?: any | ((columnId: string) => any);
  tableBodyStyles?: any | ((row: any) => any);
  hasSelective?: boolean;
  handleSelected?: (data: any[]) => void;
}

export default function CustomTable({
  columns,
  data,
  tableCellStyles,
  tableHeaderStyles,
  tableBodyStyles,
  hasSelective = false,
  handleSelected,
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
          root: {
            padding: "10px 0px",
          },
        },
      },
    },
  });

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

  const [displayData, setDisplayData] = React.useState([]);

  // khoi tao du lieu displayData
  useEffect(() => {
    setDisplayData(
      hasSelective ? data?.map((row) => ({ ...row, selected: false })) : data
    );
  }, [data]);

  // Gọi handeleChange khi displayData thay đổi
  useEffect(() => {
    if (!hasSelective || !handleSelected || !displayData) return;

    const selectedRows = displayData?.filter((row) => row.selected);
    handleSelected(selectedRows);
  }, [displayData]);

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
              {hasSelective && (
                <SelectiveCell
                  checked={
                    displayData.length > 0 &&
                    displayData.every((row) => row.selected)
                  }
                  onChange={(checked) => {
                    const _data = displayData.map((row) => ({
                      ...row,
                      selected: checked,
                    }));
                    setDisplayData(_data);
                  }}
                />
              )}
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
            {displayData?.map((row, index) => (
              <TableRow key={row.id || index} sx={getTableBodyStyles(row)}>
                {hasSelective && (
                  <SelectiveCell
                    checked={row?.selected || false}
                    onChange={() => {
                      const _data = displayData.map((item) => {
                        if (item.stt === row.stt) {
                          return { ...item, selected: !item.selected };
                        }
                        return item;
                      });
                      setDisplayData(_data);
                    }}
                  />
                )}
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

interface SelectiveCellProps {
  onChange?: (check: boolean) => void;
  checked?: boolean;
}

export const SelectiveCell = ({
  onChange,
  checked = false,
}: SelectiveCellProps) => {
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <TableCell
      key="selective"
      align="center"
      sx={{
        width: "5ch",
      }}
    >
      <Checkbox
        checked={checked}
        sx={{ color: "var(--color-blue)" }}
        onChange={handleOnchange}
      />
    </TableCell>
  );
};
