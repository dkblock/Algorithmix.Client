import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import bem from "../../../utils/bem";
import routes from "../../../utils/routes";
import HeaderAuth from "./HeaderAuth";
import styles from "./Header.module.scss";

const block = bem(styles);

const Header = () => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const handleOpenMenu = () => () => {
        setIsMenuOpened(!isMenuOpened);
    };

    return (
        <header className={block()}>
            <nav className={block("navbar")}>
                <NavLink
                    className={block("navbar-brand")}
                    to={routes.home}
                >
                    Visual Algorithms
                </NavLink>
                <div className={block("navbar-menu", { "opened": isMenuOpened })}>
                    <div className={block("navbar-section")}>
                        <NavLink
                            className={cn(block("navbar-link"), "main-text")}
                            activeClassName={block("navbar-link--active")}
                            to={routes.home}
                        >
                            Главная
                        </NavLink>
                        <NavLink
                            className={cn(block("navbar-link"), "main-text")}
                            activeClassName={block("navbar-link--active")}
                            to={routes.algorithms}
                        >
                            Алгоритмы
                        </NavLink>
                        <NavLink
                            className={cn(block("navbar-link"), "main-text")}
                            activeClassName={block("navbar-link--active")}
                            to={routes.constructor}
                        >
                            Конструктор
                        </NavLink>
                        <NavLink
                            className={cn(block("navbar-link"), "main-text")}
                            activeClassName={block("navbar-link--active")}
                            to={routes.tests}
                        >
                            Тесты
                        </NavLink>
                    </div>
                    <HeaderAuth/>
                </div>
                <div
                    className={block("navbar-toggle")}
                    onClick={handleOpenMenu()}
                />
            </nav>
        </header>
    );
}

export default Header;