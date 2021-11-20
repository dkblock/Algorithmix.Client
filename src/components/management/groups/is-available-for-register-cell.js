import React, { useCallback, useState } from "react";
import { useAdminRole } from "../../../hooks";
import colors from "../../../constants/colors";
import { Icon, iconTypes } from "../../_common/icon";
import Switch from "../../_common/switch";

const IsAvailableForRegisterCell = ({ row, onGroupUpdate }) => {
  const isAdmin = useAdminRole();
  const [isAvailableForRegister, setIsAvailableForRegister] = useState(row.isAvailableForRegister);

  const handleIsAvailableForRegisterChange = useCallback(
    (value) => {
      setIsAvailableForRegister(value);
      onGroupUpdate({ ...row, isAvailableForRegister: value });
    },
    [onGroupUpdate, row]
  );

  return isAdmin ? (
    <Switch checked={isAvailableForRegister} onChange={handleIsAvailableForRegisterChange} />
  ) : (
    <Icon
      type={isAvailableForRegister ? iconTypes.done : iconTypes.clear}
      color={isAvailableForRegister ? colors.success : colors.danger}
    />
  );
};

export default IsAvailableForRegisterCell;
