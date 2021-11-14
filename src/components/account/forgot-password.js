import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@mui/material";
import { useCurrentUser, useTitle } from "../../hooks";
import { resetPasswordRequest } from "../../store/actions/account";
import images from "../../constants/images";
import routes from "../../utils/routes";
import validator from "../../utils/validation";
import Redirect from "../_common/route/redirect";
import Button, { colors } from "../_common/button";
import TextField from "../_common/text-field";

const { validateEmailOnLogin: validateEmail } = validator.account;

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useCurrentUser();
  const { isFetching, hasError, validationErrors: serverValidationErrors } = useSelector(
    (state) => state.accountSettings
  );

  const [email, setEmail] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [mailSent, setMailSent] = useState(false);

  useTitle("Сброс пароля", "Algorithmix");

  useEffect(() => {
    setMailSent(false);
  }, []);

  useEffect(() => {
    setValidationErrors({ ...validationErrors, ...serverValidationErrors });
  }, [serverValidationErrors]);

  const handleEmailChange = useCallback((value) => setEmail(value), []);
  const handleEmailFocus = useCallback(() => setValidationErrors({}), []);
  const handleEmailFocusOut = useCallback(() => {
    const error = validateEmail(email);
    setValidationErrors({ ...validationErrors, email: error });
  }, [email, validationErrors]);

  const handleSubmit = useCallback(() => {
    const error = validateEmail(email);

    if (!error) {
      const credentials = { email };
      dispatch(resetPasswordRequest({ credentials }));
      setMailSent(true);
    } else {
      setValidationErrors({ ...validationErrors, email: error });
    }
  }, [mailSent, email]);

  if (isAuthenticated) return <Redirect to={routes.account.settings} />;

  return (
    <div className="account-sign">
      <Paper className="account-sign-form account-sign-form--small">
        <img className="account-sign-form__logo" src={images.logo} alt="algorithmix-logo" />
        {mailSent && !hasError && !isFetching ? (
          <div>
            На Вашу электронную почту ({email}) было отправлено письмо со ссылкой. Перейдите по ней, чтобы восстановить
            свой пароль.
          </div>
        ) : (
          <>
            <div className="account-info">
              <div>
                Введите свой e-mail адрес. На него будет отправлена ссылка, пройдя по которой, Вы сможете сбросить
                пароль от своего аккаунта.
              </div>
              <i>Внимание: данная функция доступна только пользователям с подтверждённым e-mail адресом!</i>
            </div>
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
            <div className="account-sign-form__submit">
              <Button color={colors.danger} onClick={handleSubmit}>
                Сбросить пароль
              </Button>
            </div>
          </>
        )}
      </Paper>
    </div>
  );
};

export default ForgotPassword;
