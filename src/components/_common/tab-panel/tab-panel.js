import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import palette from "../../../utils/palette";

const theme = createTheme({ palette });

const TabPanel = ({ tabs, value }) => {
  const [tabsValue, setTabsValue] = useState(value);

  useEffect(() => {
    setTabsValue(value);
  }, [value]);

  const handleChange = (e, newValue) => {
    setTabsValue(newValue);
  };

  return (
    <Paper square>
      <ThemeProvider theme={theme}>
        <Tabs value={tabsValue} indicatorColor="primary" textColor="primary" onChange={handleChange}>
          {tabs.map((tab) => (
            <Tab key={tab.label} label={tab.label} onClick={tab.onClick} />
          ))}
        </Tabs>
      </ThemeProvider>
    </Paper>
  );
};

export default TabPanel;
