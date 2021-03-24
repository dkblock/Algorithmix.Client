import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Button as MuiButton } from "@material-ui/core";
import { ButtonIcon } from "../Icon";
import buttonColors from "./button-colors";
import buttonTypes from "./button-types";
import palette from "../../../styles/palette";
import "./Button.scss";

const theme = createMuiTheme({ palette });

const Button = ({ className, type, color, startIcon, endIcon, onClick, children }) => {
    const buttonType = type ?? buttonTypes.contained;
    const buttonColor = color ?? buttonColors.primary;

    return (
        <ThemeProvider theme={theme}>
            <MuiButton
                className={`${className} button`}
                variant={buttonType}
                color={buttonColor}
                onClick={onClick}
                startIcon={startIcon ? <ButtonIcon type={startIcon}/> : null}
                endIcon={endIcon ? <ButtonIcon type={endIcon}/> : null}
            >
                {children}
            </MuiButton>
        </ThemeProvider>
    );
};

export default Button;