import React from "react";
import { makeStyles } from "@material-ui/core";
import MuiTooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

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
