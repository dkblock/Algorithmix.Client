import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "../checkbox";
import { MenuProps } from "./dropdown-props";
import palette from "../../../utils/palette";

const theme = createTheme({ palette });

const getRenderedValue = (selected, items) => {
  switch (selected.length) {
    case 0:
      return "";
    case 1:
      return items.find((item) => item.value === selected[0]).label;
    default:
      return `${selected.length} выбрано`;
  }
};

const MultiDropdown = ({ className, items, value, label, error, helperText, onChange, onClose }) => {
  const [dropdownValue, setDropdownValue] = useState([]);

  useEffect(() => {
    setDropdownValue(value);
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;

    setDropdownValue(newValue);
    onChange(newValue);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControl className={className} variant="outlined" size="small" error={error}>
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          value={dropdownValue}
          displayEmpty
          multiple
          onChange={handleChange}
          onClose={onClose ? handleClose : null}
          renderValue={(selected) => getRenderedValue(selected, items)}
          MenuProps={MenuProps}
        >
          {items.map((item) => (
            <MenuItem key={`dropdown-item-${item.value}`} value={item.value}>
              <Checkbox value={dropdownValue.includes(item.value)} />
              <ListItemText primary={item.label} />
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </ThemeProvider>
  );
};

export default MultiDropdown;
