import React, { useState } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import palette from "../../../utils/palette";

const theme = createMuiTheme({ palette });

const Dropdown = ({ className, items, label, value, onChange }) => {
    const [dropdownValue, setDropdownValue] = useState(value ?? items[0].value);

    const handleChange = (event) => {
        const newValue = event.target.value;

        setDropdownValue(newValue);
        onChange(newValue);
    };

    return (
        <MuiThemeProvider theme={theme}>
            <FormControl className={className} variant="outlined">
                <InputLabel>{label}</InputLabel>
                <Select label={label} value={dropdownValue} variant="outlined" size="small" onChange={handleChange}>
                    {items.map((item) => (
                        <MenuItem key={`dropdown-item-${item.value}`} value={item.value}>{item.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </MuiThemeProvider>
    );
};

export default Dropdown;