import React from "react";
import { Button as MuiButton } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import cn from "classnames";
import bem from "../../utils/bem";
import palette from "../../styles/palette";
import styles from "./Button.module.scss";

const block = bem(styles);
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
                className={cn(className, block())}
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