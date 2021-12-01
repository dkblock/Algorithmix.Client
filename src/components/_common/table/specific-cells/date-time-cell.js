import React from "react";
import { getMomentFromNow, stringifyDateTime } from "../../../../utils/moment";
import Tooltip from "../../tooltip";

const DateTimeCell = ({ dateTime }) => (
  <div style={{ display: "inline-block" }}>
    <Tooltip title={stringifyDateTime(dateTime)}>
      <div>{getMomentFromNow(dateTime)}</div>
    </Tooltip>
  </div>
);

export default DateTimeCell;
