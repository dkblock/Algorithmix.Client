import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { showPublishTestModal, updateTest } from "../../../store/actions/test";
import validator from "../../../utils/validation";
import TextField from "../../_common/text-field";
import { MultiDropdown } from "../../_common/dropdown";
import Button, { colors } from "../../_common/button";
import palette from "../../../utils/palette";

const { validateName, validateAlgorithmIds, validateTest } = validator.test;

const TestSettings = () => {
  const dispatch = useDispatch();
  const { test } = useSelector((state) => state.testDesign);
  const { algorithms } = useSelector((state) => state.algorithm);
  const algorithmItems = algorithms.map((algorithm) => ({ value: algorithm.id, label: algorithm.name }));

  const [name, setName] = useState(test.name);
  const [algorithmIds, setAlgorithmIds] = useState(test.algorithms.map((a) => a.id));
  const [validationErrors, setValidationErrors] = useState({});

  const handleUpdateTest = useDebouncedCallback(() => {
    const updatedTest = { name, algorithmIds };
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

  const handleAlgorithmIdsChange = useCallback(
    (value) => {
      setAlgorithmIds(value);
      setValidationErrors({ ...validationErrors, algorithmIds: null });
      handleUpdateTest();
    },
    [handleUpdateTest, validationErrors]
  );
  const handleAlgorithmIdsClose = useCallback(() => {
    const validationError = validateAlgorithmIds(algorithmIds);
    setValidationErrors({ ...validationErrors, algorithmIds: validationError });
  }, [algorithmIds]);

  const handlePublishTest = useCallback(() => {
    const testToPublish = { id: test.id, name, algorithmIds };
    const { isValid, validationErrors: nextValidationErrors } = validateTest(testToPublish);

    if (isValid) {
      dispatch(showPublishTestModal({ test: testToPublish }));
    } else {
      setValidationErrors(nextValidationErrors);
    }
  }, [name, algorithmIds]);

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
        <MultiDropdown
          className="form__control"
          label="Алгоритмы"
          error={Boolean(validationErrors.algorithmIds)}
          helperText={validationErrors.algorithmIds}
          value={algorithmIds}
          items={algorithmItems}
          onChange={handleAlgorithmIdsChange}
          onClose={handleAlgorithmIdsClose}
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
