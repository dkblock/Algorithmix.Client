import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon, { iconTypes } from "../Icon";
import { logout } from "../../../store/actions/account";
import { navigateToHome, navigateToAlgorithms, navigateToConstructor, navigateToTests } from "../../../utils/navigator";
import routes from "../../../utils/routes";
import "./Sidebar.scss";

const Sidebar = () => {
    const dispatch = useDispatch();

    const currentRoute = useSelector(state => state.router.location.pathname);
    const { isAuth } = useSelector(state => state.app);
    const { currentUser: { role } } = useSelector(state => state.account);

    const isExecutive = role === "admin" || role === "moderator";
    const isSelected = (route) => currentRoute.includes(route);

    const handleLogout = () => dispatch(logout());

    return (
        <div className="sidebar bg-light">
            <div className="sidebar__items">
                <Icon
                    type={iconTypes.home}
                    tooltip="Главная"
                    tooltipPosition="right"
                    tooltipWithMargin
                    selected={isSelected(routes.home) || currentRoute === "/"}
                    onClick={navigateToHome}
                />
                <Icon
                    type={iconTypes.algorithms}
                    tooltip="Алгоритмы"
                    tooltipPosition="right"
                    tooltipWithMargin
                    selected={isSelected(routes.algorithms)}
                    onClick={navigateToAlgorithms}
                />
                <Icon
                    type={iconTypes.constructor}
                    tooltip="Конструктор"
                    tooltipPosition="right"
                    tooltipWithMargin
                    selected={isSelected(routes.constructor)}
                    onClick={navigateToConstructor}
                />
                <Icon
                    type={iconTypes.tests}
                    tooltip="Тесты"
                    tooltipPosition="right"
                    tooltipWithMargin
                    selected={isSelected(routes.tests)}
                    onClick={navigateToTests}
                />

                {isAuth && (
                    <>
                        <div className="sidebar__divider"/>
                        {isExecutive && (
                            <Icon
                                type={iconTypes.delete}
                                tooltip="Админ-панель"
                                tooltipPosition="right"
                                tooltipWithMargin
                                selected={isSelected("admin")}
                                onClick={navigateToHome}
                            />
                        )}
                        <Icon
                            type={iconTypes.stats}
                            tooltip="Статистика"
                            tooltipPosition="right"
                            tooltipWithMargin
                            selected={isSelected("stats")}
                            onClick={navigateToHome}
                        />
                        <Icon
                            type={iconTypes.settings}
                            tooltip="Настройки"
                            tooltipPosition="right"
                            tooltipWithMargin
                            selected={isSelected("settings")}
                            onClick={navigateToHome}
                        />
                        <Icon
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

export default Sidebar;