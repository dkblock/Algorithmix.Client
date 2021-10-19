import React from "react";
import { IconButton } from "../icon";
import Tooltip from "../tooltip";

const getActionsCell = (actions, row) => {
  const handleClick = (e, onClick) => {
    e.stopPropagation();
    onClick(row);
  };

  return (
    <div className="table-actions-cell">
      {actions.map((action) => (
        <Tooltip key={action.label} title={action.label} placement="bottom">
          <IconButton type={action.icon} onClick={(e) => handleClick(e, action.onClick)} />
        </Tooltip>
      ))}
    </div>
  );
};

export const prepareColumns = (columns, actions, onSort) => {
  const preparedColumns = columns.map((column) => ({
    ...column,
    sortable: Boolean(onSort) && column.sortable !== false,
  }));

  if (actions)
    preparedColumns.push({
      id: "TABLE_ACTIONS",
      label: "",
      align: "center",
      width: actions.length * 60,
      sortable: false,
      renderCell: (row) => getActionsCell(actions, row),
    });

  return preparedColumns;
};
