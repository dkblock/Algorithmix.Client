import React from "react";
import Button from "../../../components/Button/Button";
import { useDispatch } from "react-redux";
import { register, getData, login, logout } from "../../../store/app/actions";

const AccountContainer = () => {
    const dispatch = useDispatch();

    const handleRegister = () => {
        dispatch(register())
    };

    const handleLogin = () => {
        dispatch(login());
    };

    const handleLogout = () => {
      dispatch(logout());
    };

    const handleGetData = () => {
        dispatch(getData());
    };

    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <Button onClick={handleRegister}>
                Регистрация
            </Button>
            <Button onClick={handleLogin}>
                Логин
            </Button>
            <Button onClick={handleLogout}>
                Логаут
            </Button>
            <Button onClick={handleGetData}>
                Добавить таск
            </Button>
        </div>

    );
};

export default AccountContainer;