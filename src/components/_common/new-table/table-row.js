import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Collapse from "@mui/material/Collapse";
import { IconButton, iconTypes } from "../icon";

const EnhancedTableRow = ({ row, columns, onClick, onExpand }) => {
  const rowBorder = "1px solid rgba(224, 224, 224, 1)";
  const expandable = Boolean(onExpand);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleRowClick = () => {
    if (expandable) {
      setIsExpanded((prevState) => !prevState);
    }
  };

  const handleExpandIconClick = (e) => {
    e.stopPropagation();
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <>
      <TableRow
        key={row.id}
        tabIndex={-1}
        hover
        onClick={(e) => handleRowClick(e)}
        sx={{ cursor: expandable ? "pointer" : "default" }}
      >
        {expandable && (
          <TableCell style={{ width: 50 }}>
            <IconButton
              type={isExpanded ? iconTypes.arrowDown : iconTypes.arrowRight}
              onClick={(e) => handleExpandIconClick(e)}
            />
          </TableCell>
        )}
        {columns.map((column) => (
          <TableCell align={column.align ?? "left"}>
            {column.renderCell ? column.renderCell(row) : row[column.id]}
          </TableCell>
        ))}
      </TableRow>
      {expandable && (
        <TableRow>
          <TableCell sx={{ padding: 0, borderBottom: isExpanded ? rowBorder : "none" }} colSpan={columns.length + 1}>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              {onExpand(row)}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default EnhancedTableRow;
