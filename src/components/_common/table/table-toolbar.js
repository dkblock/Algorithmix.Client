import React from "react";
import { GridToolbarContainer } from "@material-ui/data-grid";
import { Divider } from "@material-ui/core";

const TableToolbar = ({ children, title, count }) => {
  return (
    <GridToolbarContainer>
      <div className="table-toolbar-container">
        <div className="table-toolbar">
          <div className="table-toolbar__title">
            {title} {count ? <span className="table-toolbar__title-count">({count})</span> : ""}
          </div>
          {children}
        </div>
        <Divider/>
      </div>
    </GridToolbarContainer>
  );
};

export default TableToolbar;
