import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import cn from "classnames";
import bem from "../../../utils/bem";
import routes from "../../../utils/routes";
import HeaderAuth from "./HeaderAuth";
import styles from "./Header.module.scss";

const block = bem(styles);

const Header = () => (
    <header>
        <Navbar className={block()} bg="light" variant="light" collapseOnSelect expand="lg">
            <div className="col-2"/>
            <Navbar.Brand>
                <NavLink className={cn(block("brand"), "nav-link")} to={routes.home}>
                    Visual Algorithms
                </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink
                        className="nav-link main-text"
                        activeClassName={block("link-active")}
                        to={routes.home}
                    >
                        Главная
                    </NavLink>
                    <NavLink
                        className="nav-link main-text"
                        activeClassName={block("link-active")}
                        to={routes.algorithms}
                    >
                        Алгоритмы
                    </NavLink>
                    <NavLink
                        className="nav-link main-text"
                        activeClassName={block("link-active")}
                        to={routes.constructor}
                    >
                        Конструктор
                    </NavLink>
                    <NavLink
                        className="nav-link main-text"
                        activeClassName={block("link-active")}
                        to={routes.tests}
                    >
                        Тесты
                    </NavLink>
                </Nav>
                <HeaderAuth/>
            </Navbar.Collapse>
            <div className="col-2"/>
        </Navbar>
    </header>
);

export default Header;