import React, { useMemo } from "react";
import { DataGrid, ruRU } from "@material-ui/data-grid";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import palette from "../../../utils/palette";
import prepareColumns from "./prepare-columns";
import "./Table.scss";

const theme = createMuiTheme({ palette }, ruRU);

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
