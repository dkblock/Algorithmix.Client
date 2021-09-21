import React from "react";
import { makeStyles } from "@mui/styles";
import MuiTooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

const useStyles = makeStyles(() => ({
  arrow: {
    color: "#000",
  },
  tooltip: {
    backgroundColor: "#000",
    fontSize: "12px"
  },
}));

const Tooltip = ({ children, title, placement }) => {
  const classes = useStyles();
  return (
    <MuiTooltip classes={classes} title={title} placement={placement} arrow TransitionComponent={Zoom}>
      <div>{children}</div>
    </MuiTooltip>
  );
};

export default Tooltip;
