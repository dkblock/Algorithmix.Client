import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import { useAuth } from "../../hooks";
import { logout } from "../../store/actions/account";
import Button, { colors } from "../_common/Button";
import { Icon, iconTypes } from "../_common/Icon";
import { navigateToHome, navigateToLogin, navigateToRegister } from "../../utils/navigator";

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
                <Button
                    className="app-header__button"
                    color={colors.transparentBlack}
                    startIcon={iconTypes.home}
                    onClick={navigateToHome}
                >
                    Visual Algorithms
                </Button>
            </section>
            <section className="app-header__section">
                {!isAuth
                    ? (
                        <>
                            <Button
                                className="app-header__button"
                                color={colors.transparentBlack}
                                onClick={handleRegisterClick}
                            >
                                Регистрация
                            </Button>
                            <Button
                                className="app-header__button"
                                color={colors.transparentBlack}
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
                                        color={colors.transparentBlack}
                                        endIcon={iconTypes.account}
                                        onClick={handleMenuOpen}
                                    >
                                        {currentUser.firstName} {currentUser.lastName}
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
                                                {currentUser.firstName} {currentUser.lastName}
                                            </MenuItem>
                                            <div className="app-header__menu-divider"/>
                                            <MenuItem onClick={handleMenuClose}>
                                                <ListItemIcon>
                                                    <Icon type={iconTypes.stats}/>
                                                </ListItemIcon>
                                                Статистика
                                            </MenuItem>
                                            <MenuItem onClick={handleMenuClose}>
                                                <ListItemIcon>
                                                    <Icon type={iconTypes.settings}/>
                                                </ListItemIcon>
                                                Настройки
                                            </MenuItem>
                                            <MenuItem onClick={handleLogoutClick}>
                                                <ListItemIcon>
                                                    <Icon type={iconTypes.logout}/>
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