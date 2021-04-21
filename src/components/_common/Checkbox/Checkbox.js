import React, { useEffect, useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import MuiCheckbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import colors from "../../../constants/colors";
import palette from "../../../utils/palette";

const theme = createMuiTheme({ palette });

const Checkbox = ({ className, value, label, onChange }) => {
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
        label={label}
        control={
          <MuiCheckbox
            className={className}
            color={colors.primary}
            checked={checkboxValue}
            onChange={handleChange}
            onMouseDown={(e) => e.stopPropagation()}
          />
        }
      />
    </ThemeProvider>
  );
};

export default Checkbox;
