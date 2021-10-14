import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";

const EnhancedTableHead = ({ columns, order, orderBy, expandable, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="table-head">
      <TableRow>
        {expandable && <TableCell width={75} />}
        {columns.map((column) => (
          <TableCell
            key={column.id}
            className="table-cell"
            align={column.align ?? "left"}
            sortDirection={orderBy === column.id ? order : false}
            width={column.width}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : "asc"}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
