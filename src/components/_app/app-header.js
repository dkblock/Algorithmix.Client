import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import { useCurrentUser } from "../../hooks";
import { showLogoutModal } from "../../store/actions/account";
import { navigateToAccountSettings, navigateToHome, navigateToLogin, navigateToRegister } from "../../utils/navigator";
import images from "../../constants/images";
import Button, { colors } from "../_common/button";
import Avatar from "../_common/avatar";
import { Icon, iconTypes } from "../_common/icon";

const AppHeader = () => {
  const dispatch = useDispatch();
  const { currentUser, isAuthenticated, isFetching } = useCurrentUser();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogoClick = () => navigateToHome();
  const handleLoginClick = () => navigateToLogin();
  const handleRegisterClick = () => navigateToRegister();
  const handleAccountSettingsClick = () => {
    navigateToAccountSettings();
    handleMenuClose();
  };
  const handleLogoutClick = () => {
    dispatch(showLogoutModal());
    handleMenuClose();
  };

  return (
    <header className="app-header">
      <section className="app-header__section">
        <img className="app-header__logo" src={images.logo} alt="logo" onClick={handleLogoClick} />
      </section>
      <section className="app-header__section">
        {!isAuthenticated ? (
          <>
            <Button className="app-header__button" color={colors.transparentBlack} onClick={handleRegisterClick}>
              Регистрация
            </Button>
            <Button className="app-header__button" color={colors.transparentBlack} onClick={handleLoginClick}>
              Войти
            </Button>
          </>
        ) : isFetching ? (
          <div>Загрузка...</div>
        ) : (
          <>
            <Avatar
              className="app-header__avatar"
              firstName={currentUser.firstName}
              lastName={currentUser.lastName}
              onClick={handleMenuOpen}
            />
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
                <div className="app-header__menu-divider" />
                <MenuItem onClick={handleAccountSettingsClick}>
                  <ListItemIcon>
                    <Icon type={iconTypes.settings} />
                  </ListItemIcon>
                  Настройки
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                  <ListItemIcon>
                    <Icon type={iconTypes.logout} />
                  </ListItemIcon>
                  Выйти
                </MenuItem>
              </div>
            </Popover>
          </>
        )}
      </section>
    </header>
  );
};

export default AppHeader;
