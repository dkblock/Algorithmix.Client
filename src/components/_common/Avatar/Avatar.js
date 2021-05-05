import React from "react";
import { makeStyles } from "@material-ui/core";
import MuiAvatar from "@material-ui/core/Avatar";
import palette from "../../../utils/palette";

const useStyles = makeStyles(() => ({
  primary: {
    color: palette.primary.contrastText,
    backgroundColor: palette.primary.light,
    width: "36px",
    height: "36px",
    fontSize: "18px",
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
