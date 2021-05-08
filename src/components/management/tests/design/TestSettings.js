import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { showPublishTestModal, updateTest } from "../../../../store/actions/test";
import validator from "../../../../utils/validation";
import TextField from "../../../_common/TextField";
import Dropdown from "../../../_common/Dropdown";
import Button, { colors } from "../../../_common/Button";
import palette from "../../../../utils/palette";

const { validateName, validateTest } = validator.test;

const TestSettings = () => {
  const dispatch = useDispatch();
  const { test } = useSelector((state) => state.testDesign);
  const { algorithms } = useSelector((state) => state.algorithm);
  const algorithmItems = algorithms.map((algorithm) => ({ value: algorithm.id, label: algorithm.name }));

  const [name, setName] = useState(test.name);
  const [algorithmId, setAlgorithmId] = useState(test.algorithm.id);
  const [validationErrors, setValidationErrors] = useState({});

  const handleUpdateTest = useDebouncedCallback(() => {
    const updatedTest = { name, algorithmId };
    const { isValid } = validateTest(updatedTest);

    if (isValid) {
      dispatch(updateTest({ testId: test.id, test: updatedTest }));
    }
  }, 1000);

  const handleNameChange = useCallback(
    (value) => {
      setName(value);
      handleUpdateTest();
    },
    [handleUpdateTest]
  );
  const handleNameFocus = useCallback(() => setValidationErrors({ ...validationErrors, name: null }), [
    validationErrors,
  ]);
  const handleNameFocusOut = useCallback(() => {
    const validationError = validateName(name);
    setValidationErrors({ ...validationErrors, name: validationError });
  }, [name, validationErrors]);

  const handleAlgorithmIdChange = useCallback(
    (value) => {
      setAlgorithmId(value);
      handleUpdateTest();
    },
    [handleUpdateTest]
  );

  const handlePublishTest = useCallback(() => {
    dispatch(showPublishTestModal({ test }));
  }, [dispatch, test]);

  return (
    <div className="test-settings">
      <div className="w-100">
        <TextField
          className="form__control"
          label="Название теста"
          error={Boolean(validationErrors.name)}
          helperText={validationErrors.name}
          value={name}
          onChange={handleNameChange}
          onFocus={handleNameFocus}
          onFocusOut={handleNameFocusOut}
        />
        <Dropdown
          className="form__control"
          label="Алгоритм"
          value={algorithmId}
          items={algorithmItems}
          onChange={handleAlgorithmIdChange}
        />
        <div>
          Статус:
          <span style={{ color: test.isPublished ? palette.success.dark : palette.warning.dark }}>
            {test.isPublished && " Опубликован"}
            {!test.isPublished && " Имеются неопубликованные изменения"}
          </span>
        </div>
      </div>
      <Button color={colors.success} onClick={handlePublishTest}>
        Опубликовать тест
      </Button>
    </div>
  );
};

export default TestSettings;
