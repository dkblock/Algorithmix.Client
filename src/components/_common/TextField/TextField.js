import React, { useState } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MuiTextField from "@material-ui/core/TextField";
import palette from "../../../styles/palette";

const theme = createMuiTheme({ palette });

const TextField = ({ className, label, type, value, error, helperText, onChange, onFocus, onFocusOut  }) => {
    const [fieldValue, setFieldValue] = useState(value);

    const handleChange = (event) => {
        const newValue = event.target.value;

        setFieldValue(newValue);
        onChange(newValue);
    };

    return (
        <MuiThemeProvider theme={theme}>
            <MuiTextField
                className={className}
                color="primary"
                error={error}
                helperText={helperText}
                label={label}
                size="small"
                type={type}
                value={fieldValue}
                variant="outlined"
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onFocusOut}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </MuiThemeProvider>
    );
};

export default TextField;