import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiLinearProgress from "@mui/material/LinearProgress";
import colors from "../../../constants/colors";
import palette from "../../../utils/palette";

const theme = createTheme({ palette });

const ProgressBar = ({ value, label }) => <MuiLinearProgress value={value} variant="determinate" />;

export default ProgressBar;
