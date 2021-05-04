import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Dropdown from "../../_common/Dropdown";

const GroupCell = ({ row, onUserUpdate }) => {
  const { groups } = useSelector((state) => state.group);
  const [groupId, setGroupId] = useState(row.groupId);

  const availableGroups = useMemo(
    () => (groups.length > 0 ? groups : [{ id: 1, name: "Не назначена" }]),
    [groups]
  );
  const groupItems = availableGroups.map((group) => ({ value: group.id, label: group.name }));

  const handleGroupIdChange = useCallback(
    (value) => {
      setGroupId(value);
      onUserUpdate(row.id, { groupId: value });
    },
    [onUserUpdate, row.id]
  );

  return <Dropdown className="w-100" value={groupId} items={groupItems} onChange={handleGroupIdChange} />;
};

export default GroupCell;
