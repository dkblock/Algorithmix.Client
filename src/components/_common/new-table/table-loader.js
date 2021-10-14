import React from "react";
import TableCell from "@mui/material/TableCell";
import Loader from "../loader";

const TableLoader = ({ columns, onRowExpand }) => {
  const width = onRowExpand ? columns.length + 1 : columns.length;

  return (
    <tr>
      <TableCell align="center" colSpan={width} sx={{ borderBottom: "none" }}>
        <Loader />
      </TableCell>
    </tr>
  );
};

export default TableLoader;
