import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import palette from "../../../styles/palette";
import "./Loader.scss";

const theme = createMuiTheme({ palette });

const Loader = ({ className, size }) => {
    const loaderSize = size ?? "medium";

    return (
        <MuiThemeProvider theme={theme}>
            <CircularProgress className={`${className} loader--${loaderSize}`}/>
        </MuiThemeProvider>
    );
};

export default Loader;