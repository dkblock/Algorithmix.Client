import React, { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MuiSwitch from "@material-ui/core/Switch";
import palette from "../../../utils/palette";
import colors from "../../../constants/colors";

const theme = createMuiTheme({ palette });

const Switch = ({ checked, label, onChange }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = (e) => {
        const value = e.target.checked;
        setIsChecked(value);
        onChange(value);
    };

    return (
        <ThemeProvider theme={theme}>
            <FormControlLabel
                control={
                    <MuiSwitch
                        checked={isChecked}
                        color={colors.primary}
                        onChange={handleChange}
                    />
                }
                label={label}
            />
        </ThemeProvider>
    );
};

export default Switch;