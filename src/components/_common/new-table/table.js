import React, { useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "./table-head";
import TableToolbar from "./table-toolbar";
import TableRow from "./table-row";
import { prepareColumns } from "./prepare-columns";
import "./table.scss";

const Table = ({ columns, data, toolbar, actions }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const preparedColumns = prepareColumns(columns, actions);

  return (
    <div className="table-root">
      {toolbar}
      <div className="table-body">
        <table className="w-100">
          <TableHead columns={preparedColumns} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <tbody>
          {data.map((row) => (
            <TableRow row={row} columns={preparedColumns} onClick={handleClick} />
          ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        rowsPerPageOptions={[-1]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

Table.Toolbar = TableToolbar;
export default Table;