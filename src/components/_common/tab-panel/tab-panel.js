import React, { useEffect, useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import palette from "../../../utils/palette";

const theme = createMuiTheme({ palette });

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
