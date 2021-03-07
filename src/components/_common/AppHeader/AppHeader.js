import React, { useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../../utils/routes";
import "./AppHeader.scss";

const AppHeader = () => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const handleOpenMenu = () => () => {
        setIsMenuOpened(!isMenuOpened);
    };

    return (
        <header className="app-header">
            <section className="app-header__section">
                <div className="app-header__logo">Visual Algorithms</div>
            </section>
            <section className="app-header__section">
                <Link to={routes.login}>Войти</Link>
                <Link to={routes.register}>Регистрация</Link>
            </section>
        </header>
    );
}

export default AppHeader;