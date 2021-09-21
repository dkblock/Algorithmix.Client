import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiBadge from "@mui/material/Badge";
import palette from "../../../utils/palette";

const theme = createTheme({
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