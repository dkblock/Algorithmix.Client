import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Icon, { iconTypes } from "../Icon";
import routes from "../../../utils/routes";
import "./Sidebar.scss";

const Sidebar = () => {
    const { currentUser: { role } } = useSelector(state => state.account);
    const isExecutive = role === "admin" || role === "moderator";

    return (
        <div>
            <div className="sidebar">
                <div className="sidebar__items">
                    <Link to={routes.home}>
                        <Icon type={iconTypes.home} tooltip="Главная" tooltipPosition="right"/>
                    </Link>
                    <Link to={routes.algorithms}>
                        <Icon type={iconTypes.algorithms} tooltip="Алгоритмы" tooltipPosition="right"/>
                    </Link>
                    <Link to={routes.constructor}>
                        <Icon type={iconTypes.constructor} tooltip="Конструктор" tooltipPosition="right"/>
                    </Link>
                    <Link to={routes.tests}>
                        <Icon type={iconTypes.tests} tooltip="Тесты" tooltipPosition="right"/>
                    </Link>

                    {isExecutive && (
                        <Link to={routes.home}>
                            <Icon type={iconTypes.delete} tooltip="Админ-панель" tooltipPosition="right"/>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;