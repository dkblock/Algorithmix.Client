import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@material-ui/core";
import { useCurrentUser, useTitle } from "../../hooks";
import { fetchGroups } from "../../store/actions/group";
import { register } from "../../store/actions/account";
import validator from "../../utils/validation";
import routes from "../../utils/routes";
import Redirect from "../_common/route/redirect";
import Button, { colors } from "../_common/button";
import Dropdown from "../_common/dropdown";
import TextField from "../_common/text-field";
import images from "../../constants/images";

const {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validateConfirmPassword,
  validateOnRegister,
} = validator.account;

const Register = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useCurrentUser();
  const { validationErrors: serverValidationErrors } = useSelector((state) => state.account);
  const { groups } = useSelector((state) => state.group);

  const availableGroups = useMemo(
    () =>
      groups.length > 0 ? groups.filter((group) => group.isAvailableForRegister) : [{ id: 1, name: "Не назначена" }],
    [groups]
  );

  const groupItems = availableGroups.map((group) => ({ value: group.id, label: group.name }));

  const [email, setEmail] = useState("");
  const [groupId, setGroupId] = useState(availableGroups[0]?.id);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  useTitle("Регистрация", "Algorithmix");

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  useEffect(() => {
    setGroupId(availableGroups[0]?.id);
  }, [availableGroups]);

  useEffect(() => {
    setValidationErrors({ ...validationErrors, ...serverValidationErrors });
  }, [serverValidationErrors]);

  const handleEmailChange = useCallback((value) => setEmail(value), []);
  const handleEmailFocus = useCallback(() => setValidationErrors({ ...validationErrors, email: null }), [
    validationErrors,
  ]);
  const handleEmailFocusOut = useCallback(() => {
    const error = validateEmail(email);
    setValidationErrors({ ...validationErrors, email: error });
  }, [email, validationErrors]);

  const handleGroupIdChange = useCallback((value) => setGroupId(value), []);

  const handleFirstNameChange = useCallback((value) => setFirstName(value), []);
  const handleFirstNameFocus = useCallback(() => setValidationErrors({ ...validationErrors, firstName: null }), [
    validationErrors,
  ]);
  const handleFirstNameFocusOut = useCallback(() => {
    const error = validateFirstName(firstName);
    setValidationErrors({ ...validationErrors, firstName: error });
  }, [firstName, validationErrors]);

  const handleLastNameChange = useCallback((value) => setLastName(value), []);
  const handleLastNameFocus = useCallback(() => setValidationErrors({ ...validationErrors, lastName: null }), [
    validationErrors,
  ]);
  const handleLastNameFocusOut = useCallback(() => {
    const error = validateLastName(lastName);
    setValidationErrors({ ...validationErrors, lastName: error });
  }, [lastName, validationErrors]);

  const handlePasswordChange = useCallback((value) => setPassword(value), []);
  const handlePasswordFocus = useCallback(() => setValidationErrors({ ...validationErrors, password: null }), [
    validationErrors,
  ]);
  const handlePasswordFocusOut = useCallback(() => {
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);
    setValidationErrors({ ...validationErrors, password: passwordError, confirmPassword: confirmPasswordError });
  }, [confirmPassword, password, validationErrors]);

  const handleConfirmPasswordChange = useCallback((value) => setConfirmPassword(value), []);
  const handleConfirmPasswordFocus = useCallback(
    () => setValidationErrors({ ...validationErrors, confirmPassword: null }),
    [validationErrors]
  );
  const handleConfirmPasswordFocusOut = useCallback(() => {
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);
    setValidationErrors({ ...validationErrors, password: passwordError, confirmPassword: confirmPasswordError });
  }, [confirmPassword, password, validationErrors]);

  const handleSubmit = () => {
    const credentials = { email, groupId, firstName, lastName, password, confirmPassword };
    const { isValid, validationErrors: nextValidationErrors } = validateOnRegister(credentials);

    if (isValid) {
      setValidationErrors({});
      dispatch(register({ credentials }));
    } else {
      setValidationErrors(nextValidationErrors);
    }
  };

  if (isAuthenticated) return <Redirect to={routes.account.settings} />;

  return (
    <div className="account-sign">
      <Paper className="account-sign-form account-sign-form--register">
        <img className="account-sign-form__logo" src={images.logo} alt="algorithmix-logo"/>
        <div className="account-sign-form__row">
          <TextField
            className="account-sign-form__control--register"
            label="Email"
            value={email}
            error={Boolean(validationErrors.email)}
            helperText={validationErrors.email}
            onChange={handleEmailChange}
            onFocus={handleEmailFocus}
            onFocusOut={handleEmailFocusOut}
          />
          <Dropdown
            className="account-sign-form__control--register"
            value={groupId}
            label="Группа"
            items={groupItems}
            onChange={handleGroupIdChange}
          />
        </div>
        <div className="account-sign-form__row">
          <TextField
            className="account-sign-form__control--register"
            value={firstName}
            label="Имя"
            error={Boolean(validationErrors.firstName)}
            helperText={validationErrors.firstName}
            onChange={handleFirstNameChange}
            onFocus={handleFirstNameFocus}
            onFocusOut={handleFirstNameFocusOut}
          />
          <TextField
            className="account-sign-form__control--register"
            value={lastName}
            label="Фамилия"
            error={Boolean(validationErrors.lastName)}
            helperText={validationErrors.lastName}
            onChange={handleLastNameChange}
            onFocus={handleLastNameFocus}
            onFocusOut={handleLastNameFocusOut}
          />
        </div>
        <div className="account-sign-form__row">
          <TextField
            className="account-sign-form__control--register"
            value={password}
            label="Пароль"
            type="password"
            error={Boolean(validationErrors.password)}
            helperText={validationErrors.password}
            onChange={handlePasswordChange}
            onFocus={handlePasswordFocus}
            onFocusOut={handlePasswordFocusOut}
          />
          <TextField
            className="account-sign-form__control--register"
            value={confirmPassword}
            label="Подтвердите пароль"
            type="password"
            error={Boolean(validationErrors.confirmPassword)}
            helperText={validationErrors.confirmPassword}
            onChange={handleConfirmPasswordChange}
            onFocus={handleConfirmPasswordFocus}
            onFocusOut={handleConfirmPasswordFocusOut}
          />
        </div>
        <div className="account-sign-form__submit">
          <Button color={colors.success} onClick={handleSubmit}>
            Регистрация
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Register;
