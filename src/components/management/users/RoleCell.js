import React, { useCallback, useState } from "react";
import { useCurrentUser } from "../../../hooks";
import roles from "../../../constants/roles";
import Dropdown from "../../_common/Dropdown";

const roleItems = [
  { value: roles.administrator, label: "Администратор" },
  { value: roles.moderator, label: "Модератор" },
  { value: roles.user, label: "Пользователь" },
];

const RoleCell = ({ row, onUserUpdate }) => {
  const { currentUser } = useCurrentUser();
  const [role, setRole] = useState(row.role);

  const handleRoleChange = useCallback(
    (value) => {
      setRole(value);
      onUserUpdate(row.id, { role: value });
    },
    [onUserUpdate, row.id]
  );

  return currentUser.id !== row.id ? (
    <Dropdown className="w-100" value={role} items={roleItems} onChange={handleRoleChange} />
  ) : (
    roleItems.find((item) => item.value === role).label
  );
};

export default RoleCell;
