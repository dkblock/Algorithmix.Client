import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import { Icon } from "../icon";
import { Loader } from "../loader";
import buttonTypes from "../../../constants/button-types";
import colors from "../../../constants/colors";
import palette from "../../../utils/palette";
import "./button.scss";

const theme = createTheme({ palette });

const Button = ({
  className,
  type = buttonTypes.contained,
  color = colors.primary,
  startIcon,
  endIcon,
  isLoading,
  loadingPosition = "end",
  disabled,
  onClick,
  children,
}) => (
  <ThemeProvider theme={theme}>
    <MuiButton
      className={`${className} button`}
      variant={type}
      color={color}
      disabled={disabled || isLoading}
      onClick={onClick}
      startIcon={
        isLoading && loadingPosition === "start" ? (
          <Loader size="extra-small" color={colors.gray} />
        ) : startIcon ? (
          <Icon type={startIcon} />
        ) : null
      }
      endIcon={
        isLoading && loadingPosition === "end" ? (
          <Loader size="extra-small" color={colors.gray} />
        ) : endIcon ? (
          <Icon type={endIcon} />
        ) : null
      }
    >
      {children}
    </MuiButton>
  </ThemeProvider>
);

export default Button;
