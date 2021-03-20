import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Paper, TextField } from "@material-ui/core";
import Button from "../_common/Button";
import { register } from "../../store/actions/account";
import "./Account.scss";

const Register = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const clearFields = () => {
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
    };

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);

    const handleSubmit = () => {
        const credentials = { email, password, firstName, lastName };
        dispatch(register(credentials));
        clearFields();
    };

    return (
        <Paper className="account-form">
            <TextField value={email} onChange={handleEmailChange} label="Email"/>
            <TextField value={firstName} onChange={handleFirstNameChange} label="Имя"/>
            <TextField value={lastName} onChange={handleLastNameChange} label="Фамилия"/>
            <TextField value={password} onChange={handlePasswordChange} label="Пароль" type="password"/>
            <Button onClick={handleSubmit}>Регистрация</Button>
        </Paper>
    )
};

export default Register;