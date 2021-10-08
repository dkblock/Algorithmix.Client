import React, { useCallback, useState } from "react";
import { makeStyles } from "@mui/styles";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemText from "@mui/material/ListItemText";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "../checkbox";
import Radio from "../radio";
import ListItemActions from "./list-item-actions";
import "./list.scss";

const useStyles = makeStyles({
  primary: {
    fontSize: "18px",
  },
  secondary: {
    fontSize: "14px",
  },
});

const ListItem = ({
  id,
  children,
  primaryText,
  secondaryText,
  isSelected,
  button = true,
  actions,
  onClick,
  onCheck,
  checked,
  checkControlType,
  Draggable,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const classes = useStyles();
  const className = isSelected ? "list-item list-item--selected" : "list-item";

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleCheck = useCallback((newValue) => {
    onCheck(id, newValue);
  }, [id, onCheck]);

  return (
    <MuiListItem
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      selected={isSelected}
      button={button}
    >
      {Draggable && (
        <MuiListItemIcon onMouseDown={(e) => e.stopPropagation()} className="list-item__draggable">
          <Draggable />
        </MuiListItemIcon>
      )}

      {onCheck && (
        <MuiListItemIcon>
          {checkControlType === "radio" ? (
            <Radio value={checked} label="" onChange={handleCheck} />
          ) : (
            <Checkbox value={checked} label="" onChange={handleCheck} />
          )}
        </MuiListItemIcon>
      )}

      {children ? (
        <MuiListItemText classes={classes}>{children}</MuiListItemText>
      ) : (
        <MuiListItemText classes={classes} primary={primaryText} secondary={secondaryText} />
      )}

      {actions && <ListItemActions actions={actions} visible={isHovered} setVisible={setIsHovered} />}
    </MuiListItem>
  );
};

export default ListItem;
