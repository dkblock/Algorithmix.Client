import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiTextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Icon } from "../icon";
import palette from "../../../utils/palette";

const theme = createTheme({ palette });

const TextField = ({
  className,
  label,
  type,
  value,
  error,
  helperText,
  multiline,
  rows,
  icon,
  onChange,
  onFocus,
  onFocusOut,
}) => {
  const [fieldValue, setFieldValue] = useState(value);

  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setFieldValue(newValue);
    onChange(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
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
        multiline={multiline}
        rows={multiline ? rows : null}
        onChange={handleChange}
        onMouseDown={(e) => e.stopPropagation()}
        onFocus={onFocus}
        onBlur={onFocusOut}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={
          icon
            ? {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon type={icon} />
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </ThemeProvider>
  );
};

export default TextField;
