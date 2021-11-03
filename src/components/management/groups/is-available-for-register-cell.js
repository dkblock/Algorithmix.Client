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

  return <Switch checked={isAvailableForRegister} onChange={handleIsAvailableForRegisterChange} />;
};

export default IsAvailableForRegisterCell;
