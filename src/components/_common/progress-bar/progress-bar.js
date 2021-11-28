import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiLinearProgress from "@mui/material/LinearProgress";
import colors from "../../../constants/colors";
import palette from "../../../utils/palette";
import "./progress-bar.scss";

const theme = createTheme({ palette });

const ProgressBar = ({ value, maxValue, color = colors.primary, label, square }) => {
  const progressBarValue = maxValue === 0 ? 0 : Math.floor((value / maxValue) * 100);

  return (
    <ThemeProvider theme={theme}>
      <div className="progress-bar__container">
        {label && (
          <div className="progress-bar__label">
            <span style={{ fontWeight: 600 }}>{label}</span> - {`${progressBarValue}% (${value})`}
          </div>
        )}
        <MuiLinearProgress
          sx={{ height: "8px", borderRadius: square ? 0 : "8px" }}
          value={progressBarValue}
          color={color}
          variant="determinate"
        />
      </div>
    </ThemeProvider>
  );
};

export default ProgressBar;
