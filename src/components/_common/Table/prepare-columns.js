import React from "react";
import { IconButton } from "../Icon";
import Tooltip from "../Tooltip";

const getActionsCell = (actions) => {
  const handleClick = (e, onClick) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div className="table__actions-cell">
      {actions.map((action) => (
        <Tooltip key={action.label} title={action.label} placement="bottom">
          <IconButton type={action.icon} onClick={(e) => handleClick(e, action.onClick)} />
        </Tooltip>
      ))}
    </div>
  );
};

const prepareColumns = (columns, actions) => {
  let preparedColumns = columns;

  if (actions)
    preparedColumns = [
      ...preparedColumns,
      {
        field: "TABLE_ACTIONS",
        headerName: "Действия",
        headerAlign: "center",
        width: actions.length * 50,
        renderCell: () => getActionsCell(actions),
      },
    ];

  return preparedColumns;
};

export default prepareColumns;
