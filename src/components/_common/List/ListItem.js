import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";
import MuiListItemText from "@material-ui/core/ListItemText";
import MuiListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "../Checkbox";
import Radio from "../Radio";
import ListItemActions from "./ListItemActions";
import "./List.scss";

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
            <Radio value={checked} onChange={() => onCheck(id)} />
          ) : (
            <Checkbox value={checked} onChange={() => onCheck(id)} />
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
