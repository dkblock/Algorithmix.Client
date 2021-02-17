import React from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import bem from "../../../utils/bem";
import routes from "../../../utils/routes";
import styles from "./Header.module.scss";

const block = bem(styles);

const HeaderAuth = () => (
    <div className={block("navbar-section")}>
        <NavLink
            className={cn(block("navbar-link"), "main-text")}
            activeClassName={block("navbar-link--active")}
            to={routes.account}
        >
            Регистрация
        </NavLink>
        <NavLink
            className={cn(block("navbar-link"), "main-text")}
            activeClassName={block("navbar-link--active")}
            to={routes.account}
        >
            Войти
        </NavLink>
    </div>
);

export default HeaderAuth;