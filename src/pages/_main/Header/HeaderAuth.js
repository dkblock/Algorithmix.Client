import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import bem from "../../../utils/bem";
import routes from "../../../utils/routes";
import styles from "./Header.module.scss";

const block = bem(styles);

const HeaderAuth = () => (
    <Nav>
        <NavLink
            className="nav-link main-text"
            activeClassName={block("link-active")}
            to={routes.home}
        >
            Регистрация
        </NavLink>
        <NavLink
            className="nav-link main-text"
            activeClassName={block("link-active")}
            to={routes.home}
        >
            Войти
        </NavLink>
    </Nav>
);

export default HeaderAuth;