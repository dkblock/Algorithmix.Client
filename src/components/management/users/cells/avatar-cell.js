import React from "react";
import Avatar from "../../../_common/avatar";

const AvatarCell = ({ row }) => {
  const name = row.fullName.split(" ");
  return <Avatar firstName={name[0][0]} lastName={name[1][0]} />;
};

export default AvatarCell;
