import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { Paper } from "@mui/material";
import { useExecutiveRole, useTitle } from "../../hooks";
import { showChangePasswordModal, showConfirmEmailModal, updateUserInformation } from "../../store/actions/account";
import validator from "../../utils/validation";
import colors from "../../constants/colors";
import images from "../../constants/images";
import TextField from "../_common/text-field";
import Dropdown from "../_common/dropdown";
import { Icon, iconTypes } from "../_common/icon";
import Button from "../_common/button";

const { validateEmail, validateFirstName, validateLastName, validateOnUpdateUserInformation } = validator.account;

const AccountSettings = () => {
  const dispatch = useDispatch();
  const { currentUser, validationErrors: serverValidationErrors } = useSelector((state) => state.accountSettings);
  const { groups } = useSelector((state) => state.group);
  const isExecutive = useExecutiveRole();

  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [email, setEmail] = useState(currentUser.email);
  const [groupId, setGroupId] = useState(currentUser.group.id);
  const [validationErrors, setValidationErrors] = useState({});

  const availableGroups = isExecutive ? groups : groups.filter((group) => group.isAvailableForRegister);
  const groupItems = availableGroups.map((group) => ({ value: group.id, label: group.name }));

  useTitle("Настройки", "Настройки");

  useEffect(() => {
    setValidationErrors({ ...serverValidationErrors });
  }, [serverValidationErrors]);

  const handleUpdateUserInformation = useCallback(
    (params) => {
      const updatedUserInformation = { ...currentUser, firstName, lastName, email, groupId, ...params };
      const { isValid } = validateOnUpdateUserInformation(updatedUserInformation);

      if (isValid) {
        dispatch(updateUserInformation({ userInformation: updatedUserInformation }));
      }
    },
    [dispatch, currentUser, firstName, lastName, email, groupId]
  );

  const handleUpdateUserInformationDebounced = useDebouncedCallback(({ params }) => {
    handleUpdateUserInformation(params);
  }, 500);

  const handleFirstNameChange = useCallback((value) => {
    setFirstName(value);
    handleUpdateUserInformationDebounced({ params: { firstName: value } });
  }, []);
  const handleFirstNameFocus = useCallback(() => setValidationErrors({ ...validationErrors, firstName: null }), [
    validationErrors,
  ]);
  const handleFirstNameFocusOut = useCallback(() => {
    const error = validateFirstName(firstName);
    setValidationErrors({ ...validationErrors, firstName: error });

    if (handleUpdateUserInformationDebounced.isPending()) {
      handleUpdateUserInformationDebounced.cancel();
      handleUpdateUserInformation({ firstName });
    }
  }, [firstName, validationErrors]);

  const handleLastNameChange = useCallback((value) => {
    setLastName(value);
    handleUpdateUserInformationDebounced({ params: { lastName: value } });
  }, []);
  const handleLastNameFocus = useCallback(() => setValidationErrors({ ...validationErrors, lastName: null }), [
    validationErrors,
  ]);
  const handleLastNameFocusOut = useCallback(() => {
    const error = validateLastName(lastName);
    setValidationErrors({ ...validationErrors, lastName: error });

    if (handleUpdateUserInformationDebounced.isPending()) {
      handleUpdateUserInformationDebounced.cancel();
      handleUpdateUserInformation({ lastName });
    }
  }, [lastName, validationErrors]);

  const handleEmailChange = useCallback((value) => {
    setEmail(value);
    handleUpdateUserInformationDebounced({ params: { email: value } });
  }, []);
  const handleEmailFocus = useCallback(() => setValidationErrors({ ...validationErrors, email: null }), [
    validationErrors,
  ]);
  const handleEmailFocusOut = useCallback(() => {
    const error = validateEmail(email);
    setValidationErrors({ ...validationErrors, email: error });

    if (handleUpdateUserInformationDebounced.isPending()) {
      handleUpdateUserInformationDebounced.cancel();
      handleUpdateUserInformation({ email });
    }
  }, [email, validationErrors]);

  const handleGroupIdChange = useCallback(
    (value) => {
      setGroupId(value);
      setValidationErrors({ ...validationErrors, groupId: null });
      handleUpdateUserInformation({ groupId: value });
    },
    [validationErrors]
  );

  const handleChangePassword = useCallback(() => dispatch(showChangePasswordModal()), [dispatch]);
  const handleConfirmEmail = useCallback(() => dispatch(showConfirmEmailModal({ email })), [dispatch]);

  return (
    <div className="account-settings">
      <Paper className="account-settings-form">
        <img className="account-sign-form__logo" src={images.logo} alt="algorithmix-logo" />
        <div className="account-settings-form__row">
          <TextField
            className="w-50"
            value={firstName}
            label="Имя"
            error={Boolean(validationErrors.firstName)}
            helperText={validationErrors.firstName}
            onChange={handleFirstNameChange}
            onFocus={handleFirstNameFocus}
            onFocusOut={handleFirstNameFocusOut}
          />
          <TextField
            className="w-50"
            value={lastName}
            label="Фамилия"
            error={Boolean(validationErrors.lastName)}
            helperText={validationErrors.lastName}
            onChange={handleLastNameChange}
            onFocus={handleLastNameFocus}
            onFocusOut={handleLastNameFocusOut}
          />
        </div>
        <div className="account-settings-form__row">
          <TextField
            className="w-50"
            label="Email"
            value={email}
            error={Boolean(validationErrors.email)}
            helperText={validationErrors.email}
            onChange={handleEmailChange}
            onFocus={handleEmailFocus}
            onFocusOut={handleEmailFocusOut}
          />
          <Dropdown
            className="w-50"
            value={groupId}
            label="Группа"
            error={Boolean(validationErrors.groupId)}
            helperText={validationErrors.groupId}
            items={groupItems}
            onChange={handleGroupIdChange}
          />
        </div>
        <div className="account-settings-form__row account-settings-form__row--email">
          <div className="w-50">
            <div className="account-settings-form__email-status">
              <Icon
                color={currentUser.emailConfirmed ? colors.success : colors.danger}
                type={currentUser.emailConfirmed ? iconTypes.done : iconTypes.clear}
              />
              {currentUser.emailConfirmed ? "Ваш Email подтверждён" : "Ваш Email не подтверждён"}
            </div>
          </div>
        </div>
        <div className="account-settings-form__row">
          <div className="w-50">
            {!currentUser.emailConfirmed && (
              <Button className="w-100" color={colors.success} onClick={handleConfirmEmail}>
                Подтвердить email
              </Button>
            )}
          </div>
          <div className="w-50">
            <Button className="w-100" color={colors.primary} onClick={handleChangePassword}>
              Сменить пароль
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default AccountSettings;
