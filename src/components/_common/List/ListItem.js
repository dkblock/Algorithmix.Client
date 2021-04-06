import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core";
import MuiMenuItem from "@material-ui/core/MenuItem";
import MuiListItem from "@material-ui/core/ListItem";
import MuiListItemText from "@material-ui/core/ListItemText";
import MuiListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import MuiListItemIcon from "@material-ui/core/ListItemIcon";
import Popover from "@material-ui/core/Popover";
import { Icon, IconButton, iconTypes } from "../Icon";
import Badge from "../Badge";
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
  className,
  primaryText,
  secondaryText,
  isSelected,
  index,
  isDraggable = false,
  actions,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleMenuOpen = useCallback((e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setIsHovered(false);
  }, []);

  const handleMenuClose = useCallback((e) => {
    e.stopPropagation();
    setAnchorEl(null);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleSecondaryAction = useCallback((e, action) => {
    handleMenuClose(e);
    action();
  }, [handleMenuClose]);

  return (
    <MuiListItem
      className={`list-item ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      selected={isSelected}
      button={!isDraggable}
    >
      <MuiListItemIcon>
        <Badge content={index} color={isSelected ? "primary" : "secondary"} />
      </MuiListItemIcon>
      <MuiListItemText classes={classes} primary={primaryText} secondary={secondaryText} />

      {actions &&
        (actions.length === 1 ? (
          <MuiListItemSecondaryAction onClick={(e) => handleSecondaryAction(e, actions[0].onClick)}>
            <IconButton type={actions[0].icon} />
          </MuiListItemSecondaryAction>
        ) : (
          <>
            <MuiListItemSecondaryAction
              className={isHovered ? "list-item__secondary--hovered" : "list-item__secondary"}
              onClick={handleMenuOpen}
            >
              <IconButton type={iconTypes.more} />
            </MuiListItemSecondaryAction>
            <Popover
              id="list-item-popover"
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <div className="list-item__secondary-menu">
                {actions.map((action) => (
                  <MuiMenuItem key={action.id} onClick={(e) => handleSecondaryAction(e, action.onClick)}>
                    <MuiListItemIcon>
                      <Icon type={action.icon} />
                    </MuiListItemIcon>
                    {action.label}
                  </MuiMenuItem>
                ))}
              </div>
            </Popover>
          </>
        ))}
    </MuiListItem>
  );
};

export default ListItem;
