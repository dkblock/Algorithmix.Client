import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import { Icon } from "../icon";
import buttonTypes from "../../../constants/button-types";
import colors from "../../../constants/colors";
import palette from "../../../utils/palette";
import "./button.scss";

const theme = createTheme({ palette });

const Button = ({ className, type, color, startIcon, endIcon, disabled, onClick, children }) => {
  const buttonType = type ?? buttonTypes.contained;
  const buttonColor = color ?? colors.primary;

  return (
    <ThemeProvider theme={theme}>
      <MuiButton
        className={`${className} button`}
        variant={buttonType}
        color={buttonColor}
        onClick={onClick}
        startIcon={startIcon ? <Icon type={startIcon} /> : null}
        endIcon={endIcon ? <Icon type={endIcon} /> : null}
        disabled={disabled}
      >
        {children}
      </MuiButton>
    </ThemeProvider>
  );
};

export default Button;