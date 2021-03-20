import React from "react";
import { useSelector } from "react-redux";
import Icon, { iconTypes } from "../Icon";
import routes from "../../../utils/routes";
import { navigateToHome, navigateToAlgorithms, navigateToConstructor, navigateToTests } from "../../../utils/navigator";
import "./Sidebar.scss";

const Sidebar = () => {
    const currentRoute = useSelector(state => state.router.location.pathname);
    const { currentUser: { role } } = useSelector(state => state.account);

    const isExecutive = role === "admin" || role === "moderator";
    const isSelected = (route) => route === currentRoute;

    return (
        <div>
            <div className="sidebar">
                <div className="sidebar__items">
                    <Icon
                        type={iconTypes.home}
                        tooltip="Главная"
                        tooltipPosition="right"
                        tooltipWithMargin
                        selected={isSelected(routes.home)}
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

                    {isExecutive && (
                        <>
                            <div className="sidebar__divider"/>
                            <Icon
                                type={iconTypes.delete}
                                tooltip="Админ-панель"
                                tooltipPosition="right"
                                tooltipWithMargin
                                selected={isSelected("admin")}
                                onClick={navigateToHome}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;