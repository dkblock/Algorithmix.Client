import React, { useCallback, useState } from "react";
import { useAdminRole, useCurrentUser } from "../../../../hooks";
import roles from "../../../../constants/roles";
import Dropdown from "../../../_common/dropdown";

const roleItems = [
  { value: roles.administrator, label: "Администратор" },
  { value: roles.moderator, label: "Модератор" },
  { value: roles.user, label: "Пользователь" },
];

const RoleCell = ({ row, onUserUpdate }) => {
  const { currentUser } = useCurrentUser();
  const isAdmin = useAdminRole();
  const [role, setRole] = useState(row.role);

  const handleRoleChange = useCallback(
    (value) => {
      setRole(value);
      onUserUpdate(row.id, { ...row, role: value });
    },
    [onUserUpdate, row.id]
  );

  return isAdmin && currentUser.id !== row.id ? (
    <Dropdown className="w-100" value={role} items={roleItems} label="Роль" onChange={handleRoleChange} />
  ) : (
    roleItems.find((item) => item.value === role).label
  );
};

export default RoleCell;
