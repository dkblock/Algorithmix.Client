import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../hooks";
import { logout } from "../../../store/actions/account";
import Button from "../Button/Button";
import routes from "../../../utils/routes";
import "./AppHeader.scss";

const AppHeader = () => {
    const dispatch = useDispatch();
    const isAuth = useAuth();
    const { currentUser, isFetching } = useSelector(state => state.account);

    const handleLogout = () => dispatch(logout());

    return (
        <header className="app-header">
            <section className="app-header__section">
                <div className="app-header__logo">Visual Algorithms</div>
            </section>
            <section className="app-header__section">
                {!isAuth
                    ? (
                        <>
                            <Link to={routes.login}>Войти</Link>
                            <Link to={routes.register}>Регистрация</Link>
                        </>
                    ) : (
                        isFetching
                            ? (<div>Загрузка...</div>)
                            : (
                                <>
                                    <div>{`${currentUser.firstName} ${currentUser.lastName}`}</div>
                                    <Button onClick={handleLogout}>Выйти</Button>
                                </>
                            )
                    )}
            </section>
        </header>
    );
}

export default AppHeader;