import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useExecutiveRole } from "../../hooks";
import { showLogoutModal } from "../../store/actions/account";
import { navigateToHome, navigateToAlgorithms, navigateToConstructor, navigateToTests } from "../../utils/navigator";
import routes from "../../utils/routes";
import { IconButton, iconTypes } from "../_common/Icon";
import Tooltip from "../_common/Tooltip";

const AppSidebar = () => {
  const dispatch = useDispatch();

  const currentRoute = useSelector((state) => state.router.location.pathname);
  const { isAuthenticated } = useSelector((state) => state.account);

  const isExecutive = useExecutiveRole();
  const isSelected = (route) => currentRoute.includes(route);

  const handleLogout = () => dispatch(showLogoutModal());

  return (
    <div className="app-sidebar bg-light">
      <div className="app-sidebar__items">
        <Tooltip title="Главная" placement="right">
          <IconButton
            type={iconTypes.home}
            selected={isSelected(routes.home) || currentRoute === "/"}
            onClick={navigateToHome}
          />
        </Tooltip>
        <Tooltip title="Алгоритмы" placement="right">
          <IconButton
            type={iconTypes.algorithms}
            selected={isSelected(routes.algorithms)}
            onClick={navigateToAlgorithms}
          />
        </Tooltip>
        <Tooltip title="Конструктор" placement="right">
          <IconButton
            type={iconTypes.constructor}
            selected={isSelected(routes.constructor)}
            onClick={navigateToConstructor}
          />
        </Tooltip>
        <Tooltip title="Тесты" placement="right">
          <IconButton type={iconTypes.tests} selected={isSelected(routes.tests)} onClick={navigateToTests} />
        </Tooltip>

        {isAuthenticated && (
          <>
            <div className="app-sidebar__divider" />
            {isExecutive && (
              <Tooltip title="Админ-панель" placement="right">
                <IconButton type={iconTypes.delete} selected={isSelected("admin")} onClick={navigateToHome} />
              </Tooltip>
            )}
            <Tooltip title="Статистика" placement="right">
              <IconButton type={iconTypes.stats} selected={isSelected("stats")} onClick={navigateToHome} />
            </Tooltip>
            <Tooltip title="Настройки" placement="right">
              <IconButton type={iconTypes.settings} selected={isSelected("settings")} onClick={navigateToHome} />
            </Tooltip>
            <Tooltip title="Выход" placement="right">
              <IconButton type={iconTypes.logout} selected={false} onClick={handleLogout} />
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );
};

export default AppSidebar;