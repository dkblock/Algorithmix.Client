import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import palette from "../../../utils/palette";
import "./loader.scss";

const theme = createTheme({ palette });

const Loader = ({ className, color = "primary", size = "medium" }) => (
  <ThemeProvider theme={theme}>
    <CircularProgress className={`${className} loader--${size}`} color={color} />
  </ThemeProvider>
);

export default Loader;