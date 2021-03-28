import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, iconTypes } from "../_common/Icon";
import { useExecutiveRole } from "../../hooks";
import { showLogoutModal } from "../../store/actions/account";
import { navigateToHome, navigateToAlgorithms, navigateToConstructor, navigateToTests } from "../../utils/navigator";
import routes from "../../utils/routes";

const AppSidebar = () => {
    const dispatch = useDispatch();

    const currentRoute = useSelector(state => state.router.location.pathname);
    const { isAuthenticated } = useSelector(state => state.account);

    const isExecutive = useExecutiveRole();
    const isSelected = (route) => currentRoute.includes(route);

    const handleLogout = () => dispatch(showLogoutModal());

    return (
        <div className="app-sidebar bg-light">
            <div className="app-sidebar__items">
                <IconButton
                    type={iconTypes.home}
                    tooltip="Главная"
                    tooltipPosition="right"
                    tooltipWithMargin
                    selected={isSelected(routes.home) || currentRoute === "/"}
                    onClick={navigateToHome}
                />
                <IconButton
                    type={iconTypes.algorithms}
                    tooltip="Алгоритмы"
                    tooltipPosition="right"
                    tooltipWithMargin
                    selected={isSelected(routes.algorithms)}
                    onClick={navigateToAlgorithms}
                />
                <IconButton
                    type={iconTypes.constructor}
                    tooltip="Конструктор"
                    tooltipPosition="right"
                    tooltipWithMargin
                    selected={isSelected(routes.constructor)}
                    onClick={navigateToConstructor}
                />
                <IconButton
                    type={iconTypes.tests}
                    tooltip="Тесты"
                    tooltipPosition="right"
                    tooltipWithMargin
                    selected={isSelected(routes.tests)}
                    onClick={navigateToTests}
                />

                {isAuthenticated && (
                    <>
                        <div className="app-sidebar__divider"/>
                        {isExecutive && (
                            <IconButton
                                type={iconTypes.delete}
                                tooltip="Админ-панель"
                                tooltipPosition="right"
                                tooltipWithMargin
                                selected={isSelected("admin")}
                                onClick={navigateToHome}
                            />
                        )}
                        <IconButton
                            type={iconTypes.stats}
                            tooltip="Статистика"
                            tooltipPosition="right"
                            tooltipWithMargin
                            selected={isSelected("stats")}
                            onClick={navigateToHome}
                        />
                        <IconButton
                            type={iconTypes.settings}
                            tooltip="Настройки"
                            tooltipPosition="right"
                            tooltipWithMargin
                            selected={isSelected("settings")}
                            onClick={navigateToHome}
                        />
                        <IconButton
                            type={iconTypes.logout}
                            tooltip="Выйти"
                            tooltipPosition="right"
                            tooltipWithMargin
                            selected={false}
                            onClick={handleLogout}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default AppSidebar;