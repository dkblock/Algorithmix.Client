import React, { useMemo } from "react";
import { DataGrid, ruRU } from "@material-ui/data-grid";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import palette from "../../../utils/palette";
import prepareColumns from "./prepare-columns";
import "./Table.scss";

const theme = createMuiTheme({ palette }, ruRU);

const Table = ({ columns, data, actions, isFetching, pageSize = 20 }) => {
  const preparedColumns = useMemo(() => prepareColumns(columns, actions), [actions, columns]);

  return (
    <ThemeProvider theme={theme}>
      <DataGrid
        className="table"
        columns={preparedColumns}
        rows={data}
        sortingOrder={["desc", "asc"]}
        loading={isFetching}
        pageSize={pageSize}
        disableColumnMenu
        disableSelectionOnClick
      />
    </ThemeProvider>
  );
};

export default Table;
