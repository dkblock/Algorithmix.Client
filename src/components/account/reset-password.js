import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@mui/material";
import { useCurrentUser, useQueryParams, useTitle } from "../../hooks";
import { resetPassword } from "../../store/actions/account";
import images from "../../constants/images";
import routes from "../../utils/routes";
import validator from "../../utils/validation";
import Redirect from "../_common/route/redirect";
import Button, { colors } from "../_common/button";
import TextField from "../_common/text-field";

const { validatePasswordOnLogin: validatePassword } = validator.account;

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { userId, code } = useQueryParams();
  const { isAuthenticated } = useCurrentUser();
  const { isFetching, hasError, validationErrors: serverValidationErrors } = useSelector(
    (state) => state.accountSettings
  );

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [passwordWasReset, setPasswordWasReset] = useState(false);

  useTitle("Сброс пароля", "Algorithmix");

  useEffect(() => {
    setPasswordWasReset(false);
  }, []);

  useEffect(() => {
    setValidationErrors({ ...validationErrors, ...serverValidationErrors });
  }, [serverValidationErrors]);

  const handleNewPasswordChange = useCallback((value) => setNewPassword(value), []);
  const handleNewPasswordFocus = useCallback(() => setValidationErrors({ ...validationErrors, newPassword: null }), [
    validationErrors,
  ]);
  const handleNewPasswordFocusOut = useCallback(() => {
    const error = validatePassword(newPassword);
    setValidationErrors({ ...validationErrors, newPassword: error });
  }, [newPassword, validationErrors]);

  const handleConfirmNewPasswordChange = useCallback((value) => setConfirmNewPassword(value), []);
  const handleConfirmNewPasswordFocus = useCallback(
    () => setValidationErrors({ ...validationErrors, confirmNewPassword: null }),
    [validationErrors]
  );
  const handleConfirmNewPasswordFocusOut = useCallback(() => {
    const error = validatePassword(confirmNewPassword);
    setValidationErrors({ ...validationErrors, confirmNewPassword: error });
  }, [confirmNewPassword, validationErrors]);

  const handleSubmit = useCallback(() => {
    const newPasswordError = validatePassword(newPassword);
    const confirmNewPasswordError = validatePassword(confirmNewPassword);

    if (!newPasswordError && !confirmNewPasswordError) {
      const credentials = { userId, newPassword, confirmNewPassword, code };
      dispatch(resetPassword({ credentials }));
      setPasswordWasReset(true);
    } else {
      setValidationErrors({
        ...validationErrors,
        newPassword: newPasswordError,
        confirmNewPassword: confirmNewPasswordError,
      });
    }
  }, [passwordWasReset, newPassword, confirmNewPassword]);

  if (isAuthenticated) return <Redirect to={routes.account.settings} />;
  if (!userId || !code) return <Redirect to={routes.home} />;

  return (
    <div className="account-sign">
      <Paper className="account-sign-form account-sign-form--small">
        <img className="account-sign-form__logo" src={images.logo} alt="algorithmix-logo" />
        {passwordWasReset && !hasError && !isFetching ? (
          <div>Ваш пароль был успешно изменён. Теперь Вы можете войти в свой аккаунт, используя новый пароль.</div>
        ) : (
          <>
            <TextField
              className="account-sign-form__control--small"
              label="Новый пароль"
              type="password"
              value={newPassword}
              error={Boolean(validationErrors.newPassword)}
              helperText={validationErrors.newPassword}
              onChange={handleNewPasswordChange}
              onFocus={handleNewPasswordFocus}
              onFocusOut={handleNewPasswordFocusOut}
            />
            <TextField
              className="account-sign-form__control--small"
              label="Повторите пароль"
              type="password"
              value={confirmNewPassword}
              error={Boolean(validationErrors.confirmNewPassword)}
              helperText={validationErrors.confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
              onFocus={handleConfirmNewPasswordFocus}
              onFocusOut={handleConfirmNewPasswordFocusOut}
            />
            <div className="account-sign-form__submit">
              <Button color={colors.success} onClick={handleSubmit}>
                Сохранить
              </Button>
            </div>
          </>
        )}
      </Paper>
    </div>
  );
};

export default ResetPassword;
