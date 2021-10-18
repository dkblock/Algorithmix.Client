import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiSwitch from "@mui/material/Switch";
import palette from "../../../utils/palette";
import colors from "../../../constants/colors";

const theme = createTheme({ palette });

const Switch = ({ className, checked, label, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = (e) => {
    const value = e.target.checked;
    setIsChecked(value);
    onChange(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControlLabel
        className={className}
        control={<MuiSwitch checked={isChecked} color={colors.primary} onChange={handleChange} />}
        label={label ?? ""}
      />
    </ThemeProvider>
  );
};

export default Switch;
