import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import palette from "../../../utils/palette";
import "./CompletionResult.scss";

const theme = createMuiTheme({ palette });

const CompletionResult = ({ className, color = "primary", size = "medium", value, label }) => (
  <MuiThemeProvider theme={theme}>
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
  </MuiThemeProvider>
);

export default CompletionResult;
