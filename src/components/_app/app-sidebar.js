import React from "react";
import { useSelector } from "react-redux";
import { useExecutiveRole } from "../../hooks";
import {
  navigateToHome,
  navigateToAlgorithms,
  navigateToConstructor,
  navigateToTests,
  navigateToTestsManagement,
} from "../../utils/navigator";
import sidebarSelector from "../../utils/sidebar-selector";
import { IconButton, iconTypes } from "../_common/icon";
import Tooltip from "../_common/tooltip";

const AppSidebar = () => {
  const { pathname: currentRoute } = useSelector((state) => state.router.location);
  const isExecutive = useExecutiveRole();

  return (
    <div className="app-sidebar bg-light">
      <div className="app-sidebar__items">
        <Tooltip title="Главная" placement="right">
          <IconButton type={iconTypes.home} selected={sidebarSelector.home(currentRoute)} onClick={navigateToHome} />
        </Tooltip>
        <Tooltip title="Алгоритмы" placement="right">
          <IconButton
            type={iconTypes.algorithms}
            selected={sidebarSelector.algorithms(currentRoute)}
            onClick={navigateToAlgorithms}
          />
        </Tooltip>
        <Tooltip title="Конструктор" placement="right">
          <IconButton
            type={iconTypes.constructor}
            selected={sidebarSelector.constructor(currentRoute)}
            onClick={navigateToConstructor}
          />
        </Tooltip>
        <Tooltip title="Тесты" placement="right">
          <IconButton type={iconTypes.tests} selected={sidebarSelector.tests(currentRoute)} onClick={navigateToTests} />
        </Tooltip>

        {isExecutive && (
          <Tooltip title="Управление" placement="right">
            <IconButton
              type={iconTypes.manage}
              selected={sidebarSelector.management(currentRoute)}
              onClick={navigateToTestsManagement}
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default AppSidebar;
