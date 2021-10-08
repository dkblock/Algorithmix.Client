import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const EnhancedTableRow = ({ row, columns, onClick }) => {
  return (
    <TableRow key={row.id} tabIndex={-1} hover onClick={(event) => onClick(event, row.name)}>
      {columns.map((column) => (
        <TableCell align={column.align ?? "left"}>
          {column.renderCell ? column.renderCell(row) : row[column.id]}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default EnhancedTableRow;
