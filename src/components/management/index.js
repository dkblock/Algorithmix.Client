import React from "react";
import { Paper } from "@material-ui/core";
import TestList from "./tests/TestList";
import "./Management.scss";

const Management = () => {
  return (
    <div className="management">
      <Paper className="management__content">
        <TestList />
      </Paper>
    </div>
  );
};

export default Management;
