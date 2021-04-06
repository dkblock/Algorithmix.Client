import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import MuiBadge from "@material-ui/core/Badge";
import palette from "../../../utils/palette";

const theme = createMuiTheme({
    palette: {
        primary: palette.primary,
        secondary: palette.default
    }
});

const Badge = ({ content, color = "primary" }) => (
    <ThemeProvider theme={theme}>
        <MuiBadge badgeContent={content} color={color}/>
    </ThemeProvider>
);

export default Badge;