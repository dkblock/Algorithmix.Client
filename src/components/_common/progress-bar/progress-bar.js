import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiLinearProgress from "@mui/material/LinearProgress";
import colors from "../../../constants/colors";
import palette from "../../../utils/palette";

const theme = createTheme({ palette });

const ProgressBar = ({ value, maxValue, color = colors.primary, label }) => {
  const progressBarValue = Math.floor((value / maxValue) * 100) ;

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div>
          <span style={{ fontWeight: 600 }}>{label}</span> - {`${value} (${progressBarValue}%)`}
        </div>
        <MuiLinearProgress value={maxValue === 0 ? 0 : progressBarValue} color={color} variant="determinate" />
      </div>
    </ThemeProvider>
  );
};

export default ProgressBar;
