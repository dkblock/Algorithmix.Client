import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiRadio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import colors from "../../../constants/colors";
import palette from "../../../utils/palette";

const theme = createTheme({ palette });

const Radio = ({ className, color = colors.primary, value, label, onChange, disabled = false }) => {
  const [radioValue, setRadioValue] = useState(value);

  useEffect(() => {
    setRadioValue(value);
  }, [value]);

  const handleChange = () => {
    setRadioValue(true);
    onChange(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControlLabel
        label={label ?? ""}
        control={
          <MuiRadio
            className={className}
            color={color}
            checked={radioValue}
            onChange={disabled ? null : handleChange}
            onMouseDown={(e) => e.stopPropagation()}
          />
        }
      />
    </ThemeProvider>
  );
};

export default Radio;
