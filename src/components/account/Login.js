import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Paper, TextField } from "@material-ui/core";
import Button from "../_common/Button";
import { login } from "../../store/actions/account";
import "./Account.scss";

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const clearFields = () => {
        setEmail("");
        setPassword("");
    };

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = () => {
        const credentials = { email, password };
        dispatch(login(credentials));
        clearFields();
    };

    return (
        <Paper className="account-form">
            <TextField value={email} onChange={handleEmailChange} label="Email"/>
            <TextField value={password} onChange={handlePasswordChange} label="Пароль" type="password"/>
            <Button onClick={handleSubmit}>Войти</Button>
        </Paper>
    )
};

export default Login;