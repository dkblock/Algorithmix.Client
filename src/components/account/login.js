import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@mui/material";
import { useCurrentUser, useTitle } from "../../hooks";
import { login } from "../../store/actions/account";
import validator from "../../utils/validation";
import { navigateToForgotPassword } from "../../utils/navigator";
import routes from "../../utils/routes";
import images from "../../constants/images";
import Button, { colors } from "../_common/button";
import TextField from "../_common/text-field";
import Redirect from "../_common/route/redirect";

const {
  validateEmailOnLogin: validateEmail,
  validatePasswordOnLogin: validatePassword,
  validateOnLogin,
} = validator.account;

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useCurrentUser();
  const { isFetching, validationErrors: serverValidationErrors } = useSelector((state) => state.account);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  useTitle("Вход", "Algorithmix");

  useEffect(() => {
    setValidationErrors({ ...validationErrors, ...serverValidationErrors });
  }, [serverValidationErrors]);

  const handleEmailChange = useCallback((value) => setEmail(value), []);
  const handleEmailFocus = useCallback(() => setValidationErrors({}), []);
  const handleEmailFocusOut = useCallback(() => {
    const error = validateEmail(email);
    setValidationErrors({ ...validationErrors, email: error });
  }, [email, validationErrors]);

  const handlePasswordChange = useCallback((value) => setPassword(value), []);
  const handlePasswordFocus = useCallback(() => setValidationErrors({}), []);
  const handlePasswordFocusOut = useCallback(() => {
    const error = validatePassword(password);
    setValidationErrors({ ...validationErrors, password: error });
  }, [password, validationErrors]);

  const handleSubmit = () => {
    const credentials = { email, password };
    const { isValid, validationErrors: nextValidationErrors } = validateOnLogin(credentials);

    if (isValid) {
      dispatch(login({ credentials }));
    } else {
      setValidationErrors(nextValidationErrors);
    }
  };

  if (isAuthenticated) return <Redirect to={routes.account.settings} />;

  return (
    <div className="account-sign">
      <Paper className="account-sign-form account-sign-form--small">
        <img className="account-sign-form__logo" src={images.logo} alt="algorithmix-logo" />
        <TextField
          className="account-sign-form__control--small"
          label="Email"
          value={email}
          error={Boolean(validationErrors.email)}
          helperText={validationErrors.email}
          onChange={handleEmailChange}
          onFocus={handleEmailFocus}
          onFocusOut={handleEmailFocusOut}
        />
        <TextField
          className="account-sign-form__control--small"
          value={password}
          label="Пароль"
          type="password"
          error={Boolean(validationErrors.password)}
          helperText={validationErrors.password}
          onChange={handlePasswordChange}
          onFocus={handlePasswordFocus}
          onFocusOut={handlePasswordFocusOut}
        />
        <div className="account-sign-form__forgot-password" onClick={() => navigateToForgotPassword()}>
          Забыли пароль?
        </div>
        <div className="account-sign-form__submit">
          <Button color={colors.success} isLoading={isFetching} onClick={handleSubmit}>
            Войти
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Login;
