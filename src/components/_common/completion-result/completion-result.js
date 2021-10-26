import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import palette from "../../../utils/palette";
import colors from "../../../constants/colors";
import "./completion-result.scss";

const getColor = (value) => (value === 100 ? colors.success : value >= 50 ? colors.primary : colors.danger);

const sizes = {
  "extra-small": 60,
  small: 75,
  medium: 100,
  large: 150,
};

const CompletionResult = ({ size = "medium", color, value, label }) => {
  const resultColor = color ?? getColor(value);

  return (
    <div className="completion-result">
      <div style={{ width: `${sizes[size]}px` }}>
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            strokeLinecap: "butt",
            pathColor: palette[resultColor].main,
            textColor: palette[resultColor].main,
            textSize: "20px",
          })}
        />
      </div>
      {!!label && (
        <div className="completion-result__label" style={{ color: `${palette[resultColor].main}` }}>
          {label}
        </div>
      )}
    </div>
  );
};

export default CompletionResult;
