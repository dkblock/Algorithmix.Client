import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import { useAuth } from "../../../hooks";
import { logout } from "../../../store/actions/account";
import Button, { buttonColors } from "../Button";
import { ButtonIcon, iconTypes } from "../Icon";
import { navigateToLogin, navigateToRegister } from "../../../utils/navigator";
import "./AppHeader.scss";

const AppHeader = () => {
    const dispatch = useDispatch();
    const isAuth = useAuth();

    const { currentUser, isFetching } = useSelector(state => state.account);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLoginClick = () => navigateToLogin();
    const handleRegisterClick = () => navigateToRegister();
    const handleLogoutClick = () => {
        dispatch(logout());
        handleMenuClose();
    };

    return (
        <header className="app-header">
            <section className="app-header__section">
                <div className="app-header__logo">Visual Algorithms</div>
            </section>
            <section className="app-header__section">
                {!isAuth
                    ? (
                        <>
                            <Button
                                className="app-header__button"
                                color={buttonColors.dark}
                                onClick={handleRegisterClick}
                            >
                                Регистрация
                            </Button>
                            <Button
                                className="app-header__button"
                                color={buttonColors.dark}
                                onClick={handleLoginClick}
                            >
                                Войти
                            </Button>
                        </>
                    ) : (
                        isFetching
                            ? (<div>Загрузка...</div>)
                            : (
                                <>
                                    <Button
                                        className="app-header__button"
                                        color={buttonColors.dark}
                                        icon={iconTypes.account}
                                        onClick={handleMenuOpen}
                                    >
                                        {currentUser.firstName}
                                    </Button>
                                    <Popover
                                        id="app-header-popover"
                                        open={Boolean(anchorEl)}
                                        anchorEl={anchorEl}
                                        onClose={handleMenuClose}
                                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                                    >
                                        <div className="app-header__menu">
                                            <MenuItem onClick={handleMenuClose}>
                                                <ListItemIcon>
                                                    <ButtonIcon type={iconTypes.settings}/>
                                                </ListItemIcon>
                                                Настройки
                                            </MenuItem>
                                            <MenuItem onClick={handleLogoutClick}>
                                                <ListItemIcon>
                                                    <ButtonIcon type={iconTypes.logout}/>
                                                </ListItemIcon>
                                                Выйти
                                            </MenuItem>
                                        </div>
                                    </Popover>
                                </>
                            )
                    )}
            </section>
        </header>
    );
}

export default AppHeader;