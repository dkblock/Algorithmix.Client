import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";
import MuiListItemText from "@material-ui/core/ListItemText";
import MuiListItemIcon from "@material-ui/core/ListItemIcon";
import Badge from "../Badge";
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
  className,
  children,
  primaryText,
  secondaryText,
  isSelected,
  index,
  button = true,
  actions,
  onClick,
  onCheck,
  checked,
  checkControlType,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const classes = useStyles();

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <MuiListItem
      className={`list-item ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      selected={isSelected}
      button={button}
    >
      {index && (
        <MuiListItemIcon>
          <Badge content={index} color={isSelected ? "primary" : "secondary"} />
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
