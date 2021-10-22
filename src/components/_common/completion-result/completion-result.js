import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import palette from "../../../utils/palette";
import colors from "../../../constants/colors";

const sizes = {
  "extra-small": 50,
  "small": 75,
  "medium": 100,
  "large": 150,
};

const CompletionResult = ({ className, size = "medium", color = colors.primary, value }) => (
  <div className={className} style={{ width: `${sizes[size]}px` }}>
    <CircularProgressbar
      value={value}
      text={`${value}%`}
      styles={buildStyles({
        strokeLinecap: "butt",
        pathColor: palette[color].main,
        textColor: palette[color].main,
      })}
    />
  </div>
);

export default CompletionResult;
