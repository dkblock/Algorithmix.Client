import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "../../utils/validation";
import { changePassword } from "../../store/actions/account";
import { CreateModal, modalSizes } from "../_common/modal";
import TextField from "../_common/text-field";

const { validatePassword } = validator.account;

const ChangePasswordModal = () => {
  const dispatch = useDispatch();
  const { isSaving, validationErrors: serverValidationErrors } = useSelector((state) => state.accountSettings);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setValidationErrors({ ...validationErrors, ...serverValidationErrors });
  }, [serverValidationErrors]);

  const handleCurrentPasswordChange = (value) => setCurrentPassword(value);
  const handleCurrentPasswordFocus = () => setValidationErrors({ ...validationErrors, currentPassword: null });
  const handleCurrentPasswordFocusOut = () => {
    const error = validatePassword(currentPassword);
    setValidationErrors({ ...validationErrors, currentPassword: error });
  };

  const handleNewPasswordChange = (value) => setNewPassword(value);
  const handleNewPasswordFocus = () => setValidationErrors({ ...validationErrors, newPassword: null });
  const handleNewPasswordFocusOut = () => {
    const error = validatePassword(newPassword);
    setValidationErrors({ ...validationErrors, newPassword: error });
  };

  const handleConfirmNewPasswordChange = (value) => setConfirmNewPassword(value);
  const handleConfirmNewPasswordFocus = () => setValidationErrors({ ...validationErrors, confirmNewPassword: null });
  const handleConfirmNewPasswordFocusOut = () => {
    const error = validatePassword(confirmNewPassword);
    setValidationErrors({ ...validationErrors, confirmNewPassword: error });
  };

  const handleSubmit = () => {
    const currentPasswordError = validatePassword(currentPassword);
    const newPasswordError = validatePassword(newPassword);
    const confirmNewPasswordError = validatePassword(confirmNewPassword);

    if (!currentPasswordError && !newPasswordError && !confirmNewPasswordError) {
      const credentials = { currentPassword, newPassword, confirmNewPassword };
      dispatch(changePassword({ credentials }));
    } else {
      setValidationErrors({
        ...validationErrors,
        currentPassword: currentPasswordError,
        newPassword: newPasswordError,
        confirmNewPassword: confirmNewPasswordError,
      });
    }
  };

  return (
    <CreateModal
      title="Смена пароля"
      size={modalSizes.small}
      createButtonText="Сохранить"
      isCreating={isSaving}
      onCreate={handleSubmit}
    >
      <div className="form">
        <TextField
          className="form__control"
          label="Текущий пароль"
          type="password"
          value={currentPassword}
          error={Boolean(validationErrors.currentPassword)}
          helperText={validationErrors.currentPassword}
          onChange={handleCurrentPasswordChange}
          onFocus={handleCurrentPasswordFocus}
          onFocusOut={handleCurrentPasswordFocusOut}
        />
        <TextField
          className="form__control"
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
          className="form__control"
          label="Повторите пароль"
          type="password"
          value={confirmNewPassword}
          error={Boolean(validationErrors.confirmNewPassword)}
          helperText={validationErrors.confirmNewPassword}
          onChange={handleConfirmNewPasswordChange}
          onFocus={handleConfirmNewPasswordFocus}
          onFocusOut={handleConfirmNewPasswordFocusOut}
        />
      </div>
    </CreateModal>
  );
};

export default ChangePasswordModal;
