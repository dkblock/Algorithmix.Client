import React, { useMemo } from "react";
import { DataGrid, ruRU } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import palette from "../../../utils/palette";
import prepareColumns from "./prepare-columns";
import "./table.scss";

const theme = createTheme({ palette }, ruRU);

const Table = ({ columns, data, toolbar, actions, isFetching, sortBy, sortDirection, pageSize = 20 }) => {
  const preparedColumns = useMemo(() => prepareColumns(columns, actions), [actions, columns]);

  return (
    <ThemeProvider theme={theme}>
      <DataGrid
        className="table"
        components={{ Toolbar: () => toolbar }}
        columns={preparedColumns}
        rows={data}
        sortingOrder={["desc", "asc"]}
        sortModel={sortBy ? [{ field: sortBy, sort: sortDirection }] : null}
        loading={isFetching}
        pageSize={pageSize}
        disableColumnMenu
        disableSelectionOnClick
      />
    </ThemeProvider>
  );
};

export default Table;
