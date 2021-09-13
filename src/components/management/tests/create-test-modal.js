import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTest } from "../../../store/actions/test";
import validator from "../../../utils/validation";
import { CreateModal, modalSizes } from "../../_common/modal";
import Dropdown from "../../_common/dropdown";
import TextField from "../../_common/text-field";

const { validateName, validateTest } = validator.test;

const CreateTestModal = () => {
  const dispatch = useDispatch();
  const { algorithms } = useSelector((state) => state.algorithm);
  const algorithmItems = algorithms.map((algorithm) => ({ value: algorithm.id, label: algorithm.name }));

  const [name, setName] = useState("");
  const [algorithmId, setAlgorithmId] = useState(algorithms[0]?.id);
  const [validationErrors, setValidationErrors] = useState({});

  const handleNameChange = useCallback((value) => {
    setName(value);
  }, []);

  const handleAlgorithmIdChange = useCallback((value) => {
    setAlgorithmId(value);
  }, []);

  const handleNameFocus = useCallback(() => {
    setValidationErrors({ ...validationErrors, name: null });
  }, [validationErrors]);

  const handleNameFocusOut = useCallback(() => {
    const validationError = validateName(name);
    setValidationErrors({ ...validationErrors, name: validationError });
  }, [name, validationErrors]);

  const handleCreate = useCallback(() => {
    const test = { name, algorithmIds: [algorithmId] };
    const { isValid, validationErrors: nextValidationErrors } = validateTest(test);

    if (isValid) {
      dispatch(createTest({ test }));
    } else {
      setValidationErrors(nextValidationErrors);
    }
  }, [algorithmId, dispatch, name]);

  return (
    <CreateModal title="Создание нового теста" size={modalSizes.small} onCreate={handleCreate}>
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
      <Dropdown
        className="test-form__control"
        label="Алгоритм"
        value={algorithmId}
        items={algorithmItems}
        onChange={handleAlgorithmIdChange}
      />
    </CreateModal>
  );
};

export default CreateTestModal;
