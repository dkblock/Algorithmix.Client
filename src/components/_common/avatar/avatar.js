import React from "react";
import { makeStyles } from "@mui/styles";
import MuiAvatar from "@mui/material/Avatar";
import palette from "../../../utils/palette";

const useStyles = makeStyles(() => ({
  primary: {
    color: palette.primary.contrastText,
    backgroundColor: `${palette.primary.main} !important`,
    width: "36px !important",
    height: "36px !important",
    fontSize: "18px !important",
  },
}));

const Avatar = ({ className, firstName, lastName, onClick }) => {
  const classes = useStyles();
  return (
    <MuiAvatar className={`${className} ${classes.primary}`} onClick={onClick ?? null}>
      {firstName[0]}
      {lastName[0]}
    </MuiAvatar>
  );
};

export default Avatar;
