import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedUpdate } from "../../../hooks";
import { showPublishTestModal, updateTest } from "../../../store/actions/test";
import validator from "../../../utils/validation";
import TextField from "../../_common/text-field";
import { MultiDropdown } from "../../_common/dropdown";
import Button, { colors } from "../../_common/button";
import palette from "../../../utils/palette";

const { validateName, validateAlgorithmIds, validateTest } = validator.test;

const useIsSaving = () => {
  const {
    isTestUpdating,
    isQuestionCreating,
    isQuestionDeleting,
    isQuestionUpdating,
    isQuestionImageUpdating,
    isAnswerCreating,
    isAnswerDeleting,
    isAnswerUpdating,
  } = useSelector((state) => state.testDesign);

  return (
    isTestUpdating ||
    isQuestionCreating ||
    isQuestionDeleting ||
    isQuestionUpdating ||
    isQuestionImageUpdating ||
    isAnswerCreating ||
    isAnswerDeleting ||
    isAnswerUpdating
  );
};

const TestSettings = () => {
  const dispatch = useDispatch();
  const { test } = useSelector((state) => state.testDesign);
  const { algorithms } = useSelector((state) => state.algorithm);
  const isSaving = useIsSaving();
  const algorithmItems = algorithms.map((algorithm) => ({ value: algorithm.id, label: algorithm.name }));

  const [name, setName] = useState(test.name);
  const [algorithmIds, setAlgorithmIds] = useState(test.algorithms.map((a) => a.id));
  const [validationErrors, setValidationErrors] = useState({});

  const hasValidationErrors = () =>
    Object.keys(validationErrors)
      .map((key) => validationErrors[key])
      .some((error) => error != null);

  const clearValidationErrors = (field) => {
    if (validationErrors[field]) setValidationErrors({ ...validationErrors, [field]: null });
  };

  const handleUpdateTest = useCallback(
    (params) => {
      const updatedTest = { name, algorithmIds, ...params };
      const { isValid } = validateTest(updatedTest);

      if (isValid) {
        dispatch(updateTest({ testId: test.id, test: updatedTest }));
      }
    },
    [name, algorithmIds]
  );

  const handleUpdateDebounced = useDebouncedUpdate(handleUpdateTest, 500);

  const handleNameChange = useCallback(
    (value) => {
      setName(value);
      handleUpdateDebounced.exec({ name: value });
      clearValidationErrors("name");
    },
    [validationErrors]
  );
  const handleNameFocusOut = useCallback(() => {
    const validationError = validateName(name);

    if (!validationError) {
      handleUpdateDebounced.execNow({ name });
    } else {
      setValidationErrors({ ...validationErrors, name: validationError });
    }
  }, [name]);

  const handleAlgorithmIdsChange = useCallback(
    (value) => {
      setAlgorithmIds(value);
      handleUpdateDebounced.exec({ algorithmIds });
      clearValidationErrors("algorithmIds");
    },
    [validationErrors]
  );
  const handleAlgorithmIdsClose = useCallback(() => {
    const validationError = validateAlgorithmIds(algorithmIds);

    if (!validationError) {
      handleUpdateDebounced.execNow({ algorithmIds });
    } else {
      setValidationErrors({ ...validationErrors, algorithmIds: validationError });
    }
  }, [algorithmIds]);

  const handlePublishTest = useCallback(() => {
    const testToPublish = { id: test.id, name, algorithmIds };
    const { isValid, validationErrors: nextValidationErrors } = validateTest(testToPublish);

    if (isValid) {
      dispatch(showPublishTestModal({ test: { ...testToPublish, hasPasses: test.averageResult > 0 } }));
    } else {
      setValidationErrors(nextValidationErrors);
    }
  }, [name, algorithmIds, test.averageResult]);

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
          <span style={{ color: test.isPublished ? palette.success.main : palette.warning.main }}>
            {test.isPublished && " Опубликован"}
            {!test.isPublished && " Имеются неопубликованные изменения"}
          </span>
        </div>
      </div>
      <Button
        color={colors.success}
        disabled={hasValidationErrors() || test.isPublished || isSaving}
        onClick={handlePublishTest}
      >
        Опубликовать тест
      </Button>
    </div>
  );
};

export default TestSettings;
