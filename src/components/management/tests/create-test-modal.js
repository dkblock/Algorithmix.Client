import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTest } from "../../../store/actions/test";
import validator from "../../../utils/validation";
import { CreateModal, modalSizes } from "../../_common/modal";
import { MultiDropdown } from "../../_common/dropdown";
import TextField from "../../_common/text-field";

const { validateName, validateTest } = validator.test;

const CreateTestModal = () => {
  const dispatch = useDispatch();
  const { algorithms } = useSelector((state) => state.algorithm);
  const { isSaving } = useSelector((state) => state.test);
  const algorithmItems = algorithms.map((algorithm) => ({ value: algorithm.id, label: algorithm.name }));

  const [name, setName] = useState("");
  const [algorithmIds, setAlgorithmIds] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const handleNameChange = useCallback((value) => {
    setName(value);
  }, []);

  const handleAlgorithmIdsChange = useCallback((value) => {
    setAlgorithmIds(value);
    setValidationErrors({ ...validationErrors, algorithmIds: null });
  }, []);

  const handleNameFocus = useCallback(() => {
    setValidationErrors({ ...validationErrors, name: null });
  }, [validationErrors]);

  const handleNameFocusOut = useCallback(() => {
    const validationError = validateName(name);
    setValidationErrors({ ...validationErrors, name: validationError });
  }, [name, validationErrors]);

  const handleCreate = useCallback(() => {
    const test = { name, algorithmIds };
    const { isValid, validationErrors: nextValidationErrors } = validateTest(test);

    if (isValid) {
      dispatch(createTest({ test }));
    } else {
      setValidationErrors(nextValidationErrors);
    }
  }, [algorithmIds, dispatch, name]);

  return (
    <CreateModal title="Создание нового теста" size={modalSizes.small} isCreating={isSaving} onCreate={handleCreate}>
      <TextField
        className="test-form__control"
        label="Название теста"
        error={Boolean(validationErrors.name)}
        helperText={validationErrors.name}
        value={name}
        onChange={handleNameChange}
        onFocus={handleNameFocus}
        onFocusOut={handleNameFocusOut}
      />
      <MultiDropdown
        className="test-form__control"
        label="Алгоритмы"
        items={algorithmItems}
        value={algorithmIds}
        error={Boolean(validationErrors.algorithmIds)}
        helperText={validationErrors.algorithmIds}
        onChange={handleAlgorithmIdsChange}
      />
    </CreateModal>
  );
};

export default CreateTestModal;
