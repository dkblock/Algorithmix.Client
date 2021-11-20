import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useAdminRole } from "../../../../hooks";
import Dropdown from "../../../_common/dropdown";

const GroupCell = ({ row, onUserUpdate }) => {
  const { groups } = useSelector((state) => state.group);
  const [groupId, setGroupId] = useState(row.groupId);
  const isAdmin = useAdminRole();

  const availableGroups = useMemo(() => (groups.length > 0 ? groups : [{ id: 1, name: "Не назначена" }]), [groups]);
  const groupItems = availableGroups.map((group) => ({ value: group.id, label: group.name }));

  const handleGroupIdChange = useCallback(
    (value) => {
      setGroupId(value);
      onUserUpdate(row.id, { ...row, groupId: value });
    },
    [onUserUpdate, row.id]
  );

  return isAdmin ? (
    <Dropdown className="w-100" value={groupId} items={groupItems} label="Группа" onChange={handleGroupIdChange} />
  ) : (
    groupItems.find((group) => group.value === groupId).label
  );
};

export default GroupCell;
