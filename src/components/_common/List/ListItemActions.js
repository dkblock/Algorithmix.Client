import React, { useCallback, useState } from "react";
import Popover from "@material-ui/core/Popover";
import MuiMenuItem from "@material-ui/core/MenuItem";
import MuiListItemIcon from "@material-ui/core/ListItemIcon";
import { Icon, IconButton, iconTypes } from "../Icon";

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
    <div className="list-item__actions" onClick={(e) => handleActionClick(e, actions[0].onClick)}>
      <IconButton type={actions[0].icon} />
    </div>
  ) : (
    <>
      <div className={visible ? "list-item__actions" : "list-item__actions-hidden"} onClick={handleMenuOpen}>
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
