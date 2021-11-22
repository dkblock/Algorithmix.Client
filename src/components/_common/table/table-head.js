import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";

const EnhancedTableHead = ({ columns, order, orderBy, expandable, onSort }) => (
  <TableHead className="table-head">
    <TableRow>
      {expandable && <TableCell width={75} />}
      {columns.map((column) => (
        <TableCell
          key={column.id}
          style={{ paddingLeft: column.sortable && column.align === "center" ? "34px" : "16px" }}
          className="table-cell"
          align={column.align ?? "left"}
          sortDirection={orderBy === column.id ? order : false}
          width={column.width}
        >
          {column.sortable ? (
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : "asc"}
              onClick={() => onSort(column.id)}
            >
              {column.label}
            </TableSortLabel>
          ) : (
            <span className="MuiTableSortLabel-root">{column.label}</span>
          )}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

export default EnhancedTableHead;
