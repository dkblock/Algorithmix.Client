import React from "react";
import { Icon, iconTypes } from "../../_common/icon";
import colors from "../../../constants/colors";

const HasDataCell = ({ hasData }) => (
  <Icon type={hasData ? iconTypes.done : iconTypes.clear} color={hasData ? colors.success : colors.danger} />
);

export default HasDataCell;