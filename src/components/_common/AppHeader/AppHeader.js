import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../hooks/useAuth";
import Button from "../Button/Button";
import { logout } from "../../../store/actions/account";
import routes from "../../../utils/routes";
import "./AppHeader.scss";

const AppHeader = () => {
    const dispatch = useDispatch();
    const isAuth = useAuth();

    const handleLogout = () => dispatch(logout());

    return (
        <header className="app-header">
            <section className="app-header__section">
                <div className="app-header__logo">Visual Algorithms</div>
            </section>
            <section className="app-header__section">
                {!isAuth
                    ? (
                        <React.Fragment>
                            <Link to={routes.login}>Войти</Link>
                            <Link to={routes.register}>Регистрация</Link>
                        </React.Fragment>
                    ) : (
                        <Button onClick={handleLogout}>Выйти</Button>
                    )}
            </section>
        </header>
    );
}

export default AppHeader;