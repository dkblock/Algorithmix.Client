import React from "react";
import { Divider } from "@mui/material";

const TableToolbar = ({ children, title, count }) => {
  return (
    <div className="table-toolbar-container">
      <div className="table-toolbar">
        <div className="table-toolbar__title">
          {title} {count ? <span className="table-toolbar__title-count">({count})</span> : ""}
        </div>
        {children}
      </div>
      <Divider />
    </div>
  );
};

export default TableToolbar;
