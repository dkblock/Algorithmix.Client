import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGroup } from "../../../store/actions/group";
import validator from "../../../utils/validation";
import { CreateModal, modalSizes } from "../../_common/modal";
import TextField from "../../_common/text-field";
import Switch from "../../_common/switch";

const { validateName, validateGroup } = validator.group;

const CreateGroupModal = () => {
  const dispatch = useDispatch();
  const { isSaving, validationErrors: serverValidationErrors } = useSelector((state) => state.group);

  const [name, setName] = useState("");
  const [isAvailableForRegister, setIsAvailableForRegister] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setValidationErrors({ ...validationErrors, ...serverValidationErrors });
  }, [serverValidationErrors]);

  const handleNameChange = useCallback((value) => setName(value), []);
  const handleNameFocus = useCallback(() => {
    setValidationErrors({ ...validationErrors, name: null });
  }, [validationErrors]);
  const handleNameFocusOut = useCallback(() => {
    const validationError = validateName(name);
    setValidationErrors({ ...validationErrors, name: validationError });
  }, [name, validationErrors]);

  const handleIsAvailableForRegisterChange = useCallback((value) => setIsAvailableForRegister(value), []);

  const handleCreateGroup = useCallback(() => {
    const group = { name, isAvailableForRegister };
    const { isValid, validationErrors: nextValidationErrors } = validateGroup(group);

    if (isValid) {
      dispatch(createGroup({ group }));
    } else {
      setValidationErrors(nextValidationErrors);
    }
  }, [dispatch, isAvailableForRegister, name]);

  return (
    <CreateModal
      title="Создание новой группы"
      size={modalSizes.small}
      isCreating={isSaving}
      onCreate={handleCreateGroup}
    >
      <div className="form">
        <TextField
          className="form__control"
          label="Название группы"
          error={Boolean(validationErrors.name)}
          helperText={validationErrors.name}
          value={name}
          onChange={handleNameChange}
          onFocus={handleNameFocus}
          onFocusOut={handleNameFocusOut}
        />
        <Switch
          className="form__control"
          checked={isAvailableForRegister}
          label="Доступна при регистрации"
          onChange={handleIsAvailableForRegisterChange}
        />
      </div>
    </CreateModal>
  );
};

export default CreateGroupModal;
