import React, { useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "./table-head";
import TableToolbar from "./table-toolbar";
import TableRow from "./table-row";
import TableLoader from "./table-loader";
import TableEmpty from "./table-empty";
import { prepareColumns } from "./prepare-columns";
import "./table.scss";

const Table = ({
  columns,
  data,
  toolbar,
  actions,
  totalCount,
  isFetching,
  emptyText,
  pageIndex,
  pageSize,
  sortBy,
  sortDirection,
  onSort,
  onRowExpand,
  onPageChange,
}) => {
  const [orderBy, setOrderBy] = useState(sortBy);
  const [order, setOrder] = useState(sortDirection);
  const [page, setPage] = useState(pageIndex - 1);

  const handleSort = (columnId) => {
    const newOrder = orderBy === columnId && order === "asc" ? "desc" : "asc";

    setOrder(newOrder);
    setOrderBy(columnId);
    onSort({ sortBy: columnId, sortDirection: newOrder });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onPageChange(newPage + 1);
  };

  const preparedColumns = prepareColumns(columns, actions, onSort);
  const columnsCount = onRowExpand ? preparedColumns.length + 1 : preparedColumns.length;

  return (
    <div className="table-root">
      {toolbar}
      <div className="table-body">
        <table className={isFetching ? "w-100 h-100 table-main" : "w-100 table-main"}>
          <TableHead
            columns={preparedColumns}
            order={order}
            orderBy={orderBy}
            expandable={Boolean(onRowExpand)}
            onSort={handleSort}
          />
          <tbody>
            {isFetching && <TableLoader columnsCount={columnsCount} />}
            {!isFetching && data.length === 0 && <TableEmpty emptyText={emptyText} columnsCount={columnsCount} />}
            {!isFetching &&
              data.length > 0 &&
              data.map((row) => <TableRow key={row.id} row={row} columns={preparedColumns} onExpand={onRowExpand} />)}
          </tbody>
        </table>
      </div>
      {!!onPageChange && (
        <TablePagination
          component="div"
          rowsPerPageOptions={[-1]}
          page={page}
          rowsPerPage={pageSize}
          count={totalCount}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
          onPageChange={handleChangePage}
        />
      )}
    </div>
  );
};

Table.Toolbar = TableToolbar;
export default Table;
