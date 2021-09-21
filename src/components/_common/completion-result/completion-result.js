import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import palette from "../../../utils/palette";
import "./completion-result.scss";

const theme = createTheme({ palette });

const CompletionResult = ({ className, color = "primary", size = "medium", value, label }) => (
  <ThemeProvider theme={theme}>
    <div className={`completion-result ${className}`}>
      <div className={className}>
        <div className={`completion-result__back completion-result__back--${size}`} />
        <CircularProgress
          className={`completion-result__front--${size}`}
          color={color}
          variant="determinate"
          value={value}
        />
      </div>
      <div className="completion-result__info">
        <span className="completion-result__label">{label}</span>
        <span className="completion-result__result">{value}%</span>
      </div>
    </div>
  </ThemeProvider>
);

export default CompletionResult;
