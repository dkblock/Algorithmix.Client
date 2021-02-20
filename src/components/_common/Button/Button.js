import React from "react";
import { Button as MuiButton } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import cn from "classnames";
import palette from "../../../styles/palette";
import "./Button.scss";

const theme = (color) => createMuiTheme({
    palette: {
        primary: palette[color]
    }
});

const Button = ({ className, type, color, onClick, children }) => {
    const buttonType = type ?? "contained";
    const buttonColor = color ?? "primary";

    return (
        <ThemeProvider theme={theme(buttonColor)}>
            <MuiButton
                className={cn(className, "button")}
                variant={buttonType}
                color="primary"
                onClick={onClick}
            >
                {children}
            </MuiButton>
        </ThemeProvider>
    );
};

export default Button;