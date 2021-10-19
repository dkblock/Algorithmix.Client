import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiCheckbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import colors from "../../../constants/colors";
import palette from "../../../utils/palette";

const theme = createTheme({ palette });

const Checkbox = ({ className, value, label, onChange, disabled = false }) => {
  const [checkboxValue, setCheckboxValue] = useState(value);

  useEffect(() => {
    setCheckboxValue(value);
  }, [value]);

  const handleChange = () => {
    const newValue = !checkboxValue;

    setCheckboxValue(newValue);
    onChange(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControlLabel
        label={label ?? ""}
        control={
          <MuiCheckbox
            className={className}
            color={colors.primary}
            checked={checkboxValue}
            onChange={disabled ? null : handleChange}
            onMouseDown={(e) => e.stopPropagation()}
          />
        }
      />
    </ThemeProvider>
  );
};

export default Checkbox;
