import React, { useCallback, useState } from "react";
import Switch from "../../_common/switch";

const IsAvailableForRegisterCell = ({ row, onGroupUpdate }) => {
  const [isAvailableForRegister, setIsAvailableForRegister] = useState(row.isAvailableForRegister);

  const handleIsAvailableForRegisterChange = useCallback(
    (value) => {
      setIsAvailableForRegister(value);
      onGroupUpdate({ ...row, isAvailableForRegister: value });
    },
    [onGroupUpdate, row]
  );

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Switch checked={isAvailableForRegister} onChange={handleIsAvailableForRegisterChange} />
    </div>
  );
};

export default IsAvailableForRegisterCell;
