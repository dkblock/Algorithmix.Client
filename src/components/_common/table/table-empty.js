import React from "react";
import TableCell from "@mui/material/TableCell";

const TableEmpty = ({ emptyText, columnsCount }) => (
  <tr>
    <TableCell align="center" colSpan={columnsCount} sx={{ borderBottom: "none" }}>
      <div className="mt-5">{emptyText ?? "Нет данных"}</div>
    </TableCell>
  </tr>
);

export default TableEmpty;
