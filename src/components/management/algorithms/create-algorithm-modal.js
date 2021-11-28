import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAlgorithm } from "../../../store/actions/algorithm";
import validator from "../../../utils/validation";
import TextField from "../../_common/text-field";
import { CreateModal, modalSizes } from "../../_common/modal";

const { validateId, validateName, validateAlgorithm } = validator.algorithm;

const CreateAlgorithmModal = () => {
  const dispatch = useDispatch();
  const { isSaving, validationErrors: serverValidationErrors } = useSelector((state) => state.algorithm);

  const [id, setId] = useState("algorithm-id");
  const [name, setName] = useState("Новый алгоритм");
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setValidationErrors({ ...validationErrors, ...serverValidationErrors });
  }, [serverValidationErrors]);

  const handleIdChange = useCallback((value) => setId(value), []);
  const handleIdFocus = useCallback(() => setValidationErrors({ ...validationErrors, id: null }), [validationErrors]);
  const handleIdFocusOut = useCallback(() => {
    const validationError = validateId(id);
    setValidationErrors({ ...validationErrors, id: validationError });
  }, [id, validationErrors]);

  const handleNameChange = useCallback((value) => setName(value), []);
  const handleNameFocus = useCallback(() => setValidationErrors({ ...validationErrors, name: null }), [
    validationErrors,
  ]);
  const handleNameFocusOut = useCallback(() => {
    const validationError = validateName(id);
    setValidationErrors({ ...validationErrors, name: validationError });
  }, [name, validationErrors]);

  const handleCreateAlgorithm = useCallback(() => {
    const algorithm = { id, name };
    const { isValid, validationErrors: nextValidationErrors } = validateAlgorithm(algorithm);

    if (isValid) {
      dispatch(createAlgorithm({ algorithm }));
    } else {
      setValidationErrors(nextValidationErrors);
    }
  }, [dispatch, id, name]);

  return (
    <CreateModal
      title="Создание нового алгоритма"
      size={modalSizes.small}
      isCreating={isSaving}
      onCreate={handleCreateAlgorithm}
    >
      <div className="form">
        <TextField
          className="form__control"
          label="ID алгоритма"
          error={Boolean(validationErrors.id)}
          helperText={validationErrors.id}
          value={id}
          onChange={handleIdChange}
          onFocus={handleIdFocus}
          onFocusOut={handleIdFocusOut}
        />
        <TextField
          className="form__control"
          label="Название алгоритма"
          error={Boolean(validationErrors.name)}
          helperText={validationErrors.name}
          value={name}
          onChange={handleNameChange}
          onFocus={handleNameFocus}
          onFocusOut={handleNameFocusOut}
        />
      </div>
    </CreateModal>
  );
};

export default CreateAlgorithmModal;
