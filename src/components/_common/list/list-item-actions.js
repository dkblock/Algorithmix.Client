import React, { useCallback, useState } from "react";
import Popover from "@mui/material/Popover";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import { Icon, IconButton, iconTypes } from "../icon";

const ListItemActions = ({ actions, visible, setVisible }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = useCallback((e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }, []);

  const handleMenuClose = useCallback(
    (e) => {
      e.stopPropagation();
      setAnchorEl(null);
      setVisible(false);
    },
    [setVisible]
  );

  const handleActionClick = useCallback(
    (e, action) => {
      handleMenuClose(e);
      action();
    },
    [handleMenuClose]
  );

  return actions.length === 1 ? (
    <div
      className="list-item__actions"
      onClick={(e) => handleActionClick(e, actions[0].onClick)}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <IconButton type={actions[0].icon} />
    </div>
  ) : (
    <>
      <div
        className={visible ? "grid-item__actions" : "grid-item__actions-hidden"}
        onClick={handleMenuOpen}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <IconButton type={iconTypes.more} />
      </div>
      <Popover
        id="list-item-actions-popover"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <div className="list-item__secondary-menu">
          {actions.map((action) => (
            <MuiMenuItem key={action.id} onClick={(e) => handleActionClick(e, action.onClick)}>
              <MuiListItemIcon>
                <Icon type={action.icon} />
              </MuiListItemIcon>
              {action.label}
            </MuiMenuItem>
          ))}
        </div>
      </Popover>
    </>
  );
};

export default ListItemActions;
