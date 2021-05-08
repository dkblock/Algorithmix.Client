import React, { useEffect, useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import MuiRadio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import colors from "../../../constants/colors";
import palette from "../../../utils/palette";

const theme = createMuiTheme({ palette });

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
        label={label}
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
