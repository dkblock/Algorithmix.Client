import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Button as MuiButton } from "@material-ui/core";
import { ButtonIcon } from "../Icon";
import palette from "../../../styles/palette";
import "./Button.scss";

const theme = createMuiTheme({ palette });

const Button = ({ className, type, color, icon, onClick, children }) => {
    const buttonType = type ?? "contained";
    const buttonColor = color ?? "primary";

    return (
        <ThemeProvider theme={theme}>
            <MuiButton
                className={`${className} button`}
                variant={buttonType}
                color={buttonColor}
                onClick={onClick}
                endIcon={icon ? <ButtonIcon type={icon}/> : null}
            >
                {children}
            </MuiButton>
        </ThemeProvider>
    );
};

export default Button;